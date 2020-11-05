import {
    bool,
    node,
    func,
    shape,
    number,
    arrayOf,
} from 'prop-types';

import { SortOptionType } from '../../../types/config';

// eslint-disable-next-line import/prefer-default-export
export const InfoType = {
    cardsQty: number,
    filtersQty: number,
    windowWidth: number,
    enabled: bool.isRequired,
    selectedFiltersQty: number,
    sortComponent: node.isRequired,
    searchComponent: node.isRequired,
    onMobileFiltersToggleClick: func.isRequired,
    sortOptions: arrayOf(shape(SortOptionType)).isRequired,
};
