// eslint-disable-next-line import/prefer-default-export
export const selector = ({
    featuredCards,
    sort: {
        defaultSort,
        options: sortOptions,
    },
    bookmarks: {
        leftFilterPanel: { bookmarkOnlyCollection: onlyShowBookmarks },
    },
    collection: {
        resultsPerPage,
        endpoint: collectionEndpoint,
        totalCardsToShow: totalCardLimit,
        i18n: {
            onErrorTitle: apiFailureTitle,
            onErrorDescription: apiFailureDescription,
        },
    },
    search: {
        searchFields,
        noResultsTitle,
        noResultsDescription,
        i18n: {
            filterInfo: { searchPlaceholderText },
            topFilterPanel: { searchPlaceholderText: topPanelSearchPlaceholder },
            leftFilterPanel: { searchPlaceholderText: leftPanelSearchPlaceholder },
        },
    },
    pagination: {
        type: paginationType,
        enabled: paginationIsEnabled,
    },
    filterPanel: {
        filterLogic,
        type: filterPanelType,
        filters: authoredFilters,
        enabled: filterPanelEnabled,
    },
}) => ({
    defaultSort,
    sortOptions,
    filterLogic,
    searchFields,
    featuredCards,
    paginationType,
    noResultsTitle,
    resultsPerPage,
    totalCardLimit,
    apiFailureTitle,
    authoredFilters,
    filterPanelType,
    onlyShowBookmarks,
    collectionEndpoint,
    filterPanelEnabled,
    paginationIsEnabled,
    noResultsDescription,
    apiFailureDescription,
    searchPlaceholderText,
    topPanelSearchPlaceholder,
    leftPanelSearchPlaceholder,
});
