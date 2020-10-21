import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Info } from '../Info';
import Search from '../../../Search/Search';
import Select from '../../../Select/Select';

import {
    DEFAULT_PROPS,
    NON_DESKTOP_WIDTH,
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
    test('shouldn`t render list items', () => {
        setup();

        const selectedFiltersWrapper = screen.queryByTestId('selected-filters');

        expect(selectedFiltersWrapper).toBeNull();
    });
    test('should render mobile button', () => {
        setup({ windowWidth: NON_DESKTOP_WIDTH, selectedFiltersQty: 1, filtersQty: 1 });

        const btnWrapperElement = screen.queryByTestId('btn-wrapper');

        expect(btnWrapperElement).not.toBeNull();

        const btnSelectedElement = screen.queryByTestId('btn-selected');

        expect(btnSelectedElement).not.toBeNull();
        expect(btnSelectedElement).toHaveTextContent('1');
    });

    test('should render sort component', () => {
        setup({ sortOptions: [{ sort: 'fatures' }] });

        const sortElement = screen.queryByTestId('filters-info__sort-component');

        expect(sortElement).not.toBeNull();
    });

    describe('Interaction with UI', () => {
        test('should call onMobileFiltersToggleClick', () => {
            const { props: { onMobileFiltersToggleClick } } = setup({
                filtersQty: 1,
                windowWidth: NON_DESKTOP_WIDTH,
            });

            const buttonElement = screen.queryByTestId('info-btn');

            expect(buttonElement).not.toBeNull();

            fireEvent.click(buttonElement);

            expect(onMobileFiltersToggleClick).toBeCalled();
        });
    });
});
