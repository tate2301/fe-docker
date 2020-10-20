/* eslint-disable */
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import 'whatwg-fetch';
import {
    DESKTOP_MIN_WIDTH,
    FILTER_TYPES,
    FILTER_PANEL,
    LOADER_SIZE,
    PAGINATION_COUNT,
    TABLET_MIN_WIDTH,
    TRUNCATE_TEXT_QTY,
} from '../../../utils/constants';
import { ConfigContext, ExpandableContext } from '../../../utils/contexts';
import {
    getDefaultSortOption,
    getNumSelectedFilterItems,
    makeConfigGetter,
} from '../../../utils/consonant';
import {
    readBookmarksFromLocalStorage,
    saveBookmarksToLocalStorage,
} from '../../../utils/general';

import {
    shouldDisplayPaginator,
    getNumCardsToShow,
    getTotalPages,
    getActiveFilterIds,
    getUpdatedCardBookmarkData,
} from '../../../utils/Helpers';

import CardFilterer from '../../../utils/CardFilterer';
import JsonProcessor from '../../../utils/JsonProcessor';

import { useWindowDimensions } from '../../../utils/hooks';

import Bookmarks from '../Bookmarks/Bookmarks';
import Collection from '../Collection/Collection';
import { Info as LeftInfo } from '../Filters/Left/Info';
import LeftFilterPanel from '../Filters/Left/Panel';
import FiltersPanelTop from '../Filters/Top/Panel';
import Loader from '../Loader/Loader';
import LoadMore from '../Pagination/LoadMore';
import Paginator from '../Pagination/Paginator';
import Search from '../Search/Search';
import Select from '../Select/Select';


