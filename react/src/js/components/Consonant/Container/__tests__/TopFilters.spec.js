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

window.scrollTo = () => { };
jest.setTimeout(30000);

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ cards }),
    }));

// Create more than 2 filter with different ids
const multipleFilters = [...filters, ...filters]
    .map((item, index) => ({ ...item, id: `${item}_${index}` }));

describe('Mobile/Consonant/FilterItemTwo', () => {
    test('On Mobile: Should render Sort Pop up On The Left', async () => {
        global.innerWidth = MOBILE_WIDTH;
        const configToUse = config;
        configToUse.filterPanel.type = 'top';
        await act(async () => render(<Container config={configToUse} />));

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));

        const sortPopup = screen.getByTestId('select-button');
        fireEvent.click(sortPopup);

        const optionsList = screen.queryByTestId('consonant-select--options');

        expect(optionsList).toHaveClass('consonant-select--options_left');
    });

    test('should close filters on blur', async () => {
        global.innerWidth = MOBILE_WIDTH;
        const configToUse = config;
        configToUse.filterPanel.type = 'top';
        await act(async () => render(<Container config={configToUse} />));

        await waitFor(() => screen.getAllByTestId('filter-item'));

        const [firstFilterItem] = screen.queryAllByTestId('filter-item');

        const filterItemLink = getByTestId(firstFilterItem, 'filter-group-btn');

        fireEvent.click(filterItemLink);

        const selectButton = screen.getByTestId('select-button');
        fireEvent.click(selectButton);

        expect(firstFilterItem).not.toHaveClass('consonant-left-filters_opened');
    });
});

describe('Tablet/Consonant/FilterItemTwo', () => {
    test('should show search icon on blur', async () => {
        global.innerWidth = TABLET_MIN_WIDTH;
        const configToUse = config;
        configToUse.filterPanel.type = 'top';
        await act(async () => render(<Container config={configToUse} />));

        const iconElement = screen.queryByTestId('search-icon');

        // SearchIco should be exists after mount
        expect(iconElement).not.toBeNull();
        // Search field should be exists after mount
        expect(screen.queryByTestId('filtersTopSearch')).toBeNull();

        fireEvent.click(iconElement);
        /**
         * After click SearchIco - Search field shoudl be rendered
         * Need wait for it
         */
        await waitFor(() => screen.getByTestId('filtersTopSearch'));

        // SearchIco should be exists after click on SearchIco
        expect(screen.queryByTestId('search-icon')).not.toBeNull();

        // Search field should be exists after click on SearchIco
        expect(screen.queryByTestId('filtersTopSearch')).not.toBeNull();

        // We should click on random element, e.g. Select field
        fireEvent.click(screen.getByTestId('select-button'));
        /**
         * After click on rendom element
         * SearchIcon should be exists
         * Search field shoudn't be exists
         */
        expect(screen.queryByTestId('search-icon')).not.toBeNull();
        expect(screen.queryByTestId('filtersTopSearch')).toBeNull();
    });

    test('should show search input after click on search icon', async () => {
        global.innerWidth = TABLET_MIN_WIDTH;
        const configToUse = config;
        configToUse.filterPanel.type = 'top';
        await act(async () => render(<Container config={configToUse} />));

        const iconElement = screen.queryByTestId('search-icon');

        // SearchIcon should be exists after mount
        expect(iconElement).not.toBeNull();
        // Search field should be exists after mount
        expect(screen.queryByTestId('filtersTopSearch')).toBeNull();

        fireEvent.click(iconElement);
        /**
         * After click SearchIco - Search field should be rendered
         * Need wait for it
         */
        await waitFor(() => screen.getByTestId('filtersTopSearch'));

        // SearchIcon should exist after click on SearchIco
        expect(screen.queryByTestId('search-icon')).not.toBeNull();

        // Search field should be exists after click on SearchIco
        expect(screen.queryByTestId('filtersTopSearch')).not.toBeNull();
    });

    test('should toggle all filters', async () => {
        global.innerWidth = TABLET_MIN_WIDTH;
        const configToUse = config;
        configToUse.filterPanel.type = 'top';
        configToUse.filterPanel.filters = multipleFilters;

        const { moreFiltersBtnText } = config.filterPanel.i18n.topPanel;

        await act(async () => render(<Container config={configToUse} />));

        await waitFor(() => screen.getByText(moreFiltersBtnText));

        screen.queryAllByTestId('consonant-filters__top__filters').forEach((element) => {
            expect(element).toHaveClass('consonant-top-filters--filters_truncated');
        });

        const showMoreButton = screen.getByText(moreFiltersBtnText);

        fireEvent.click(showMoreButton);

        screen.queryAllByTestId('consonant-filters__top__filters').forEach((element) => {
            expect(element).not.toHaveClass('consonant-top-filters--filters_truncated');
        });
    });
});

