/**
 * Screen Size Constants
 */
export const DESKTOP_MIN_WIDTH = 1200;
export const TABLET_MIN_WIDTH = 768;

/**
 * Limit Constants
 */
export const MAX_TRUNCATED_FILTERS = 3;
export const MIN_FILTERS_SHOW_BG = 3;
export const TRUNCATE_TEXT_QTY = 200;

/**
 * Paginator Constants
 */
export const PAGINATION_COUNT = {
    DESKTOP: 10,
    MOBILE: 4,
};

/**
 * Filter Constants
 */

export const FILTER_TYPES = {
    AND: 'and',
    OR: 'or',
    XOR: 'xor',
};
export const FILTER_PANEL = {
    LEFT: 'left',
    TOP: 'top',
};

/**
 * Sorting Constants
 */

export const SORT_TYPES = {
    DATEASC: 'dateasc',
    DATEDESC: 'datedesc',
    FEATURED: 'featured',
    TITLEASC: 'titleasc',
    TITLEDESC: 'titledesc',
};

/**
 * Card Footer Constants
 */

export const INFOBIT_TYPE = {
    PRICE: 'price',
    BUTTON: 'button',
    ICON_TEXT: 'icon-with-text',
    LINK_ICON: 'link-with-icon',
    TEXT: 'text',
    ICON: 'icon',
    LINK: 'link',
    PROGRESS: 'progress-bar',
    RATING: 'rating',
    BOOKMARK: 'bookmark',
    DATE: 'date-interval',
};

/**
 * Default Authoring Constants
 */
export const DEFAULT_CONFIG = {
    collection: {
        resultsPerPage: 9,
        endpoint: '',
        title: '',
        totalCardLimit: -1,
        cardStyle: 'none',
        displayTotalResults: true,
        totalResultsText: '{} results',
        i18n: {
            prettyDateIntervalFormat: '{LLL} {dd} | {timeRange} {timeZone}',
            totalResultsText: '{total} results',
            title: '',
            onErrorTitle: 'Sorry there was a system error.',
            onErrorDescription: 'Please try reloading the page or try coming back to the page another time.',
        },
    },
    featuredCards: [],
    header: {
        enabled: false,
    },
    filterPanel: {
        enabled: true,
        type: 'left',
        filters: [],
        clearAllFiltersText: 'Clear all',
        clearFilterText: 'Clear',
        filterLogic: 'and',
        leftPanelHeader: 'Refine the results',
        topPanel: {
            mobile: {
                blurFilters: true,
            },
        },
    },
    sort: {
        enabled: true,
        defaultSort: 'featured',
        options: [],
    },
    pagination: {
        enabled: true,
        type: 'loadMore',
        paginatorQuantityText: 'Showing {}-{} of {} Results',
        paginatorPrevLabel: 'Previous',
        paginatorNextLabel: 'Next',
        loadMoreButtonText: 'Load more',
        loadMoreQuantityText: '{} of {} displayed',
    },
    bookmarks: {
        enabled: true,
        bookmarkOnlyCollection: false,
        cardSavedIcon: '',
        cardUnsavedIcon: '',
        selectBookmarksIcon: '',
        unselectBookmarksIcon: '',
        saveCardText: 'Save card',
        unsaveCardText: 'Unsave card',
        bookmarksFilterTitle: 'My favorites',
    },
    search: {
        enabled: true,
        inputPlaceholderText: 'Search here...',
        leftPanelTitle: 'Search',
        searchFields: [
            'title',
            'description',
        ],
        i18n: {
            noResultsTitle: 'No results found',
            noResultsDescription: `We couldn’t find any results for your {query}.{break}
            Check your spelling or try broadening your search.`,
        },
    },
    language: 'en',
};

/**
 * Collection Constants
 */
export const DEFAULT_SHOW_ITEMS_PER_PAGE = 8;

export const CARD_STYLES = {
    WIDE: '3:2',
    SQUARE: '1:1',
    FULL: 'full-card',
};

/**
 * Miscellanous Constants
 */
export const LOADER_SIZE = {
    MEDIUM: 'medium',
    BIG: 'big',
};
