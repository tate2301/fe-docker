// eslint-disable-next-line import/prefer-default-export
export const selector = ({
    sort: { enabled: sortEnabled },
    search: { enabled: searchEnabled },
    filterPanel: {
        enabled: filterPanelEnabled,
        i18n: {
            leftPanel: {
                mobile: { filtersBtnLabel },
            },
        },
    },
    collection: {
        showTotalResults,
        i18n: { title, totalResultsText },
    },
}) => ({
    title,
    sortEnabled,
    searchEnabled,
    showTotalResults,
    totalResultsText,
    filterPanelEnabled,
    mobileFilterButtonlabel: filtersBtnLabel,
});
