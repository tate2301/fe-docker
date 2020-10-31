import {
    string,
    arrayOf,
    shape,
    number,
    bool,
    oneOfType,
} from 'prop-types';

import { CardType } from './card';

const CollectionResultPerPageType = [
    string,
    number,
];

const CollectionTotalCardLimitType = [
    string,
    number,
];

const CollectionDisplayTotalResultsType = [
    bool,
    string,
];

const CollectionType = {
    title: string,
    endpoint: string,
    cardStyle: string,
    totalResultsText: string,
    resultsPerPage: oneOfType(CollectionResultPerPageType),
    totalCardLimit: oneOfType(CollectionTotalCardLimitType),
    displayTotalResults: oneOfType(CollectionDisplayTotalResultsType),
};

const FeaturedCardsType = [
    string,
    arrayOf(shape(CardType)),
];

const EnabledType = [
    bool,
    string,
];

const HeaderType = {
    enabled: oneOfType(EnabledType),
};

export const FilterItemType = {
    id: string,
    label: oneOfType([string, number]),
};

export const FilterType = {
    id: string,
    group: string,
    items: arrayOf(shape(FilterItemType)),
};

const FiltersType = [
    string,
    arrayOf(shape(FilterType)),
];

const FilterPanelType = {
    type: string,
    filterLogic: string,
    clearFilterText: string,
    leftPanelHeader: string,
    clearAllFiltersText: string,
    enabled: oneOfType(EnabledType),
    filters: oneOfType(FiltersType),
};

const PaginationType = {
    type: string,
    paginatorPrevLabel: string,
    paginatorNextLabel: string,
    loadMoreButtonText: string,
    enabled: oneOfType(EnabledType),
    loadMoreQuantityText: string,
    paginatorQuantityText: string,
};

const BookmarksType = {
    saveCardText: string,
    cardSavedIcon: string,
    unsaveCardText: string,
    cardUnsavedIcon: string,
    selectBookmarksIcon: string,
    enabled: oneOfType(EnabledType),
    bookmarksFilterTitle: string,
    unselectBookmarksIcon: string,
};

const SearchFieldType = [
    string,
    arrayOf(string),
];

const SearchType = {
    leftPanelTitle: string,
    inputPlaceholderText: string,
    enabled: oneOfType(EnabledType),
    searchFields: oneOfType(SearchFieldType),
};

export const SortOptionType = {
    sort: string,
    label: string,
};

const SortType = {
    enabled: oneOfType(EnabledType),
    options: oneOfType([
        string,
        arrayOf(shape(SortOptionType)),
    ]),
};

export const ConfigType = {
    sort: shape(SortType),
    search: shape(SearchType),
    header: shape(HeaderType),
    bookmarks: shape(BookmarksType),
    collection: shape(CollectionType),
    pagination: shape(PaginationType),
    filterPanel: shape(FilterPanelType),
    featuredCards: oneOfType(FeaturedCardsType),
};
