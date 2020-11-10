// eslint-disable-next-line import/prefer-default-export
export const selector = ({
    search: { enabled: searchEnabled },
    sort: { enabled: sortEnabled, options: sortOptions },
    collection: {
        showTotalResults,
        i18n: { title, totalResultsText },
    },
    filterPanel: {
        topPanel: {
            mobile: { blurFilters },
        },
        i18n: {
            topPanel: {
                moreFiltersBtnText,
                groupLabel,
                clearAllFiltersText,
                mobile: {
                    group: { clearFilterText },
                },
            },
        },
    },
}) => ({
    title,
    sortEnabled,
    sortOptions,
    blurFilters,
    searchEnabled,
    clearFilterText,
    showTotalResults,
    totalResultsText,
    moreFiltersBtnText,
    clearAllFiltersText,
    filterGroupLabel: groupLabel,
});
