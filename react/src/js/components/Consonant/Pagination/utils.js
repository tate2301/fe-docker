export const loadMoreSelector = ({
    pagination: {
        i18n: {
            loadMore: {
                btnText,
                resultsQuantityText,
            },
        },
    },
}) => ({
    loadMoreButtonText: btnText,
    loadMoreQuantityText: resultsQuantityText,
});

export const paginatorSelector = ({
    pagination: {
        i18n: {
            paginator: {
                prevLabel,
                nextLabel,
                resultsQuantityText,
            },
        },
    },
}) => ({
    nextLabel,
    prevLabel,
    quantityText: resultsQuantityText,
});
