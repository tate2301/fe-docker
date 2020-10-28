import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
    screen,
    fireEvent,
} from '@testing-library/react';

import FilterPanelTop from '../Panel';
import Popup from '../../../Sort/Popup';
import Search from '../../../Search/Search';
import setup from '../../../Testing/Utils/Settings';
import { DEFAULT_PROPS as SEARCH_DEFAULT_PROPS } from '../../../Testing/Constants/Search';
import { DEFAULT_PROPS as SELECT_DEFAULT_PROPS } from '../../../Testing/Constants/Select';
import {
    DEFAULT_PROPS,
    TABLET_MIN_WIDTH,
    selectedAllFilters,
    MOBILE_MIN_WIDTH,
} from '../../../Testing/Constants/FilterPanelTop';

const renderTopFilterPanel = setup(FilterPanelTop, DEFAULT_PROPS);

const multipleFilters = [...DEFAULT_PROPS.filters, ...DEFAULT_PROPS.filters]
    .map((item, index) => ({ ...item, id: `${item}_${index}` }));

const CHILD_COMPONENTS = {
    search: <Search {...SEARCH_DEFAULT_PROPS} />,
    select: <Popup {...SELECT_DEFAULT_PROPS} />,
};

describe('Consonant/Filters/Top/Panel', () => {
    beforeEach(() => {
        global.innerWidth = TABLET_MIN_WIDTH;
    });

    test('Should be able to render all groups of filters', () => {
        const { props: { filters } } = renderTopFilterPanel({
            filterPanelEnabled: true,
            filters: selectedAllFilters,
        });

        const filterGroupElements = screen.queryAllByTestId('filter-group');
        expect(filterGroupElements).toHaveLength(filters.length);
    });
    test('Should be able to display total results if authored', () => {
        renderTopFilterPanel({ displayTotalResults: true });

        const footerTotalResElement = screen.queryByTestId('results');
        expect(footerTotalResElement).not.toBeNull();
    });

    test('Should be able to render a search box on mobile', () => {
        renderTopFilterPanel({
            windowWidth: MOBILE_MIN_WIDTH,
            searchComponent: CHILD_COMPONENTS.search,
        });

        const footerTotalResElement = screen.queryByTestId('top-filters__search-wrapper');
        expect(footerTotalResElement).not.toBeNull();
    });
    test('Should be able to render correctly without search', () => {
        renderTopFilterPanel({ searchComponent: CHILD_COMPONENTS.search });

        const footerTotalResElement = screen.queryByTestId('top-filters__search-wrapper');
        expect(footerTotalResElement).toBeNull();
    });
    test('Should be able to show the Sort Popup', () => {
        renderTopFilterPanel({ sortComponent: CHILD_COMPONENTS.select });

        const footerTotalResElement = screen.queryByTestId('top-filters__sort-popup');
        expect(footerTotalResElement).not.toBeNull();
    });

    test('Should be able to render the more button with correct text', () => {
        const {
            config: {
                filterPanel: {
                    i18n: {
                        topPanel: {
                            moreFiltersBtnText,
                        },
                    },
                },
            },
        } = renderTopFilterPanel({
            filterPanelEnabled: true,
            filters: multipleFilters,
            showLimitedFiltersQty: true,
        });

        const footerTotalResElement = screen.queryByTestId('top-filter__more-button');
        expect(footerTotalResElement).toHaveTextContent(moreFiltersBtnText);
    });
    test('Should be able to render the clear button wrapper without a background', () => {
        const [firstSelectedFilter] = selectedAllFilters;

        renderTopFilterPanel({
            filterPanelEnabled: true,
            showLimitedFiltersQty: true,
            filters: [firstSelectedFilter],
        });

        const clearButtonWrapperElement = screen.queryByTestId('top-filter__clear-button-wrapper');
        expect(clearButtonWrapperElement).toHaveClass('consonant-top-filters--clear-btn-wrapper_no-bg');
    });

    test('Should be able to show the Filter Group Button', () => {
        renderTopFilterPanel({ filterPanelEnabled: true });

        const [filterGroupBtn] = screen.queryAllByTestId('filter-group-btn');
        expect(filterGroupBtn).toBeDefined();
    });

    test('Should show the clear all filters text', () => {
        renderTopFilterPanel({
            filterPanelEnabled: true,
            filters: selectedAllFilters,
            showLimitedFiltersQty: true,
        });

        const clearButtonElement = screen.queryByTestId('top-filter__clear-button');
        expect(clearButtonElement).not.toBeNull();
    });

    test('The clear all filters button should work', () => {
        const {
            props: {
                onClearAllFilters,
            },
        } = renderTopFilterPanel({
            filterPanelEnabled: true,
            filters: selectedAllFilters,
            showLimitedFiltersQty: true,
        });

        const clearButtonElement = screen.queryByTestId('top-filter__clear-button');

        fireEvent.click(clearButtonElement);
        expect(onClearAllFilters).toBeCalled();
    });
});
