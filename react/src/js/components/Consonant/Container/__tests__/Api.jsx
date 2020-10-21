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
// const handlers = [
//     rest.get(endpoint, (req, res, ctx) => res(
//         ctx.status(200),
//         ctx.json({ cards }),
//     )),
// ];

// const server = setupServer(...handlers);
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// global.fetch = jest.fn(() =>
//     Promise.resolve({
//         json: () => Promise.resolve({ cards }),
//     }));

// Create more than 2 filter with different ids
const multipleFilters = [...filters, ...filters]
    .map((item, index) => ({ ...item, id: `${item}_${index}` }));

window.scrollTo = () => { };
jest.setTimeout(30000);

const server = setupServer(rest
    .get(endpoint, (req, res, ctx) => res(
        ctx.status(401),
        ctx.json({ cards: [] }),
    )));

describe('Api', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    describe('200 Responses', () => {
        test('shouldn`t render card collection', async () => {
            server.use(rest.get(endpoint, (req, res, ctx) => res(
                ctx.status(200),
                ctx.json({ cards: [] }),
            )));

            const configToUse = config;
            await act(async () => render(<Container config={configToUse} />));
            /**
             * Re-assign handlers to mocks api
             * Should return success response with empty cards array
             */


            await waitFor(() => screen.queryByTestId('consonant-collection'));

            // Collections shouldn't render if there aren't cards
            expect(screen.queryByTestId('consonant-collection')).toBeNull();
        });
    });

    describe('401 Response', () => {
        test('401 Response', async () => {
            server.use(rest.get(endpoint, (req, res, ctx) => res(ctx.status(401))));

            const configToUse = config;
            await act(async () => render(<Container config={configToUse} />));
            /**
             * Re-assign handlers to mocks api
             * Should return success response with empty cards array
             */


            await waitFor(() => screen.queryByTestId('consonant-collection'));

            // Collections shouldn't render if there aren't cards
            expect(screen.queryByTestId('consonant-collection')).toBeNull();
        });
    });
});

