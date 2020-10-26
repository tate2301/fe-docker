import {
    shape,
    number,
    string,
    bool,
    arrayOf
} from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const contextPropTypes = {
    collection: shape({
        resultsPerPage: number,
        endpoint: string,
        totalCardsToShow: number,
        cardStyle: string,
        showTotalResults: bool,
        i18n: shape({
            prettyDateIntervalFormat: string,
            totalResultsText: string,
            title: string,
        }),
    }),
    featuredCards: arrayOf(shape({
        id: string,
        showCard: shape({
            from: string,
            until: string,
        }),
        styles: shape({
            typeOverride: string,
            backgroundImage: string,
        }),
        overlays: shape({
            banner: shape({
                description: string,
                backgroundColor: string,
                fontColor: string,
                icon: string,
            }),
            logo: shape({}),
            label: shape({}),
            videoButton: shape({
                url: string,
            }),
        }),
        contentArea: shape({
            detailText: string,
            title: string,
            description: string,
            dateDetailText: shape({
                startTime: string,
                endTime: string,
            }),
        }),
        appliesTo: arrayOf(shape({
            id: string,
        })),
        footer: arrayOf(shape({
            divider: bool,
            left: arrayOf(shape({
                type: string,
                saveCardIcon: string,
                unsaveCardIcon: string,
                cardSaveText: string,
                cardUnsaveText: string,
            })),
            right: arrayOf(shape({
                type: string,
                style: string,
                text: string,
                href: string,
            })),
        })),
    })),
    header: shape({
        enabled: bool,
    }),
    filterPanel: shape({
        enabled: bool,
        type: string,
        filterLogic: string,
        filters: arrayOf(shape({
            group: string,
            id: string,
            icon: string,
            openedOnLoad: bool,
            items: arrayOf(shape({
                label: string,
                id: string,
            })),
        })),
        i18n: shape({
            leftPanel: shape({
                header: string,
                clearAllFiltersText: string,
                mobile: shape({
                    filtersBtnLabel: string,
                    panel: shape({
                        header: string,
                        totalResultsText: string,
                        applyBtnText: string,
                        clearFilterText: string,
                        doneBtnText: string,
                    }),
                    group: shape({
                        totalResultsText: string,
                        applyBtnText: string,
                        clearFilterText: string,
                        doneBtnText: string,
                    }),
                }),
            }),
            topPanel: shape({
                groupLabel: string,
                clearAllFiltersText: string,
                moreFiltersBtnText: string,
                mobile: shape({
                    group: shape({
                        totalResultsText: string,
                        applyBtnText: string,
                        clearFilterText: string,
                        doneBtnText: string,
                    }),
                }),
            }),
        }),
    }),
    sort: shape({
        enabled: bool,
        defaultSort: string,
        options: arrayOf(shape({
            label: string,
            sort: string,
        })),
    }),
    pagination: shape({
        enabled: bool,
        type: string,
        i18n: shape({
            loadMore: shape({
                btnText: string,
                resultsQuantityText: string,
            }),
            paginator: shape({
                resultsQuantityText: string,
                prevLabel: string,
                nextLabel: string,
            }),
        }),
    }),
    bookmarks: shape({
        leftFilterPanel: shape({
            bookmarkOnlyCollection: bool,
            showBookmarksFilter: bool,
            selectBookmarksIcon: string,
            unselectBookmarksIcon: string,
        }),
        i18n: shape({
            leftFilterPanel: shape({
                filterTitle: string,
            }),
        }),
    }),
    search: shape({
        enabled: bool,
        searchFields: arrayOf(string),
        i18n: shape({
            leftFilterPanel: shape({
                searchTitle: string,
                searchPlaceholderText: string,
            }),
            topFilterPanel: shape({
                searchPlaceholderText: string,
            }),
            filterInfo: shape({
                searchPlaceholderText: string,
            }),
        }),
    }),
    language: string,
};
