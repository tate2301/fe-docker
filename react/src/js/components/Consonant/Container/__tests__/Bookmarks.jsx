import {
    screen,
    waitFor,
    fireEvent,
    getByText,
    getByTestId,
    queryAllByTestId,
    act,
    logDOM,
    render,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Container from '../Container';

import config from '../../Helpers/Testing/Mocks/consonant.json';
import cards from '../../Helpers/Testing/Mocks/cards.json';

import makeInit from '../../Helpers/Testing/Utils/Init';
import React from 'react';

// Different window sizes for different cases
const MOBILE_WIDTH = 384;
const DESKTOP_WIDTH = 1800;
const TABLET_MIN_WIDTH = 768;
const DESKTOP_MIN_WIDTH = 1200;

const init = makeInit(Container, config);

const { filterPanel: { filters }, collection: { endpoint } } = config;

const filteredCards = cards.filter(({ appliesTo }) => Boolean(appliesTo));

// Mock api to get card list
const handlers = [
    rest.get(endpoint, (req, res, ctx) => res(
        ctx.status(200),
        ctx.json({ cards }),
    )),
];

// const server = setupServer(...handlers);
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ cards }),
    }));

// Create more than 2 filter with different ids
const multipleFilters = [...filters, ...filters]
    .map((item, index) => ({ ...item, id: `${item}_${index}` }));

window.scrollTo = () => { };
jest.setTimeout(30000);

describe('Consonant/FilterItem', () => {
    beforeEach(async () => {
        // const configToUse = config;
        // await act(async () => render(<Container config={configToUse} />));
    });

    test('should toggle favourites', async () => {
        const { resultsPerPage } = config.collection;
        const configToUse = config;
        configToUse.collection.cardStyle = '3:2';
        await act(async () => render(<Container config={configToUse} />));

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));

        // get first unbookmarkedButton from whole DOM tree
        const [bookmarkButton] = screen.queryAllByTestId('bookmark-button');

        // Cards isn't filtered by bookmarks
        expect(screen.queryAllByTestId('consonant-card')).toHaveLength(resultsPerPage);

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
        expect(screen.queryAllByTestId('consonant-card')).toHaveLength(10);

        // reset filter by bookmarks
        fireEvent.click(bookmarkButton);

        // should render card collection without bookmark filter
        expect(screen.queryAllByTestId('consonant-card')).toHaveLength(resultsPerPage);

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
        expect(screen.queryAllByTestId('consonant-card')).toHaveLength(10);

        // reset filter by bookmarks
        fireEvent.click(bookmarkButton);

        // should render card collection without bookmark filter
        expect(screen.queryAllByTestId('consonant-card')).toHaveLength(resultsPerPage);
    });
});
