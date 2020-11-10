import {
    func,
    shape,
    arrayOf,
} from 'prop-types';

import { FilterItemType } from '../../../types/config';

// eslint-disable-next-line import/prefer-default-export
export const ItemsType = {
    handleCheck: func.isRequired,
    items: arrayOf(shape(FilterItemType)).isRequired,
};
