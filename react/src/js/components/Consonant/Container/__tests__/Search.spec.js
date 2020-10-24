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

import config from '../../Testing/Mocks/config.json';
import cards from '../../Testing/Mocks/cards.json';

import makeInit from '../../Testing/Utils/Init';
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

describe('Consonant/search', () => {
    beforeEach(async () => {

    });

    test('should clear search', async () => {
        const configToUse = config;
        configToUse.filterPanel.enabled = true;
        configToUse.filterPanel.filterLogic = 'xor';
        await act(async () => render(<Container config={configToUse} />));

        await waitFor(() => screen.getByTestId('search-input'));

        const searchInput = screen.getByTestId('search-input');

        expect(searchInput.value).toEqual('');

        fireEvent.change(searchInput, { target: { value: 'Search string' } });

        expect(searchInput.value).toEqual('Search string');
    });
    test('should change search value', async () => {
        const configToUse = config;
        configToUse.filterPanel.enabled = true;
        configToUse.filterPanel.filterLogic = 'or';
        await act(async () => render(<Container config={configToUse} />));


        await waitFor(() => screen.getByTestId('search-input'));

        const searchInput = screen.getByTestId('search-input');

        expect(searchInput.value).toEqual('');

        fireEvent.change(searchInput, { target: { value: 'Search string' } });

        expect(searchInput.value).toEqual('Search string');
    });
    test('should change search value without sorting', async () => {
        const configToUse = config;
        configToUse.sort = null;
        await act(async () => render(<Container config={configToUse} />));

        await waitFor(() => screen.getByTestId('search-input'));

        const searchInput = screen.getByTestId('search-input');

        expect(searchInput.value).toEqual('');

        fireEvent.change(searchInput, { target: { value: 'Search string' } });

        expect(searchInput.value).toEqual('Search string');
    });
    test('clicking search input should not change typed search value', async () => {
        const configToUse = config;
        configToUse.filterPanel.enabled = true;
        configToUse.filterPanel.filterLogic = 'or';
        await act(async () => render(<Container config={configToUse} />));


        await waitFor(() => screen.getByTestId('search-input'));

        const searchInput = screen.getByTestId('search-input');

        expect(searchInput.value).toEqual('');

        fireEvent.change(searchInput, { target: { value: 'Search string' } });
        fireEvent.click(searchInput);

        expect(searchInput.value).toEqual('Search string');
    });
});
