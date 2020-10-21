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

    });

    test('should render with left filter', async () => {
        const configToUse = config;
        configToUse.filterPanel.type = 'left';
        await act(async () => render(<Container config={configToUse} />));

        // search for FilterPanelTop in whole DOM tree
        const filtersTopElement = screen.queryByTestId('consonant-filters__top');

        // search for FilterPanelLeft FilterInfo in whole DOM tree
        const filtersLeftElement = screen.queryByTestId('consonant-filters__left');
        const filtersInfoElement = screen.queryByTestId('consonant-filters__info');

        expect(filtersTopElement).toBeNull();
        /**
         * filterPanel.type === 'left'
         * FilterPa not be exists
         * Collection component should be exists
         */
        expect(filtersLeftElement).not.toBeNull();
        expect(filtersInfoElement).not.toBeNull();
    });

    test('should render card collection', async () => {
        const configToUse = config;
        await act(async () => render(<Container config={configToUse} />));
        // expect(screen.queryByTestId('consonant-loader')).not.toBeNull();

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));
        /**
         * All cards was loaded
         * Loader component should not be exists
         * Collection component should be exists
         */
        // expect(screen.queryByTestId('consonant-loader')).toBeNull();
        expect(screen.getByTestId('consonant-collection')).not.toBeNull();
    });

    test('should render with left filter', async () => {
        const configToUse = config;
        configToUse.filterPanel.type = 'left';
        await act(async () => render(<Container config={configToUse} />));

        // search for FilterPanelTop in whole DOM tree
        const filtersTopElement = screen.queryByTestId('consonant-filters__top');

        // search for FilterPanelLeft FilterInfo in whole DOM tree
        const filtersLeftElement = screen.queryByTestId('consonant-filters__left');
        const filtersInfoElement = screen.queryByTestId('consonant-filters__info');

        expect(filtersTopElement).toBeNull();
        /**
         * filterPanel.type === 'left'
         * FilterPa not be exists
         * Collection component should be exists
         */
        expect(filtersLeftElement).not.toBeNull();
        expect(filtersInfoElement).not.toBeNull();
    });

    test('should check checkbox on left filter`s item click', async () => {

        const configToUse = config;
        configToUse.filterPanel.filterLogic = 'xor';
        await act(async () => render(<Container config={configToUse} />));

        // Need wait for render all checkboxes
        await waitFor(() => screen.getAllByTestId('list-item-checkbox'));

        const filtersLeftElement = screen.getByTestId('consonant-filters__left');
        const [firstCheckbox] = queryAllByTestId(filtersLeftElement, 'list-item-checkbox');

        expect(firstCheckbox.checked).toBeFalsy();

        fireEvent.click(firstCheckbox);

        expect(firstCheckbox.checked).toBeTruthy();

        fireEvent.click(firstCheckbox);

        expect(firstCheckbox.checked).toBeFalsy();
    });

    test('should render card collection', async () => {

        const configToUse = config;
        configToUse.filterPanel.filterLogic = 'xor';
        await act(async () => render(<Container config={configToUse} />));

        // expect(screen.queryByTestId('consonant-loader')).not.toBeNull();

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));
        /**
         * All cards was loaded
         * Loader component should not be exists
         * Collection component should be exists
         */
        // expect(screen.queryByTestId('consonant-loader')).toBeNull();
        expect(screen.getByTestId('consonant-collection')).not.toBeNull();
    });

    test('should show mobile filters', async () => {
        const configToUse = config;
        configToUse.filterPanel.filterLogic = 'xor';
        await act(async () => render(<Container config={configToUse} />));

        global.innerWidth = TABLET_MIN_WIDTH;
        const mobileFooterButton = screen.getByTestId('mobile-footer-btn');
        const filtersLeftElement = screen.getByTestId('consonant-filters__left');

        expect(filtersLeftElement).not.toHaveClass('consonant-left-filters_opened');

        fireEvent.click(mobileFooterButton);

        expect(filtersLeftElement).toHaveClass('consonant-left-filters_opened');
    });


    test('should filter cards by filters and search', async () => {
        const configToUse = config;
        configToUse.filterPanel.filterLogic = 'xor';
        await act(async () => render(<Container config={configToUse} />));

        await waitFor(() => screen.getByTestId('consonant-collection'));

        const searchInput = screen.getByTestId('search-input');

        fireEvent.change(searchInput, { target: { value: 'Some Title 5' } });

        await waitFor(() => screen.getByTestId('consonant-collection'));

        expect(screen.queryAllByTestId('consonant-card')).toHaveLength(1);

        const [firstFilter] = screen.queryAllByTestId('filter-item');

        const [firstFilterCheckbox] = queryAllByTestId(firstFilter, 'list-item-checkbox');

        fireEvent.click(firstFilterCheckbox);

        expect(firstFilterCheckbox.checked).toBeTruthy();
        expect(screen.queryAllByTestId('consonant-card')).toHaveLength(0);
    });

    test('should sort cards by search', async () => {
        const configToUse = config;
        configToUse.filterPanel.filterLogic = 'xor';
        await act(async () => render(<Container config={configToUse} />));

        await waitFor(() => screen.getByTestId('consonant-collection'));

        const searchInput = screen.getByTestId('search-input');

        fireEvent.change(searchInput, { target: { value: 'Some Title 5' } });

        await waitFor(() => screen.getByTestId('consonant-collection'));

        expect(screen.queryAllByTestId('consonant-card')).toHaveLength(1);
    });

    test('should open any selected filter', async () => {
        const configToUse = config;
        configToUse.filterPanel.filterLogic = 'xor';
        await act(async () => render(<Container config={configToUse} />));

        await waitFor(() => screen.getAllByTestId('filter-item'));

        const [firstFilterItem, secondFilterItem] = screen.queryAllByTestId('filter-item');
        const [firstFilterLink, secondFilterLink] = screen.queryAllByTestId('filter-item-link');

        fireEvent.click(firstFilterLink);

        expect(firstFilterItem).toHaveClass('consonant-left-filter_opened');

        fireEvent.click(secondFilterLink);

        expect(secondFilterItem).toHaveClass('consonant-left-filter_opened');
        expect(firstFilterItem).toHaveClass('consonant-left-filter_opened');
    });
});
