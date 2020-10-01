import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FilterPanelTop from '../../FilterPanel/FilterPanelTop';
import Select from '../../Select';
import Search from '../../Search';
import SearchIco from '../../SearchIco';

import {
    DEFAULT_PROPS,
    TABLET_MIN_WIDTH,
    selectedAllFilters,
    NON_TABLET_MIN_WIDTH,
} from '../constants/filterPanelTop';

import { DEFAULT_PROPS as SEARCH_DEFAULT_PROPS } from '../constants/search';
import { DEFAULT_PROPS as SELECT_DEFAULT_PROPS } from '../constants/select';

import makeSetup, { createTree } from '../utils/settings';

const setup = makeSetup(FilterPanelTop, DEFAULT_PROPS);

const multipleFilters = [...DEFAULT_PROPS.filters, ...DEFAULT_PROPS.filters]
    .map((item, index) => ({ ...item, id: `${item}_${index}` }));

describe('Consonant/FilterItem', () => {
    beforeEach(() => {
        global.innerWidth = TABLET_MIN_WIDTH;
    });

    test('should render all filters', () => {
        const { props: { filters } } = setup();

        const filterItemElements = screen.queryAllByTestId('filter-item');

        expect(filterItemElements).toHaveLength(filters.length);
    });
    test('should render total results', () => {
        setup({ showTotalResults: true });

        const footerTotalResElement = screen.queryByTestId('filter-top-result-count');

        expect(footerTotalResElement).not.toBeNull();
    });

    test('should renders correctly with search', () => {
        global.innerWidth = NON_TABLET_MIN_WIDTH;

        render((
            <FilterPanelTop {...DEFAULT_PROPS} >
                <Search
                    childrenKey="filtersTopSearch"
                    {...SEARCH_DEFAULT_PROPS} />
            </FilterPanelTop>
        ));

        const footerTotalResElement = screen.queryByTestId('top-filters__search-wrapper');

        expect(footerTotalResElement).not.toBeNull();
    });
    test('should renders correctly without search', () => {
        render((
            <FilterPanelTop {...DEFAULT_PROPS} >
                <Search
                    childrenKey="filtersTopSearch"
                    {...SEARCH_DEFAULT_PROPS} />
            </FilterPanelTop>
        ));

        const footerTotalResElement = screen.queryByTestId('top-filters__search-wrapper');

        expect(footerTotalResElement).toBeNull();
    });
    test('should renders correctly with select', () => {
        render((
            <FilterPanelTop {...DEFAULT_PROPS} >
                <Select
                    childrenKey="filtersTopSelect"
                    {...SELECT_DEFAULT_PROPS} />
            </FilterPanelTop>
        ));

        const footerTotalResElement = screen.queryByTestId('top-filters__select-wrapper');

        expect(footerTotalResElement).not.toBeNull();
    });
    test('shouldn`t renders anything in icon wrapper', () => {
        render((
            <FilterPanelTop showSearchbar {...DEFAULT_PROPS} >
                <SearchIco
                    childrenKey="filtersTopSearchIco" />
            </FilterPanelTop>
        ));

        const icoWrapperElement = screen.queryByTestId('filter-top-ico-wrapper');

        expect(icoWrapperElement).toBeEmpty();
    });

    test('should renders more button with `more filters +` text', () => {
        setup({ showLimitedFiltersQty: true, filters: multipleFilters });

        const footerTotalResElement = screen.queryByTestId('top-filter__more-button');

        expect(footerTotalResElement).toHaveTextContent('more filters +');
    });

    test('should renders more button with `hide -` text', () => {
        setup({ showLimitedFiltersQty: false, filters: multipleFilters });

        const footerTotalResElement = screen.queryByTestId('top-filter__more-button');

        expect(footerTotalResElement).toHaveTextContent('hide -');
    });

    describe('Check snapshots', () => {
        test('should renders correctly with search icon', () => {
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
        test('should renders correctly with desktop width', () => {
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
            global.innerWidth = NON_TABLET_MIN_WIDTH;

            const { tree } = setup();

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Interaction with UI', () => {
        test('should call onFilterClick', () => {
            const { props: { onFilterClick } } = setup();

            const [filterItemElement] = screen.queryAllByTestId('filter-item__item-link');

            expect(filterItemElement).toBeDefined();

            fireEvent.click(filterItemElement);

            expect(onFilterClick).toBeCalled();
        });
        test('should call onClearAllFilters', () => {
            const {
                props: {
                    onClearAllFilters,
                    clearAllFiltersText,
                },
            } = setup({ filters: selectedAllFilters });

            const clearButtonElement = screen.queryByText(clearAllFiltersText);

            expect(clearButtonElement).not.toBeNull();

            fireEvent.click(clearButtonElement);

            expect(onClearAllFilters).toBeCalled();
        });
    });
});
