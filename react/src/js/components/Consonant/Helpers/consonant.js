import sum from 'lodash/sum';
import get from 'lodash/get';

import { DEFAULT_CONFIG } from './constants';
import {
    chainFromIterable,
    isNullish,
} from './general';

/**
 * Counts the quantity or the selected filters options
 * @param {Array} filters - filters array
 * @returns {Number} - the quantity or the selected filters options
 */
export const getNumSelectedFilterItems = (filters) => {
    const filterItems = chainFromIterable(filters.map(filter => filter.items));
    return sum(filterItems.map(item => item.selected));
};

/**
 * Returns the authored or default configurational value
 * @param {Object} config - main configurational object
 * @param {Object} object - object inside the main configurational object
 * @param {String} key - an object key for which we need a value
 * @returns {} - authored or default configurational value
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
 * Get the default sorting option
 * @param {Object} config - configurational object
 * @param {String} query - title of the sorting option
 * @returns {Object} - object with the default sorting option
 */
export function getDefaultSortOption(config, query) {
    const sortOptions = makeConfigGetter(config)('sort', 'options');
    return sortOptions.find(option => option.sort === query) || {
        label: 'Featured',
        sort: 'featured',
    };
}
