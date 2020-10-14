import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Info from '../FilterInfo';
import Search from '../../../Search/Search';
import Select from '../../../Select/Select';

import {
    DEFAULT_PROPS,
    NON_DESKTOP_WIDTH,
    selectedAllFilters,
} from '../../../Helpers/Testing/Constants/FiltersInfo';
import { DEFAULT_PROPS as SELECT_DEFAULT_PROPS } from '../../../Helpers/Testing/Constants/Select';
import { DEFAULT_PROPS as SEARCH_DEFAULT_PROPS } from '../../../Helpers/Testing/Constants/Search';

import makeSetup, { createTree } from '../../../Helpers/Testing/Utils/Settings';

const setup = makeSetup(Info, DEFAULT_PROPS);

describe('Consonant/FiltersInfo', () => {
    test('should render without title', () => {
        setup({}, { collection: { i18n: { title: '' } } });

        const titleElement = screen.queryByTestId('title');

        expect(titleElement).toBeNull();
    });
    test('should render without total result', () => {
        setup({}, { collection: { showTotalResults: false } });

        const resultsElement = screen.queryByTestId('results');

        expect(resultsElement).toBeNull();
    });
    test('should render all list items', () => {
        const {
            props: { filters },
        } = setup({ selectedFiltersQty: 1, filters: selectedAllFilters });

        const filterItemsLength = filters.reduce((acc, filter) =>
            acc + filter.items.length, 0);

        const selectedFiltersWrapper = screen.queryByTestId('selected-filters');

        expect(selectedFiltersWrapper).not.toBeNull();

        const selectedFilterList = screen.queryAllByTestId('selected-filter');

        expect(selectedFilterList).toHaveLength(filterItemsLength);
    });
    test('shouldn`t render list items', () => {
        setup();

        const selectedFiltersWrapper = screen.queryByTestId('selected-filters');

        expect(selectedFiltersWrapper).toBeNull();
    });
    test('should render mobile button', () => {
        setup({ windowWidth: NON_DESKTOP_WIDTH, selectedFiltersQty: 1 });

        const btnWrapperElement = screen.queryByTestId('btn-wrapper');

        expect(btnWrapperElement).not.toBeNull();

        const btnSelectedElement = screen.queryByTestId('btn-selected');

        expect(btnSelectedElement).not.toBeNull();
        expect(btnSelectedElement).toHaveTextContent('1');
    });

    describe('Check snapshots', () => {
        test('should renders correctly with two children', () => {
            const tree = createTree((
                <Info {...DEFAULT_PROPS} >
                    <Search
                        name="searchFiltersInfo"
                        {...SEARCH_DEFAULT_PROPS} />
                    <Select
                        childrenKey="selectFiltersInfo"
                        {...SELECT_DEFAULT_PROPS} />
                </Info>
            ));

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly with search', () => {
            const tree = createTree((
                <Info {...DEFAULT_PROPS} >
                    <Search
                        name="searchFiltersInfo"
                        {...SEARCH_DEFAULT_PROPS} />
                </Info>
            ));

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly with select', () => {
            const tree = createTree((
                <Info {...DEFAULT_PROPS} >
                    <Select
                        childrenKey="selectFiltersInfo"
                        {...SELECT_DEFAULT_PROPS} />
                </Info>
            ));

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly when desktop width', () => {
            const { tree } = setup();

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly when mobile width', () => {
            const { tree } = setup({ windowWidth: NON_DESKTOP_WIDTH });

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Interaction with UI', () => {
        test('should call onSelectedFilterClick', () => {
            const { props: { onSelectedFilterClick } } = setup({
                filters: selectedAllFilters,
                selectedFiltersQty: 1,
            });

            const [selectedFilter] = screen.queryAllByTestId('selected-filter');

            expect(selectedFilter).toBeDefined();

            fireEvent.click(selectedFilter);

            expect(onSelectedFilterClick).toBeCalled();
        });
        test('should call onMobileFiltersToggleClick', () => {
            const { props: { onMobileFiltersToggleClick } } = setup({
                windowWidth: NON_DESKTOP_WIDTH,
            });

            const buttonElement = screen.queryByTestId('info-btn');

            expect(buttonElement).not.toBeNull();

            fireEvent.click(buttonElement);

            expect(onMobileFiltersToggleClick).toBeCalled();
        });
    });
});
