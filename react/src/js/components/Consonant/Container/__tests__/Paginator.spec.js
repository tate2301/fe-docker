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
