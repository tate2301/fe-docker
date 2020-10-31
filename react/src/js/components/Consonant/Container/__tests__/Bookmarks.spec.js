import React from 'react';
import {
    screen,
    waitFor,
    fireEvent,
    act,
    render,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Container from '../Container';
import config from '../../Testing/Mocks/config.json';
import cards from '../../Testing/Mocks/cards.json';
import setupIntersectionObserverMock from '../../Testing/Mocks/intersectionObserver';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ cards }),
    }));

setupIntersectionObserverMock();

describe('Consonant/Container/Bookmarks', () => {
    test('should be able to save cards to bookmarks', async () => {
        const { resultsPerPage } = config.collection;
        const configToUse = config;
        configToUse.collection.cardStyle = '3:2';

        await act(async () => render(<Container config={configToUse} />));
        await waitFor(() => screen.getByTestId('consonant-collection'));

        const [bookmarkButton] = screen.queryAllByTestId('bookmark-button');

        expect(screen.queryAllByTestId('consonant-card-3-2')).toHaveLength(resultsPerPage);

        const [saveBookmarkButton] = screen.queryAllByTestId('bookmark-button');

        expect(saveBookmarkButton).toBeDefined();

        fireEvent.click(saveBookmarkButton);
        fireEvent.click(bookmarkButton);

        expect(screen.queryAllByTestId('consonant-card-3-2')).toHaveLength(10);

        fireEvent.click(bookmarkButton);

        expect(screen.queryAllByTestId('consonant-card-3-2')).toHaveLength(resultsPerPage);

        const [unsaveBookmarkButton] = screen.queryAllByTestId('bookmark-button');

        expect(unsaveBookmarkButton).toBeDefined();

        fireEvent.click(unsaveBookmarkButton);
        fireEvent.click(bookmarkButton);

        expect(screen.queryAllByTestId('consonant-card-3-2')).toHaveLength(10);

        fireEvent.click(bookmarkButton);

        expect(screen.queryAllByTestId('consonant-card-3-2')).toHaveLength(resultsPerPage);
    });

    test('Should not show bookmarked cards if a user did not save any cards', async () => {
        const configToUse = config;
        configToUse.collection.cardStyle = '3:2';

        await act(async () => render(<Container config={configToUse} />));
        await waitFor(() => screen.getByTestId('consonant-collection'));

        const bookmarksItemsBadge = screen.getByTestId('bookmarks--item-badge');
        expect(bookmarksItemsBadge.innerHTML).toEqual('0');

        const [bookmarksFilter] = screen.queryAllByTestId('bookmarks');

        fireEvent.click(bookmarksFilter);
        expect(screen.queryAllByTestId('consonant-card')).toHaveLength(0);
    });
});
