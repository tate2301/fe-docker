import sum from 'lodash/sum';
import get from 'lodash/get';

import { DEFAULT_CONFIG } from './constants';
import {
    chainFromIterable,
    isNullish,
} from './general';

export const getNumSelectedFilterItems = (filters) => {
    const filterItems = chainFromIterable(filters.map(filter => filter.items));
    return sum(filterItems.map(item => item.selected));
};

export const makeConfigGetter = config => (object, key) => {
    const objectPath = key ? `${object}.${key}` : object;
    const defaultValue = get(DEFAULT_CONFIG, objectPath);

    const value = get(config, objectPath);

    if (isNullish(value)) {
        return defaultValue;
    }
    return value;
};

export function getDefaultSortOption(config, query) {
    const sortOptions = makeConfigGetter(config)('sort', 'options');
    return sortOptions.find(option => option.sort === query) || {
        label: 'Featured',
        sort: 'featured',
    };
}