describe('Desktop/Consonant/FilterItemTwo', () => {
    test('should render with top filter', async () => {
        global.innerWidth = DESKTOP_WIDTH;
        const configToUse = config;
        configToUse.filterPanel.type = 'top';
        await act(async () => render(<Container config={configToUse} />));

        // search for FilterPanelTop in whole DOM tree
        const filtersTopElement = screen.queryByTestId('consonant-filters__top');

        // search for FilterPanelTop and FilterInfo in whole DOM tree
        const filtersLeftElement = screen.queryByTestId('consonant-filters__left');
        const filtersInfoElement = screen.queryByTestId('consonant-filters__info');

        expect(filtersTopElement).not.toBeNull();

        expect(filtersLeftElement).toBeNull();
        expect(filtersInfoElement).toBeNull();
    });

    test('should render select with right alignment', async () => {
        global.innerWidth = DESKTOP_WIDTH;
        const configToUse = config;
        configToUse.filterPanel.type = 'top';
        await act(async () => render(<Container config={configToUse} />));

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));

        const sortPopup = screen.getByTestId('select-button');
        fireEvent.click(sortPopup);

        const optionsList = screen.queryByTestId('consonant-select--options');

        expect(optionsList).toHaveClass('consonant-select--options_right');
    });

    test('should filter cards withour sort select', async () => {
        global.innerWidth = DESKTOP_WIDTH;
        const configToUse = config;
        configToUse.sort.options = undefined;
        configToUse.filterPanel.type = 'top';
        await act(async () => render(<Container config={configToUse} />));

        await waitFor(() => screen.getByTestId('consonant-collection'));

        const optionsList = screen.queryByTestId('consonant-select--options');

        expect(optionsList).toBeNull();
    });

    test('should search cards without filters', async () => {
        global.innerWidth = DESKTOP_WIDTH;
        const configToUse = config;
        configToUse.sort = null;
        configToUse.filterPanel.type = 'top';
        await act(async () => render(<Container config={configToUse} />));

        await waitFor(() => screen.getAllByTestId('filter-item'));

        const [firstFilter] = screen.queryAllByTestId('filter-item');

        const [firstFilterCheckbox] = queryAllByTestId(firstFilter, 'list-item-checkbox');

        fireEvent.click(firstFilterCheckbox);

        expect(firstFilterCheckbox.checked).toBeTruthy();
        // expect(screen.queryAllByTestId('consonant-card')).toHaveLength(1);
    });

    test('should open only selected filter', async () => {
        global.innerWidth = DESKTOP_WIDTH;
        const configToUse = config;
        configToUse.filterPanel.type = 'top';
        await act(async () => render(<Container config={configToUse} />));

        await waitFor(() => screen.getAllByTestId('filter-item'));

        const [firstFilterItem, secondFilterItem] = screen.queryAllByTestId('filter-item');
        const [firstFilterLink, secondFilterLink] = screen.queryAllByTestId('filter-group-btn');

        fireEvent.click(firstFilterLink);

        expect(firstFilterItem).toHaveClass('consonant-top-filter_opened');

        fireEvent.click(secondFilterLink);

        expect(secondFilterItem).toHaveClass('consonant-top-filter_opened');
        expect(firstFilterItem).not.toHaveClass('consonant-top-filter_opened');
    });

    test('should clear all selected checkboxes', async () => {
        global.innerWidth = DESKTOP_WIDTH;
        const configToUse = config;
        configToUse.filterPanel.type = 'top';
        const { clearAllFiltersText } = config.filterPanel.i18n.topPanel;
        await act(async () => render(<Container config={configToUse} />));

        await waitFor(() => screen.getAllByTestId('filter-item'));

        const [firstFilter, secondFilter] = screen.queryAllByTestId('filter-item');

        const [firstFilterCheckbox] = queryAllByTestId(firstFilter, 'list-item-checkbox');
        const [secondFilterCheckbox] = queryAllByTestId(secondFilter, 'list-item-checkbox');

        fireEvent.click(firstFilterCheckbox);
        fireEvent.click(secondFilterCheckbox);

        expect(firstFilterCheckbox.checked).toBeTruthy();
        expect(secondFilterCheckbox.checked).toBeTruthy();

        const clearAllFiltersButton = screen.getByText(clearAllFiltersText);

        fireEvent.click(clearAllFiltersButton);

        expect(firstFilterCheckbox.checked).toBeFalsy();
        expect(secondFilterCheckbox.checked).toBeFalsy();
    });

    test('should clear all selected checkboxes only in the first filter', async () => {

        global.innerWidth = DESKTOP_WIDTH;
        const configToUse = config;
        configToUse.filterPanel.type = 'top';
        configToUse.filterPanel.filterLogic = 'or';

        const { clearFilterText } = config.filterPanel.i18n.topPanel.mobile.group;
        await act(async () => render(<Container config={configToUse} />));


        await waitFor(() => screen.getAllByTestId('filter-item'));

        const [firstFilter, secondFilter] = screen.queryAllByTestId('filter-item');

        const [firstFilterCheckbox] = queryAllByTestId(firstFilter, 'list-item-checkbox');
        const [secondFilterCheckbox] = queryAllByTestId(secondFilter, 'list-item-checkbox');

        fireEvent.click(firstFilterCheckbox);
        fireEvent.click(secondFilterCheckbox);

        expect(firstFilterCheckbox.checked).toBeTruthy();
        expect(secondFilterCheckbox.checked).toBeTruthy();

        await waitFor(() => getByText(firstFilter, clearFilterText));

        const firstFilterClearButton = getByText(firstFilter, clearFilterText);

        fireEvent.click(firstFilterClearButton);

        expect(firstFilterCheckbox.checked).toBeFalsy();
        expect(secondFilterCheckbox.checked).toBeTruthy();
    });
});

