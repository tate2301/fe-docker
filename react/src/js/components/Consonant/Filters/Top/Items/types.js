import {
    func,
    shape,
    number,
    arrayOf,
} from 'prop-types';

import { FilterItemType } from '../../../types/config';

// eslint-disable-next-line import/prefer-default-export
export const ItemsType = {
    handleCheck: func.isRequired,
    stopPropagation: func.isRequired,
    clipWrapperItemsCount: number.isRequired,
    items: arrayOf(shape(FilterItemType)).isRequired,
};
