import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FilterPanelTop from '../Panel';
import Select from '../../../Select/Select';
import Search from '../../../Search/Search';
import SearchIco from '../../../Search/SearchIco';

import {
    DEFAULT_PROPS,
    TABLET_MIN_WIDTH,
    selectedAllFilters,
    MOBILE_MIN_WIDTH,
} from '../../../Helpers/Testing/Constants/FilterPanelTop';

import { DEFAULT_PROPS as SEARCH_DEFAULT_PROPS } from '../../../Helpers/Testing/Constants/Search';
import { DEFAULT_PROPS as SELECT_DEFAULT_PROPS } from '../../../Helpers/Testing/Constants/Select';

import makeSetup, { createTree } from '../../../Helpers/Testing/Utils/Settings';

const setup = makeSetup(FilterPanelTop, DEFAULT_PROPS);

const multipleFilters = [...DEFAULT_PROPS.filters, ...DEFAULT_PROPS.filters]
    .map((item, index) => ({ ...item, id: `${item}_${index}` }));

describe('Top Filter Panel', () => {
    beforeEach(() => {
        global.innerWidth = TABLET_MIN_WIDTH;
    });

    test('Should render all groups of filters', () => {
        const { props: { filters } } = setup();

        const filterGroupElements = screen.queryAllByTestId('filter-group');

        expect(filterGroupElements).toHaveLength(filters.length);
    });
    test('Should display total results if authored', () => {
        setup({ displayTotalResults: true });

        const footerTotalResElement = screen.queryByTestId('filter-top-result-count');

        expect(footerTotalResElement).not.toBeNull();
    });

    test('Should be able to render a search box on mobile', () => {
        global.innerWidth = MOBILE_MIN_WIDTH;

        render((
            <FilterPanelTop
                {...DEFAULT_PROPS}
                searchComponent={(
                    <Search
                        name="filtersTopSearch"
                        {...SEARCH_DEFAULT_PROPS} />
                )} />
        ));

        const footerTotalResElement = screen.queryByTestId('top-filters__search-wrapper');

        expect(footerTotalResElement).not.toBeNull();
    });
    test('Should renders correctly without search', () => {
        render((
            <FilterPanelTop {...DEFAULT_PROPS} >
                <Search
                    name="filtersTopSearch"
                    {...SEARCH_DEFAULT_PROPS} />
            </FilterPanelTop>
        ));

        const footerTotalResElement = screen.queryByTestId('top-filters__search-wrapper');

        expect(footerTotalResElement).toBeNull();
    });
    test('Should be able to show the Sort Popup', () => {
        render((
            <FilterPanelTop
                {...DEFAULT_PROPS}
                sortEnabled
                sortOptions={[{ label: 'Featured', sort: 'featured' }]}
                sortComponent={(
                    <Select
                        childrenKey="filtersTopSelect"
                        {...SELECT_DEFAULT_PROPS} />
                )} />
        ));

        const footerTotalResElement = screen.queryByTestId('top-filters__sort-popup');

        expect(footerTotalResElement).not.toBeNull();
    });

    test('should renders more button with `more filters +` text', () => {
        setup({ showLimitedFiltersQty: true, filters: multipleFilters });

        const footerTotalResElement = screen.queryByTestId('top-filter__more-button');

        expect(footerTotalResElement).toHaveTextContent('more filters +');
    });

    test('Filter Group Button Should Exist', () => {
        setup();
        const [filterGroupBtn] = screen.queryAllByTestId('filter-group-btn');
        expect(filterGroupBtn).toBeDefined();
    });

    test('should show clear all filters text', () => {
        setup({ filters: selectedAllFilters });

        const clearButtonElement = screen.queryByTestId('top-filter__clear-button');

        expect(clearButtonElement).not.toBeNull();
    });

    describe('Check snapshots', () => {
        test('The Top Filter Should Show A Search Icon', () => {
            const tree = createTree((
                <FilterPanelTop {...DEFAULT_PROPS} >
                    <SearchIco
                        childrenKey="filtersTopSearchIco" />
                </FilterPanelTop>
            ));

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly without children', () => {
            const tree = createTree((
                <FilterPanelTop {...DEFAULT_PROPS} />
            ));

            expect(tree).toMatchSnapshot();
        });
        test('Shoulld renders correctly on desktop', () => {
            const { tree } = setup();

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly with limited filters', () => {
            const { tree } = setup({ showLimitedFiltersQty: 10 });

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly with more button', () => {
            const { tree } = setup({ filters: multipleFilters });

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly with non-table width', () => {
            global.innerWidth = MOBILE_MIN_WIDTH;

            const { tree } = setup();

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Testing UI Interactions', () => {
        test('When "Clear All Filters" is clicked, the appropriate event handler should be called', () => {
            const {
                props: {
                    onClearAllFilters,
                },
            } = setup({ filters: selectedAllFilters });

            const clearButtonElement = screen.queryByTestId('top-filter__clear-button');

            fireEvent.click(clearButtonElement);

            expect(onClearAllFilters).toBeCalled();
        });
    });
});
