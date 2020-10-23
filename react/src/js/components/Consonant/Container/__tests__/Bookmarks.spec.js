import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
    screen,
    waitFor,
    fireEvent,
    act,
    render,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Container from '../Container';
import config from '../../Helpers/Testing/Mocks/config.json';
import cards from '../../Helpers/Testing/Mocks/cards.json';
import setupIntersectionObserverMock from '../../Helpers/Testing/Mocks/intersectionObserver';

const { collection: { endpoint } } = config;

const handlers = [
    rest.get(endpoint, (req, res, ctx) => res(
        ctx.status(200),
        ctx.json({ cards }),
    )),
];

setupIntersectionObserverMock();

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Container With Bookmarked Cards', () => {
    test('should be able to save a card to bookmarks', async () => {
        const { resultsPerPage } = config.collection;
        const configToUse = config;
        configToUse.collection.cardStyle = '3:2';

        /**
         * Render card
         */
        await act(async () => render(<Container config={configToUse} />));

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));

        // get first unbookmarkedButton from whole DOM tree
        const [bookmarkButton] = screen.queryAllByTestId('bookmark-button');

        // Cards isn't filtered by bookmarks
        expect(screen.queryAllByTestId('consonant-card-3-2')).toHaveLength(resultsPerPage);

        // get first unbookmarkedButton from whole DOM tree
        const [saveBookmarkButton] = screen.queryAllByTestId('bookmark-button');

        expect(saveBookmarkButton).toBeDefined();

        /**
             * bookmark first card(we get first bookmarkButton from DOM tree)
             * filter by bookmarks
             */
        fireEvent.click(saveBookmarkButton);
        fireEvent.click(bookmarkButton);

        // should render only bookmarked cards
        expect(screen.queryAllByTestId('consonant-card-3-2')).toHaveLength(10);

        // reset filter by bookmarks
        fireEvent.click(bookmarkButton);

        // should render card collection without bookmark filter
        expect(screen.queryAllByTestId('consonant-card-3-2')).toHaveLength(resultsPerPage);

        /**
             * If card is bookmarked
             * his bookmark button will change text from saveBookmarkButton to unsaveCardText
             * we should wait for this
             */
        // await waitFor(() => screen.getByText('Unsave Card'));

        // get first bookmarkedButton from whole DOM tree
        const [unsaveBookmarkButton] = screen.queryAllByTestId('bookmark-button');

        expect(unsaveBookmarkButton).toBeDefined();

        /**
             * unbookmark first card(we get first bookmarkButton from DOM tree)
             * filter by bookmarks
             */
        fireEvent.click(unsaveBookmarkButton);
        fireEvent.click(bookmarkButton);

        // should render only bookmarked cards
        expect(screen.queryAllByTestId('consonant-card-3-2')).toHaveLength(10);

        // reset filter by bookmarks
        fireEvent.click(bookmarkButton);

        // should render card collection without bookmark filter
        expect(screen.queryAllByTestId('consonant-card-3-2')).toHaveLength(resultsPerPage);
    });

    test('Should not show bookmarked cards if a user did not save any cards', async () => {
        const configToUse = config;
        configToUse.collection.cardStyle = '3:2';

        await act(async () => render(<Container config={configToUse} />));
        /**
         * Wait for api response and state updating
         */
        await waitFor(() => screen.getByTestId('consonant-collection'));

        /**
         * Get the badge that shows how many bookmarks are currently active
         */
        const bookmarksItemsBadge = screen.getByTestId('bookmarks--item-badge');
        expect(bookmarksItemsBadge.innerHTML).toEqual('0');

        /**
         * Grab the bookmarks filter
         */
        const [bookmarksFilter] = screen.queryAllByTestId('bookmarks');

        /**
         * Click the bookmarks filter
         */
        fireEvent.click(bookmarksFilter);

        /**
         * Since no cards are saved, we expect to see no cards
         */
        expect(screen.queryAllByTestId('consonant-card')).toHaveLength(0);
    });
});
