import {
    number,
    bool,
    string,
    func,
    arrayOf,
    shape,
} from 'prop-types';

import { FilterItemType } from '../../../types/config';

// eslint-disable-next-line import/prefer-default-export
export const ItemType = {
    icon: string,
    isOpened: bool,
    id: string.isRequired,
    clearFilterText: string,
    name: string.isRequired,
    onCheck: func.isRequired,
    onClick: func.isRequired,
    numItemsSelected: number,
    results: number.isRequired,
    onClearAll: func.isRequired,
    items: arrayOf(shape(FilterItemType)).isRequired,
};
