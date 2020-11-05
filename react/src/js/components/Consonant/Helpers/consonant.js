import sum from 'lodash/sum';

import { chainFromIterable } from './general';

const defaultSortValue = {
    sort: 'featured',
    label: 'Featured',
};

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
 * Gets the sorting option to use
 * @param {Object} config - configuration object
 * @param {String} query - title of a sort option
 * @returns {Object} - Sort Option or default if none is found
 */
export function getDefaultSortOption(options, defaultSort) {
    return (options || []).find(({ sort }) => sort === defaultSort) || defaultSortValue;
}
