import {
    bool,
    func,
    node,
    shape,
    number,
    arrayOf,
} from 'prop-types';

import { FilterType } from '../../../types/config';

// eslint-disable-next-line import/prefer-default-export
export const FiltersPanelTopType = {
    resQty: number,
    showLimitedFiltersQty: bool,
    sortComponent: node.isRequired,
    windowWidth: number.isRequired,
    onFilterClick: func.isRequired,
    onShowAllClick: func.isRequired,
    searchComponent: node.isRequired,
    onCheckboxClick: func.isRequired,
    onClearAllFilters: func.isRequired,
    filters: arrayOf(shape(FilterType)),
    onClearFilterItems: func.isRequired,
    filterPanelEnabled: bool.isRequired,
};
