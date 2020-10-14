import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Panel from '../Panel';
import Search from '../../../Search/Search';
import Bookmarks from '../../../Bookmarks/Bookmarks';

import {
    DEFAULT_PROPS,
    NON_DESKTOP_WIDTH,
    selectedAllFilters,
} from '../../../Helpers/Testing/Constants/FilterPanelLeft';

import { DEFAULT_PROPS as SEARCH_DEFAULT_PROPS } from '../../../Helpers/Testing/Constants/Search';
import { DEFAULT_PROPS as BOOKMARKS_DEFAULT_PROPS } from '../../../Helpers/Testing/Constants/Bookmarks';

import makeSetup from '../../../Helpers/Testing/Utils/Settings';

const setup = makeSetup(Panel, DEFAULT_PROPS);

const CHILD_COMPONENTS = {
    search: <Search {...SEARCH_DEFAULT_PROPS} />,
    bookmarks: <Bookmarks {...BOOKMARKS_DEFAULT_PROPS} />,
};

describe('Consonant/FilterPanelLeft', () => {
    test('should render all filters', () => {
        const { props: { filters } } = setup();

        const filterGroupElements = screen.queryAllByTestId('filter-group');

        expect(filterGroupElements).toHaveLength(filters.length);
    });
    test('should render total results', () => {
        setup({
            showTotalResults: true,
            windowWidth: NON_DESKTOP_WIDTH,
        });

        const footerTotalResElement = screen.queryByTestId('mobile-footer-total-res');

        expect(footerTotalResElement).not.toBeNull();
    });

    test('should render non-desktop elements when filters selected', () => {
        const {
            config: {
                filterPanel: { i18n: { leftPanel: { mobile: { panel: { applyBtnText } } } } },
            },
        } = setup({
            filters: selectedAllFilters,
            windowWidth: NON_DESKTOP_WIDTH,
        });

        const mobileFooterClearElement = screen.queryByTestId('mobile-footer-clear');

        expect(mobileFooterClearElement).not.toBeNull();

        const mobileFooterBtnElement = screen.queryByTestId('mobile-footer-btn');

        expect(mobileFooterBtnElement).toHaveTextContent(applyBtnText);
    });

    describe('Check snapshots', () => {
        test('should renders correctly with two children', () => {
            const { tree } = setup({
                searchComponent: CHILD_COMPONENTS.search,
                bookmarkComponent: CHILD_COMPONENTS.bookmarks,
            });

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly with search', () => {
            const { tree } = setup({
                searchComponent: CHILD_COMPONENTS.search,
            });

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly with bookmarks', () => {
            const { tree } = setup({
                bookmarkComponent: CHILD_COMPONENTS.bookmarks,
            });

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly with desktop width', () => {
            const { tree } = setup();

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly with non-desktop width', () => {
            const { tree } = setup({ windowWidth: NON_DESKTOP_WIDTH });

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly with mobile filters', () => {
            const { tree } = setup({ showMobileFilters: true });

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Interaction with UI', () => {
        test('should call onFilterClick', () => {
            const { props: { onFilterClick } } = setup();

            const [filterItemElement] = screen.queryAllByTestId('filter-item-link');

            expect(filterItemElement).toBeDefined();

            fireEvent.click(filterItemElement);

            expect(onFilterClick).toBeCalled();
        });
        test('should call onClearAllFilters', () => {
            const { props: { onClearAllFilters } } = setup();

            const clearButtonElement = screen.queryByTestId('left-filter-panel-clear-all-btn');

            expect(clearButtonElement).not.toBeNull();

            fireEvent.click(clearButtonElement);

            expect(onClearAllFilters).toBeCalled();
            onClearAllFilters.mockClear();
        });
        test('should call onClearAllFilters on mobile footer clear', () => {
            const { props: { onClearAllFilters } } = setup({
                filters: selectedAllFilters,
                windowWidth: NON_DESKTOP_WIDTH,
            });

            const mobileFooterClearElement = screen.queryByTestId('mobile-footer-clear');

            expect(mobileFooterClearElement).not.toBeNull();

            fireEvent.click(mobileFooterClearElement);

            expect(onClearAllFilters).toBeCalled();
            onClearAllFilters.mockClear();
        });
        test('should call onMobileFiltersToggleClick', () => {
            const { props: { onMobileFiltersToggleClick } } = setup({
                windowWidth: NON_DESKTOP_WIDTH,
            });

            const mobileButtonBackElement = screen.queryByText('Back');

            expect(mobileButtonBackElement).not.toBeNull();

            fireEvent.click(mobileButtonBackElement);

            expect(onMobileFiltersToggleClick).toHaveBeenCalledTimes(1);

            const mobileFooterBtnElement = screen.queryByTestId('mobile-footer-btn');

            expect(mobileFooterBtnElement).not.toBeNull();

            fireEvent.click(mobileFooterBtnElement);

            expect(onMobileFiltersToggleClick).toHaveBeenCalledTimes(2);
        });
    });
});
