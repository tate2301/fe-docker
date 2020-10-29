import { string, arrayOf, shape, number, bool, oneOfType } from 'prop-types';

import { TCard } from './card';

const TCollectionResultPerPage = [
    string,
    number,
];

const TCollectionTotalCardLimit = [
    string,
    number,
];

const TCollectionDisplayTotalResults = [
    bool,
    string,
];

const TCollection = {
    title: string,
    endpoint: string,
    cardStyle: string,
    totalResultsText: string,
    resultsPerPage: oneOfType(TCollectionResultPerPage),
    totalCardLimit: oneOfType(TCollectionTotalCardLimit),
    displayTotalResults: oneOfType(TCollectionDisplayTotalResults),
};

const TFeaturedCards = [
    string,
    arrayOf(shape(TCard)),
];

const TEnabled = [
    bool,
    string,
];

const THeader = {
    enabled: oneOfType(TEnabled),
};

export const TFilterItem = {
    id: string,
    label: oneOfType([string, number]),
};

export const TFilter = {
    id: string,
    group: string,
    items: arrayOf(shape(TFilterItem)),
};

const TFilters = [
    string,
    arrayOf(shape(TFilter)),
];

const TFilterPanel = {
    type: string,
    filterLogic: string,
    clearFilterText: string,
    leftPanelHeader: string,
    clearAllFiltersText: string,
    enabled: oneOfType(TEnabled),
    filters: oneOfType(TFilters),
};

const TPagination = {
    type: string,
    paginatorPrevLabel: string,
    paginatorNextLabel: string,
    loadMoreButtonText: string,
    enabled: oneOfType(TEnabled),
    loadMoreQuantityText: string,
    paginatorQuantityText: string,
};

const TBookmarks = {
    saveCardText: string,
    cardSavedIcon: string,
    unsaveCardText: string,
    cardUnsavedIcon: string,
    selectBookmarksIcon: string,
    enabled: oneOfType(TEnabled),
    bookmarksFilterTitle: string,
    unselectBookmarksIcon: string,
};

const TSearchField = [
    string,
    arrayOf(string),
];

const TSearch = {
    leftPanelTitle: string,
    inputPlaceholderText: string,
    enabled: oneOfType(TEnabled),
    searchFields: oneOfType(TSearchField),
};

export const TSortOption = {
    sort: string,
    label: string,
};

const TSort = {
    enabled: oneOfType(TEnabled),
    options: oneOfType([
        string,
        arrayOf(shape(TSortOption)),
    ]),
};

export const TConfig = {
    sort: shape(TSort),
    search: shape(TSearch),
    header: shape(THeader),
    bookmarks: shape(TBookmarks),
    collection: shape(TCollection),
    pagination: shape(TPagination),
    filterPanel: shape(TFilterPanel),
    featuredCards: oneOfType(TFeaturedCards),
};