const Container = (props) => {
    const { config } = props;

    const getConfig = makeConfigGetter(config);

    // Config

    const filterPanelEnabled = getConfig('filterPanel', 'enabled');
    const filterPanelType = getConfig('filterPanel', 'type');
    const paginationType = getConfig('pagination', 'type');
    const paginationIsEnabled = getConfig('pagination', 'enabled');
    const resultsPerPage = getConfig('collection', 'resultsPerPage');
    const onlyShowBookmarks = getConfig('bookmarks', 'leftFilterPanel.bookmarkOnlyCollection');
    const authoredFilters = getConfig('filterPanel', 'filters');
    const filterLogic = getConfig('filterPanel', 'filterLogic').toLowerCase().trim();
    const collectionEndpoint = getConfig('collection', 'endpoint');
    const totalCardLimit = getConfig('collection', 'totalCardsToShow');
    const searchFields = getConfig('search', 'searchFields');
    const sortOptions = getConfig('sort', 'options');
    const defaultSortOption = getDefaultSortOption(config, getConfig('sort', 'defaultSort'));
    const featuredCards = getConfig('featuredCards', '');
    const leftPanelSearchPlaceholder = getConfig('search', 'i18n.leftFilterPanel.searchPlaceholderText');
    const topPanelSearchPlaceholder = getConfig('search', 'i18n.topFilterPanel.searchPlaceholderText');
    const searchPlaceholderText = getConfig('search', 'i18n.filterInfo.searchPlaceholderText');

    const [openDropdown, setOpenDropdown] = useState(null);
    const [bookmarkedCardIds, setBookmarkedCardIds] = useState(readBookmarksFromLocalStorage());
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState([]);
    const page = useRef();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOpened, setSortOpened] = useState(false);
    const [sortOption, setSortOption] = useState(defaultSortOption);
    const { width: windowWidth } = useWindowDimensions();
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [showBookmarks, setShowBookmarks] = useState(false);
    const [showLimitedFiltersQty, setShowLimitedFiltersQty] = useState(filterPanelType === 'top');
    const [cards, setCards] = useState([]);
    const [isLoading, setLoading] = useState(false);



    // callbacks

    const onLoadMoreClick = () => {
        setCurrentPage(prevState => prevState + 1);
        window.scrollTo(0, window.pageYOffset);
    };

    const clearFilterItems = (id) => {
        setFilters(prevFilters => prevFilters.map((el) => {
            if (el.id !== id) return el;
            return {
                ...el,
                items: el.items.map(item => ({
                    ...item,
                    selected: false,
                })),
            };
        }));
    };

    const clearFilters = () => {
        setFilters(prevFilters => prevFilters.map(el => ({
            ...el,
            items: el.items.map(filter => ({ ...filter, selected: false })),
        })));
    };

    const resetFiltersSearchAndBookmarks = () => {
        clearFilters();
        setSearchQuery('');
        setShowBookmarks(false);
    };

    const handleSortChange = (option) => {
        setSortOption(option);
        setSortOpened(false);
    };

    const handleSearchInputChange = (val) => {
        clearFilters();
        setSearchQuery(val);
    };

    const handleFilterItemClick = (filterId) => {
        const isUsingTopFilter = filterPanelType === 'top';
        setFilters((prevFilters) => {
            let opened;
            return prevFilters.map((el) => {
                if (el.id === filterId) {
                    opened = !el.opened;
                } else if (isUsingTopFilter) {
                    // Top filter can only have 1 simultaneous filter that's opened
                    opened = false;
                } else {
                    // eslint-disable-next-line prefer-destructuring
                    opened = el.opened;
                }
                return { ...el, opened };
            });
        });
    };

    const handleCheckBoxChange = (filterId, itemId, isChecked) => {
        // If xor filterLogic set, we reset all filters;
        if (filterLogic.toLowerCase().trim() === FILTER_TYPES.XOR && isChecked) clearFilters();

        setFilters(prevFilters => prevFilters.map((filter) => {
            if (filter.id !== filterId) return filter;

            return {
                ...filter,
                items: filter.items.map(item => ({
                    ...item,
                    selected: item.id === itemId ? !item.selected : item.selected,
                })),
            };
        }));
    };

    const handleFiltersToggle = () => setShowMobileFilters(prev => !prev);

    const handleCardBookmarking = (id) => {
        // Update bookmarked IDs
        const cardIsBookmarked = bookmarkedCardIds.find(card => card === id);

        if (cardIsBookmarked) {
            setBookmarkedCardIds(prev => prev.filter(el => el !== id));
        } else {
            setBookmarkedCardIds(prev => [...prev, id]);
        }
    };

    const handleShowBookmarksClick = (e) => {
        e.stopPropagation();
        setShowBookmarks(prev => !prev);
    };

    const handleShowAllTopFilters = () => {
        setShowLimitedFiltersQty(prev => !prev);
    };

    const handleWindowClick = () => {
        setOpenDropdown(null);
    };

    // Effects

    useEffect(() => {
        setFilters(authoredFilters.map(filterGroup => ({
            ...filterGroup,
            opened: DESKTOP_SCREEN_SIZE ? filterGroup.openedOnLoad : false,
            items: filterGroup.items.map(filterItem => ({
                ...filterItem,
                selected: false,
            })),
        })));
    }, [])

    useEffect(() => {
        setLoading(true);
        window.fetch(collectionEndpoint)
            .then(resp => resp.json())
            .then((payload) => {
                setLoading(false);
                if (!get(payload, 'cards.length')) return;

                const jsonProcessor = new JsonProcessor(payload.cards);
                const { processedCards } = jsonProcessor
                    .addFeaturedCards(featuredCards)
                    .removeDuplicateCards()
                    .addCardMetaData(TRUNCATE_TEXT_QTY, onlyShowBookmarks, bookmarkedCardIds);

                setCards(processedCards);

            }).catch(() => setLoading(false));
    }, []);

    // Update dimensions on resize
    useEffect(() => {
        const updateDimensions = debounce(() => setShowMobileFilters(false), 100);
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        saveBookmarksToLocalStorage(bookmarkedCardIds);
        setCards(getUpdatedCardBookmarkData(cards, bookmarkedCardIds));
    }, [bookmarkedCardIds]);

    useEffect(() => {
        if (showBookmarks) {
            clearFilters();
            setSearchQuery('');
        }
    }, [showBookmarks]);

    // Derived state

    const activeFilterIds = getActiveFilterIds(filters);

    const cardFilterer = new CardFilterer(cards);

    const { filteredCards } = cardFilterer
        .keepBookmarkedCardsOnly(onlyShowBookmarks, bookmarkedCardIds, showBookmarks)
        .filterCards(activeFilterIds, filterLogic, FILTER_TYPES)
        .sortCards(sortOption)
        .keepCardsWithinDateRange()
        .truncateList(totalCardLimit)
        .searchCards(searchQuery, searchFields)

    const collectionCards = filteredCards;

    const totalPages = getTotalPages(resultsPerPage, collectionCards.length);

    const numCardsToShow = getNumCardsToShow(resultsPerPage, currentPage, collectionCards.length);

    const selectedFiltersItemsQty = getNumSelectedFilterItems(filters);

    const displayPagination = shouldDisplayPaginator(
        paginationIsEnabled,
        resultsPerPage,
        collectionCards.length,
    );

    const displayLoadMore = displayPagination && paginationType === 'loadMore';
    const displayPaginator = displayPagination && paginationType === 'paginator';
    const displayLeftFilterPanel = filterPanelEnabled && filterPanelType === FILTER_PANEL.LEFT;
    const atLeastOneCard = collectionCards.length > 0;
    const topPanelSortPopupLocation = filters.length > 0 && windowWidth < TABLET_MIN_WIDTH ? 'left' : 'right';

    const DESKTOP_SCREEN_SIZE = window.innerWidth >= DESKTOP_MIN_WIDTH;

    return (
        <ConfigContext.Provider value={config}>
            <ExpandableContext.Provider value={{ value: openDropdown, setValue: setOpenDropdown }} >

                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */}
                <section
                    role="group"
                    onClick={handleWindowClick}
                    className="consonant-wrapper">
                    <div className="consonant-wrapper--inner">
                        {displayLeftFilterPanel && (
                            <span>
                                <LeftFilterPanel
                                    filters={filters}
                                    selectedFiltersQty={selectedFiltersItemsQty}
                                    windowWidth={windowWidth}
                                    onFilterClick={handleFilterItemClick}
                                    onClearAllFilters={resetFiltersSearchAndBookmarks}
                                    onClearFilterItems={clearFilterItems}
                                    onCheckboxClick={handleCheckBoxChange}
                                    onMobileFiltersToggleClick={handleFiltersToggle}
                                    onSelectedFilterClick={handleCheckBoxChange}
                                    showMobileFilters={showMobileFilters}
                                    resQty={collectionCards.length}
                                    bookmarkComponent={(
                                        <Bookmarks
                                            showBookmarks={showBookmarks}
                                            onClick={handleShowBookmarksClick}
                                            savedCardsCount={bookmarkedCardIds.length} />
                                    )}
                                    searchComponent={(
                                        <Search
                                            placeholderText={leftPanelSearchPlaceholder}
                                            name="filtersSideSearch"
                                            value={searchQuery}
                                            autofocus={false}
                                            onSearch={handleSearchInputChange} />
                                    )} />
                            </span>
                        )}
                        <span>
                            {
                                filterPanelType === FILTER_PANEL.TOP &&
                                <FiltersPanelTop
                                    filterPanelEnabled={filterPanelEnabled}
                                    filters={filters}
                                    windowWidth={windowWidth}
                                    resQty={collectionCards.length}
                                    onCheckboxClick={handleCheckBoxChange}
                                    onFilterClick={handleFilterItemClick}
                                    onClearFilterItems={clearFilterItems}
                                    onClearAllFilters={resetFiltersSearchAndBookmarks}
                                    showLimitedFiltersQty={showLimitedFiltersQty}
                                    searchComponent={(
                                        <Search
                                            placeholderText={topPanelSearchPlaceholder}
                                            name="filtersTopSearch"
                                            value={searchQuery}
                                            autofocus={DESKTOP_SCREEN_SIZE}
                                            onSearch={handleSearchInputChange} />
                                    )}
                                    sortComponent={(
                                        <Select
                                            opened={sortOpened}
                                            id="sort"
                                            val={sortOption}
                                            values={sortOptions}
                                            onSelect={handleSortChange}
                                            name="filtersTopSelect"
                                            autoWidth
                                            optionsAlignment={topPanelSortPopupLocation} />
                                    )}
                                    onShowAllClick={handleShowAllTopFilters} />
                            }
                            {filterPanelType === FILTER_PANEL.LEFT &&
                                <LeftInfo
                                    enabled={filterPanelEnabled}
                                    filtersQty={filters.length}
                                    filters={filters}
                                    cardsQty={collectionCards.length}
                                    selectedFiltersQty={selectedFiltersItemsQty}
                                    windowWidth={windowWidth}
                                    onMobileFiltersToggleClick={handleFiltersToggle}
                                    searchComponent={(
                                        <Search
                                            placeholderText={searchPlaceholderText}
                                            name="searchFiltersInfo"
                                            value={searchQuery}
                                            autofocus={false}
                                            onSearch={handleSearchInputChange} />
                                    )}
                                    sortComponent={(
                                        <Select
                                            opened={sortOpened}
                                            id="sort"
                                            val={sortOption}
                                            values={sortOptions}
                                            onSelect={handleSortChange}
                                            autoWidth={false}
                                            optionsAlignment="right" />
                                    )}
                                    sortOptions={sortOptions} />
                            }
                            {atLeastOneCard ?
                                <Fragment>
                                    <Collection
                                        resultsPerPage={resultsPerPage}
                                        pages={currentPage}
                                        cards={collectionCards}
                                        onCardBookmark={handleCardBookmarking} />
                                    {displayLoadMore && (
                                        <div ref={page}>
                                            <LoadMore
                                                onClick={onLoadMoreClick}
                                                show={numCardsToShow}
                                                total={collectionCards.length} />
                                        </div>
                                    )}
                                    {displayPaginator &&
                                        <Paginator
                                            pageCount={DESKTOP_SCREEN_SIZE ?
                                                PAGINATION_COUNT.DESKTOP : PAGINATION_COUNT.MOBILE
                                            }
                                            currentPageNumber={currentPage}
                                            totalPages={totalPages}
                                            showItemsPerPage={resultsPerPage}
                                            totalResults={collectionCards.length}
                                            onClick={setCurrentPage} />
                                    }
                                </Fragment> : (
                                    isLoading && (
                                        <Loader
                                            size={LOADER_SIZE.BIG}
                                            hidden={!totalCardLimit}
                                            absolute />
                                    )
                                )
                            }
                        </span>
                    </div>
                </section>
            </ExpandableContext.Provider>
        </ConfigContext.Provider>
    );
};

