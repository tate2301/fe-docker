import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
    screen,
    waitFor,
    fireEvent,
    queryAllByTestId,
    act,
    render,
} from '@testing-library/react';

import Container from '../index';
import setupIntersectionObserverMock from '../../Testing/Mocks/intersectionObserver';
import config from '../../Testing/Mocks/config.json';
import cards from '../../Testing/Mocks/cards.json';

const DESKTOP_WIDTH = 1800;
const TABLET_MIN_WIDTH = 768;

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ cards }),
    }));


window.scrollTo = () => { };
jest.setTimeout(30000);


setupIntersectionObserverMock();

describe('Consonant/Container/Left Filter', () => {
    test('Should be able to render the left filter', async () => {
        const configToUse = config;
        configToUse.filterPanel.type = 'left';

        await act(async () => render(<Container config={configToUse} />));

        // Top Filter Panel Should NOT Exist
        const filtersTopElement = screen.queryByTestId('consonant-filters__top');
        expect(filtersTopElement).toBeNull();

        // Grab thee Left Filter Panel and Info Bar
        const filtersLeftElement = screen.queryByTestId('consonant-filters__left');
        const filtersInfoElement = screen.queryByTestId('consonant-filters__info');

        expect(filtersLeftElement).not.toBeNull();
        expect(filtersInfoElement).not.toBeNull();
    });

    test('Should be able to render the card collection', async () => {
        const configToUse = config;

        await act(async () => render(<Container config={configToUse} />));
        await waitFor(() => screen.getByTestId('consonant-collection'));

        expect(screen.getByTestId('consonant-collection')).not.toBeNull();
    });

    test('Should allow users to check filter checkboxes', async () => {
        const configToUse = config;
        configToUse.filterPanel.filterLogic = 'xor';

        await act(async () => render(<Container config={configToUse} />));
        await waitFor(() => screen.getAllByTestId('list-item-checkbox'));

        const filtersLeftElement = screen.getByTestId('consonant-filters__left');
        const [firstCheckbox] = queryAllByTestId(filtersLeftElement, 'list-item-checkbox');

        expect(firstCheckbox.checked).toBeFalsy();

        fireEvent.click(firstCheckbox);

        expect(firstCheckbox.checked).toBeTruthy();

        fireEvent.click(firstCheckbox);

        expect(firstCheckbox.checked).toBeFalsy();
    });

    test('Should be able to show mobile views', async () => {
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


    test('should be able to search and filter', async () => {
        const configToUse = config;
        configToUse.filterPanel.filterLogic = 'xor';
        await act(async () => render(<Container config={configToUse} />));

        await waitFor(() => screen.getByTestId('consonant-collection'));

        const searchInput = screen.getByTestId('search-input');

        fireEvent.change(searchInput, { target: { value: 'Some Title 5' } });

        await waitFor(() => screen.getByTestId('consonant-collection'));

        expect(screen.queryAllByTestId('consonant-card-3-2')).toHaveLength(1);

        const [firstFilter] = screen.queryAllByTestId('filter-item');

        const [firstFilterCheckbox] = queryAllByTestId(firstFilter, 'list-item-checkbox');

        fireEvent.click(firstFilterCheckbox);

        expect(firstFilterCheckbox.checked).toBeTruthy();
        expect(screen.queryAllByTestId('consonant-card')).toHaveLength(0);
    });

    test('should be able to open groups of filters', async () => {
        const configToUse = config;
        configToUse.filterPanel.filterLogic = 'xor';
        await act(async () => render(<Container config={configToUse} />));

        await waitFor(() => screen.getAllByTestId('filter-item'));

        const [firstFilterGroup, secondFilterGroup] = screen.queryAllByTestId('filter-item');
        const [firstFilterItem, secondFilterItem] = screen.queryAllByTestId('filter-item-link');

        fireEvent.click(firstFilterItem);

        expect(firstFilterGroup).toHaveClass('consonant-left-filter_opened');

        fireEvent.click(secondFilterItem);

        expect(firstFilterGroup).toHaveClass('consonant-left-filter_opened');
        expect(secondFilterGroup).toHaveClass('consonant-left-filter_opened');
    });
});

describe('Consonant/Left Filter/Selected Filter Pills', () => {
    test('testing multiple clicks -- so selected filter pills show', async () => {
        const configToUse = config;
        configToUse.filterPanel.filterLogic = 'or';
        configToUse.filterPanel.type = 'left';
        global.innerWidth = DESKTOP_WIDTH;

        await act(async () => render(<Container config={configToUse} />));
        // Need to wait for all checkboxes to render
        await waitFor(() => screen.getAllByTestId('list-item-checkbox'));

        const filterElements = screen.getAllByTestId('consonant-filters__left');
        const firstFilterElement = filterElements[0];

        const [firstCheckbox] = queryAllByTestId(firstFilterElement, 'list-item-checkbox');

        fireEvent.click(firstCheckbox);

        await waitFor(() => screen.getAllByTestId('selected-filter'));
        const [selectedFilter] = screen.getAllByTestId('selected-filter');

        expect(selectedFilter).not.toBeNull();
    });
});

