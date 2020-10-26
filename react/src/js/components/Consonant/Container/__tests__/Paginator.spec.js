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

setupIntersectionObserverMock();

const filteredCards = cards.filter(({ appliesTo }) => Boolean(appliesTo));

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ cards }),
    }));


describe('Consonant/Paginator', () => {
    test('should change pagination range', async () => {
        const configToUse = config;
        await act(async () => render(<Container config={configToUse} />));

        await waitFor(() => screen.getByTestId('pagination--summary'));
        const paginationElement = screen.getByTestId('pagination--summary');

        const prevButton = screen.getByTestId('btn_prev');
        const nextButton = screen.getByTestId('btn_next');

        expect(paginationElement).toHaveTextContent('1 10');

        fireEvent.click(nextButton);

        if (filteredCards.length < 20) {
            expect(paginationElement).toHaveTextContent('11');
        } else {
            expect(paginationElement).toHaveTextContent('20');
        }

        fireEvent.click(prevButton);

        expect(paginationElement).toHaveTextContent('1 10');
    });
});
