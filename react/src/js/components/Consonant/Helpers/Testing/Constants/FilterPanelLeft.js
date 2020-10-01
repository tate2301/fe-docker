import { filterPanel } from '../Mocks/consonant.json';

const { clearFilterText, clearAllFiltersText, filters } = filterPanel;

export const DESKTOP_WIDTH = 1900;
export const NON_DESKTOP_WIDTH = 800;

export const DEFAULT_PROPS = {
    filters,
    clearFilterText,
    clearAllFiltersText,

    resQty: 0, // total result
    showTotalResults: false,
    showMobileFilters: false,
    windowWidth: DESKTOP_WIDTH,

    onFilterClick: jest.fn(),
    onCheckboxClick: jest.fn(),
    onClearAllFilters: jest.fn(),
    onClearFilterItems: jest.fn(),
    onMobileFiltersToggleClick: jest.fn(),
};

export const selectedAllFilters = filters.map(({ items, ...filter }) => ({
    ...filter,
    items: items.map(item => ({ ...item, selected: true })),
}));
