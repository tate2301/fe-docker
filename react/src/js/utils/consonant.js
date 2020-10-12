import _ from 'lodash';
import React from 'react';
import { DEFAULT_CONFIG } from '../constants';
import { chainFromIterable } from './general';

export const getNumSelectedFilterItems = (filters) => {
    const filterItems = chainFromIterable(filters.map(f => f.items));
    return _.sum(filterItems.map(item => item.selected));
};

export function getDefaultSortOption(config, query) {
    const sortOptions = _.get(config, 'sort.options', '[]');
    return sortOptions.find(el => el.sort === query) || {
        label: 'Featured',
        sort: 'featured',
    };
}

export const makeConfigGetter = config => (object, key) => _.get(config, `${object}.${key}`, DEFAULT_CONFIG[object][key]);

export const getHighlightedTextComponent = (text, value) => {
    const parts = text.split(new RegExp(`(${value})`, 'gi'));
    return parts.map((part, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={i}>
            {part.toLowerCase() === value ? (
                <span data-testid="consonant-search-result" className="consonant-search-result">
                    {part}
                </span>
            ) : part}
        </span>
    ));
};
