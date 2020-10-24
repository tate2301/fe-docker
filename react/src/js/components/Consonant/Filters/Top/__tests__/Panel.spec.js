import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FilterPanelTop from '../Panel';
import Popup from '../../../Sort/Popup';
import Search from '../../../Search/Search';

import {
    DEFAULT_PROPS,
    TABLET_MIN_WIDTH,
    selectedAllFilters,
    MOBILE_MIN_WIDTH,
} from '../../../Helpers/Testing/Constants/FilterPanelTop';

import { DEFAULT_PROPS as SEARCH_DEFAULT_PROPS } from '../../../Helpers/Testing/Constants/Search';
import { DEFAULT_PROPS as SELECT_DEFAULT_PROPS } from '../../../Helpers/Testing/Constants/Select';

import makeSetup from '../../../Helpers/Testing/Utils/Settings';

const setup = makeSetup(FilterPanelTop, DEFAULT_PROPS);

const multipleFilters = [...DEFAULT_PROPS.filters, ...DEFAULT_PROPS.filters]
    .map((item, index) => ({ ...item, id: `${item}_${index}` }));

const CHILD_COMPONENTS = {
    search: <Search {...SEARCH_DEFAULT_PROPS} />,
    select: <Popup {...SELECT_DEFAULT_PROPS} />,
};

describe('Top Filter Panel', () => {
    beforeEach(() => {
        global.innerWidth = TABLET_MIN_WIDTH;
    });

    test('Should render all groups of filters', () => {
        const { props: { filters } } = setup({
            filterPanelEnabled: true,
            filters: selectedAllFilters,
        });

        const filterGroupElements = screen.queryAllByTestId('filter-group');

        expect(filterGroupElements).toHaveLength(filters.length);
    });
    test('Should display total results if authored', () => {
        setup({ displayTotalResults: true });

        const footerTotalResElement = screen.queryByTestId('filter-top-result-count');

        expect(footerTotalResElement).not.toBeNull();
    });

    test('Should be able to render a search box on mobile', () => {
        setup({ windowWidth: MOBILE_MIN_WIDTH, searchComponent: CHILD_COMPONENTS.search });

        const footerTotalResElement = screen.queryByTestId('top-filters__search-wrapper');

        expect(footerTotalResElement).not.toBeNull();
    });
    test('Should renders correctly without search', () => {
        setup({ searchComponent: CHILD_COMPONENTS.search });

        const footerTotalResElement = screen.queryByTestId('top-filters__search-wrapper');

        expect(footerTotalResElement).toBeNull();
    });
    test('Should be able to show the Sort Popup', () => {
        setup({ sortComponent: CHILD_COMPONENTS.select });

        const footerTotalResElement = screen.queryByTestId('top-filters__sort-popup');

        expect(footerTotalResElement).not.toBeNull();
    });

    test('should renders more button with correct text', () => {
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
        } = setup({
            filterPanelEnabled: true,
            filters: multipleFilters,
            showLimitedFiltersQty: true,
        });

        const footerTotalResElement = screen.queryByTestId('top-filter__more-button');

        expect(footerTotalResElement).toHaveTextContent(moreFiltersBtnText);
    });
    test('should renders clear button wrapper without background', () => {
        const [firstSelectedFilter] = selectedAllFilters;

        setup({
            filterPanelEnabled: true,
            showLimitedFiltersQty: true,
            filters: [firstSelectedFilter],
        });

        const clearButtonWrapperElement = screen.queryByTestId('top-filter__clear-button-wrapper');

        expect(clearButtonWrapperElement).toHaveClass('consonant-top-filters--clear-btn-wrapper_no-bg');
    });

    test('Filter Group Button Should Exist', () => {
        setup({ filterPanelEnabled: true });

        const [filterGroupBtn] = screen.queryAllByTestId('filter-group-btn');

        expect(filterGroupBtn).toBeDefined();
    });

    test('should show clear all filters text', () => {
        setup({
            filterPanelEnabled: true,
            filters: selectedAllFilters,
            showLimitedFiltersQty: true,
        });

        const clearButtonElement = screen.queryByTestId('top-filter__clear-button');

        expect(clearButtonElement).not.toBeNull();
    });

    describe('Testing UI Interactions', () => {
        test('When "Clear All Filters" is clicked, the appropriate event handler should be called', () => {
            const {
                props: {
                    onClearAllFilters,
                },
            } = setup({
                filterPanelEnabled: true,
                filters: selectedAllFilters,
                showLimitedFiltersQty: true,
            });

            const clearButtonElement = screen.queryByTestId('top-filter__clear-button');

            fireEvent.click(clearButtonElement);

            expect(onClearAllFilters).toBeCalled();
        });
    });
});
