import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
    screen,
    act,
    render,
} from '@testing-library/react';

import Container from '../Container';
import setupIntersectionObserverMock from '../../Testing/Mocks/intersectionObserver';
import config from '../../Testing/Mocks/config.json';
import cards from '../../Testing/Mocks/cards.json';


global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ cards }),
    }));

setupIntersectionObserverMock();

describe('Container/Different Card Styles', () => {
    test('can render the full-card style', async () => {
        const configToUse = config;
        configToUse.collection.cardStyle = 'full-card';
        await act(async () => render(<Container config={configToUse} />));
        const fullCards = screen.queryAllByTestId('consonant-full-card');
        expect(fullCards).not.toBeNull();
    });

    test('can render the 1:1 card style', async () => {
        const configToUse = config;
        configToUse.collection.cardStyle = '1:1';
        await act(async () => render(<Container config={configToUse} />));
        const oneByOneCards = screen.queryAllByTestId('consonant-1-1-card');
        expect(oneByOneCards).not.toBeNull();
    });

    test('should show all cards in case an invalid pagination type is authored', async () => {
        const configToUse = config;
        configToUse.pagination.type = 'not-valid';
        config.collection.cardStyle = '3:2';
        const { featuredCards } = config;
        await act(async () => render(<Container config={configToUse} />));
        const totalCards = cards.length + featuredCards.length;
        expect(screen.queryAllByTestId('consonant-card--img')).toHaveLength(totalCards);
    });
});
