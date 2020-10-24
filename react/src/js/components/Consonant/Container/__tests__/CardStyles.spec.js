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

import config from '../../Helpers/Testing/Mocks/config.json';
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

describe('Container/CardStyles', () => {
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

    test('should show all cards in case invaild pagination type is authored', async () => {
        const configToUse = config;
        configToUse.pagination.type = 'not-valid';
        config.collection.cardStyle = '3:2';
        const { featuredCards } = config;
        await act(async () => render(<Container config={configToUse} />));
        const totalCards = cards.length + featuredCards.length;
        expect(screen.queryAllByTestId('consonant-card--img')).toHaveLength(totalCards);
    });
});
