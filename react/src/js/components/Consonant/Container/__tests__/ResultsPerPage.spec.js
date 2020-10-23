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

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ cards }),
    }));

window.scrollTo = () => { };
jest.setTimeout(30000);

describe('Testing Results Per Page', () => {

    test('should render limited count of card', async () => {

        const configToUse = config;
        configToUse.collection.resultsPerPage = null;
        await act(async () => render(<Container config={configToUse} />));

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));

        /**
         * If resultsPerPage didn't present - we should render all cards
         */
        expect(screen.queryAllByTestId('consonant-card-3-2')).toHaveLength(9);
    });

    test('should render 1 cards by default if resultsPerPage === 1', async () => {
        const configToUse = config;
        configToUse.collection.resultsPerPage = 1;
        await act(async () => render(<Container config={configToUse} />));

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));

        expect(screen.queryAllByTestId('consonant-card-3-2')).toHaveLength(1);
    });

    test('should render all cards if limit > cards count', async () => {
        const configToUse = config;
        configToUse.collection.resultsPerPage = 100;
        await act(async () => render(<Container config={configToUse} />));

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));

        /**
         * if totalCardLimit > cards.length then we should render all cards
         */
        // -2 excludes one 1:1 card and one full-card
        const totalCardLength = cards.length + config.featuredCards.length - 3; 
        expect(screen.queryAllByTestId('consonant-card-3-2')).toHaveLength(totalCardLength);
    });
});
