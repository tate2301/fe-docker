/**
 * Screen Size Constants
 */
export const DESKTOP_MIN_WIDTH = 1200;
export const TABLET_MIN_WIDTH = 768;
export const DESKTOP_SCREEN_SIZE = window.innerWidth >= DESKTOP_MIN_WIDTH;
export const NOT_DESKTOP_SCREEN_SIZE = window.innerWidth < DESKTOP_MIN_WIDTH;

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
 * Fitler Constants
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

export const CARD_SORT_FIELD = {
    FEATURED: 'initialTitle',
    DATEASC: 'cardDate',
    DATEDESC: 'cardDate',
    TITLEASC: 'initialTitle',
    TITLEDESC: 'initialTitle',
};

export const SORT_TYPES = {
    DATEASC: 'dateasc',
    DATEDESC: 'datedesc',
    FEATURED: 'featured',
    TITLEASC: 'titleasc',
    TITLEDESC: 'titledesc',
};

/**
 * CSS Constants
 */

export const CLASS_NAME = {
    TOP_FILTER: 'consonant-top-filter',
    TOP_FILTER_OPENED: 'consonant-top-filter consonant-top-filter_opened',
    TOP_FILTER_SELECTED: 'consonant-top-filter consonant-top-filter_selected',
    SEARCH: 'consonant-top-filters--search-ico-wrapper',
    SELECT: 'consonant-select--btn',
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
    },
    language: 'en',
};

/**
 * Miscellanous Constants
 */
export const LOADER_SIZE = {
    MEDIUM: 'medium',
    BIG: 'big',
};