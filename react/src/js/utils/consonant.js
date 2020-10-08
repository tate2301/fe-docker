import _ from 'lodash';
import parseToPrimitive from './parseToPrimitive';
import { chainFromIterable } from './general';

export const getNumSelectedFilterItems = (filters) => {
    const filterItems = chainFromIterable(filters.map(f => f.items));
    return _.sum(filterItems.map(item => item.selected));
};

export function getDefaultSortOption(config, query) {
    const sortOptions = parseToPrimitive(_.get(config, 'sort.options', '[]'));
    return sortOptions.find(el => el.sort === query) || {
        label: 'Featured',
        sort: 'featured',
    };
}
