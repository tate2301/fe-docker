import sum from 'lodash/sum';

import { chainFromIterable } from './general';

const defaultSortValue = {
    sort: 'featured',
    label: 'Featured',
};

export const getNumSelectedFilterItems = (filters) => {
    const filterItems = chainFromIterable(filters.map(({ items }) => items));

    return sum(filterItems.map(({ selected }) => selected));
};

export function getDefaultSortOption(options, defaultSort) {
    return (options || []).find(({ sort }) => sort === defaultSort) || defaultSortValue;
}
