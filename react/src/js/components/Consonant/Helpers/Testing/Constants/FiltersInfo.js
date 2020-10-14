import React from 'react';
import { filterPanel } from '../Mocks/consonant.json';

const { enabled, filters } = filterPanel;

export const DESKTOP_WIDTH = 1900;
export const NON_DESKTOP_WIDTH = 800;

export const DEFAULT_PROPS = {
    enabled,
    filters,

    cardsQty: 0,
    selectedFiltersQty: 0,
    windowWidth: DESKTOP_WIDTH,

    onSelectedFilterClick: jest.fn(),
    onMobileFiltersToggleClick: jest.fn(),

    searchComponent: <React.Fragment />,
    sortComponent: <React.Fragment />,
    sortOptions: [],
};

export const selectedAllFilters = filters.map(({ items, ...filter }) => ({
    ...filter,
    items: items.map(item => ({ ...item, selected: true })),
}));