Container.propTypes = {
    config: PropTypes.shape({
        collection: PropTypes.shape({
            resultsPerPage: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            endpoint: PropTypes.string,
            title: PropTypes.string,
            totalCardLimit: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            cardStyle: PropTypes.string,
            displayTotalResults: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.bool
            ]),
            totalResultsText: PropTypes.string,
        }),
        featuredCards: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.object)
        ]),
        header: PropTypes.shape({
            enabled: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.bool
            ]),
        }),
        filterPanel: PropTypes.shape({
            enabled: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.bool
            ]),
            type: PropTypes.string,
            filters: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.arrayOf(PropTypes.object)
            ]),
            clearAllFiltersText: PropTypes.string,
            clearFilterText: PropTypes.string,
            filterLogic: PropTypes.string,
            leftPanelHeader: PropTypes.string,
        }),
        sort: PropTypes.shape({
            enabled: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.bool
            ]),
            options: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.arrayOf(PropTypes.object)
            ]),
        }),
        pagination: PropTypes.shape({
            enabled: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.bool
            ]),
            type: PropTypes.string,
            paginatorQuantityText: PropTypes.string,
            paginatorPrevLabel: PropTypes.string,
            paginatorNextLabel: PropTypes.string,
            loadMoreButtonText: PropTypes.string,
            loadMoreQuantityText: PropTypes.string,
        }),
        bookmarks: PropTypes.shape({
            enabled: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.bool]),
            cardSavedIcon: PropTypes.string,
            cardUnsavedIcon: PropTypes.string,
            saveCardText: PropTypes.string,
            unsaveCardText: PropTypes.string,
            selectBookmarksIcon: PropTypes.string,
            unselectBookmarksIcon: PropTypes.string,
            bookmarksFilterTitle: PropTypes.string,
        }),
        search: PropTypes.shape({
            enabled: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.bool
            ]),
            leftPanelTitle: PropTypes.string,
            inputPlaceholderText: PropTypes.string,
            searchFields: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.arrayOf(PropTypes.string),
            ]),
        }),
    }),
};

Container.defaultProps = {
    config: {},
};

export default Container;
