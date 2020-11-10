import {
    func,
    shape,
    string,
    number,
    arrayOf,
} from 'prop-types';

import { FilterItemType } from '../../../types/config';

// eslint-disable-next-line import/prefer-default-export
export const GroupType = {
    id: string.isRequired,
    name: string.isRequired,
    clearFilterText: string,
    numItemsSelected: number,
    onCheck: func.isRequired,
    results: number.isRequired,
    onClearAll: func.isRequired,
    items: arrayOf(shape(FilterItemType)).isRequired,
};
