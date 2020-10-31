import sum from 'lodash/sum';
import get from 'lodash/get';

import { DEFAULT_CONFIG } from './constants';
import {
    chainFromIterable,
    isNullish,
} from './general';

/**
 * Gets the number of selected filter items
 * @param {Array} filters - filters array
 * @returns {Number} - the number of selected filter items
 */
export const getNumSelectedFilterItems = (filters) => {
    const filterItems = chainFromIterable(filters.map(filter => filter.items));
    return sum(filterItems.map(item => item.selected));
};

/**
 * Returns the authored or default configuration value
 * @param {Object} config - main configuration object
 * @returns {Object} - authored or default configuration value
 */
export const makeConfigGetter = config => (object, key) => {
    const objectPath = key ? `${object}.${key}` : object;
    const defaultValue = get(DEFAULT_CONFIG, objectPath);

    const value = get(config, objectPath);

    if (isNullish(value)) {
        return defaultValue;
    }
    return value;
};

/**
 * Gets the sorting option to use
 * @param {Object} config - configuration object
 * @param {String} query - title of a sort option
 * @returns {Object} - Sort Option or default if none is found
 */
export function getDefaultSortOption(config, query) {
    const sortOptions = makeConfigGetter(config)('sort', 'options');
    return sortOptions.find(option => option.sort === query) || {
        label: 'Featured',
        sort: 'featured',
    };
}
