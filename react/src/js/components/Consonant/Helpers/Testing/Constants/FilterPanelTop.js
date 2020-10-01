import { filterPanel } from '../Mocks/consonant.json';

const { clearFilterText, clearAllFiltersText, filters } = filterPanel;

export const TABLET_MIN_WIDTH = 768;
export const NON_TABLET_MIN_WIDTH = 384;

export const DEFAULT_PROPS = {
    filters,
    clearFilterText,
    clearAllFiltersText,

    resQty: 0, // total result
    showTotalResults: false,
    showMobileFilters: false,

    onFilterClick: jest.fn(),
    onCheckboxClick: jest.fn(),
    onClearAllFilters: jest.fn(),
    onClearFilterItems: jest.fn(),
    onMobileFiltersToggleClick: jest.fn(),
    onShowAllClick: jest.fn(),
};

export const selectedAllFilters = filters.map(({ items, ...filter }) => ({
    ...filter,
    items: items.map(item => ({ ...item, selected: true })),
}));
