import '@testing-library/jest-dom/extend-expect';
import {
    screen,
    fireEvent,
} from '@testing-library/react';

import setup from '../../../Testing/Utils/Settings';
import { Info } from '../Info';
import {
    DEFAULT_PROPS,
    NON_DESKTOP_WIDTH,
} from '../../../Testing/Constants/FiltersInfo';


const renderFiltersInfo = setup(Info, DEFAULT_PROPS);

describe('Consonant/Filters/Left/Filters Info', () => {
    test('should be able to render without title', () => {
        renderFiltersInfo({}, { collection: { i18n: { title: '' } } });

        const titleElement = screen.queryByTestId('title');

        expect(titleElement).toBeNull();
    });
    test('should render without total result', () => {
        renderFiltersInfo({}, { collection: { showTotalResults: false } });

        const resultsElement = screen.queryByTestId('results');

        expect(resultsElement).toBeNull();
    });
    test('should not render selected filters', () => {
        renderFiltersInfo();

        const selectedFiltersWrapper = screen.queryByTestId('selected-filters');

        expect(selectedFiltersWrapper).toBeNull();
    });
    test('should be able to render a mobile button', () => {
        renderFiltersInfo({ windowWidth: NON_DESKTOP_WIDTH, selectedFiltersQty: 1, filtersQty: 1 });

        const btnWrapperElement = screen.queryByTestId('btn-wrapper');

        expect(btnWrapperElement).not.toBeNull();

        const btnSelectedElement = screen.queryByTestId('btn-selected');

        expect(btnSelectedElement).not.toBeNull();
        expect(btnSelectedElement).toHaveTextContent('1');
    });

    test('should be able to render the sort component', () => {
        renderFiltersInfo({ sortOptions: [{ sort: 'featured' }] });

        const sortElement = screen.queryByTestId('filters-info__sort-component');

        expect(sortElement).not.toBeNull();
    });

    test('should be able to toggle on mobile', () => {
        const { props: { onMobileFiltersToggleClick } } = renderFiltersInfo({
            filtersQty: 1,
            windowWidth: NON_DESKTOP_WIDTH,
        });

        const buttonElement = screen.queryByTestId('info-btn');

        expect(buttonElement).not.toBeNull();

        fireEvent.click(buttonElement);

        expect(onMobileFiltersToggleClick).toBeCalled();
    });
});
