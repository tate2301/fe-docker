import {
    bool,
    func,
    node,
    shape,
    number,
    arrayOf,
} from 'prop-types';

import { FilterType } from '../../../types/config';

const FiltersType = arrayOf(shape(FilterType));

export const ChoosenFiltersType = {
    filters: FiltersType,
    onClick: func.isRequired,
};

export const LeftFilterPanelType = {
    resQty: number,
    windowWidth: number,
    filters: FiltersType,
    showMobileFilters: bool,
    selectedFiltersQty: number,
    onFilterClick: func.isRequired,
    onCheckboxClick: func.isRequired,
    searchComponent: node.isRequired,
    bookmarkComponent: node.isRequired,
    onClearAllFilters: func.isRequired,
    onClearFilterItems: func.isRequired,
    onSelectedFilterClick: func.isRequired,
    onMobileFiltersToggleClick: func.isRequired,
};

export const FilterListType = {
    resQty: number,
    filters: FiltersType,
    onFilterClick: func.isRequired,
    onCheckboxClick: func.isRequired,
    onClearFilterItems: func.isRequired,
};
