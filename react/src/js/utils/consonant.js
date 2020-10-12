import _ from 'lodash';
import { DEFAULT_CONFIG } from '../constants';
import { chainFromIterable, isNullish } from './general';

export const getNumSelectedFilterItems = (filters) => {
    const filterItems = chainFromIterable(filters.map(f => f.items));
    return _.sum(filterItems.map(item => item.selected));
};

export const makeConfigGetter = config => (object, key) => {
    const defaultValue = DEFAULT_CONFIG[object][key];
    const value = _.get(config, `${object}.${key}`);
    if (isNullish(value)) return defaultValue;
    return value;
};

export function getDefaultSortOption(config, query) {
    const sortOptions = makeConfigGetter(config)('sort', 'options');
    return sortOptions.find(el => el.sort === query) || {
        label: 'Featured',
        sort: 'featured',
    };
}
