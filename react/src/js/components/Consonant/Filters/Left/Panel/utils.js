// eslint-disable-next-line import/prefer-default-export
export const selector = ({
    search: { enabled },
    collection: {
        showTotalResults,
    },
    bookmarks: {
        leftFilterPanel: {
            showBookmarksFilter,
        },
    },
    filterPanel: {
        i18n: {
            leftPanel: {
                header,
                clearAllFiltersText,
                mobile: {
                    panel: {
                        doneBtnText,
                        applyBtnText,
                        clearFilterText,
                        totalResultsText,
                        header: leftPanelMobileHeader,
                    },
                },
            },
        },
    },
}) => ({
    clearFilterText,
    showTotalResults,
    clearAllFiltersText,
    panelHeader: header,
    leftPanelMobileHeader,
    doneText: doneBtnText,
    searchEnabled: enabled,
    applyText: applyBtnText,
    bookmarksEnabled: showBookmarksFilter,
    showTotalResultsText: totalResultsText,
});
