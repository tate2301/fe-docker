/* eslint-disable */
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import includes from 'lodash/includes';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import 'whatwg-fetch';
import {
    DESKTOP_MIN_WIDTH,
    FILTER_TYPES,
    FILTER_PANEL,
    LOADER_SIZE,
    PAGINATION_COUNT,
    SORTING_OPTION,
    TABLET_MIN_WIDTH,
    TRUNCATE_TEXT_QTY,
} from '../../../constants';
import { ConfigContext, ExpandableContext } from '../../../contexts';
import {
    getDefaultSortOption,
    getNumSelectedFilterItems,
    makeConfigGetter,
} from '../../../utils/consonant';
import {
    chainFromIterable,
    readBookmarksFromLocalStorage,
    saveBookmarksToLocalStorage,
    sortByKey,
} from '../../../utils/general';

import {
    shouldDisplayPaginator,
    getNumCardsToShow,
    getTotalPages,
    getCollectionCards,
    getBookmarkedCards,
    getActiveFilterIds,
    getFilteredCards,
    getCardsMatchingSearch,
    highlightCard,
    CardProccesor,
} from './Helpers';

import { useWindowDimensions } from '../../../utils/hooks';

import Bookmarks from '../Bookmarks/Bookmarks';
import Collection from '../Collection/Collection';
import FilterInfo from '../Filters/Left/FilterInfo';
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
    const filtersConfig = getConfig('filterPanel', 'filters');
    const filterLogic = getConfig('filterPanel', 'filterLogic').toLowerCase().trim();
    const collectionEndpoint = getConfig('collection', 'endpoint');
    const totalCardLimit = getConfig('collection', 'totalCardsToShow');
    const searchFields = getConfig('search', 'searchFields');
    const sortOptions = getConfig('sort', 'options');
    const defaultSortOption = getDefaultSortOption(config, getConfig('sort', 'defaultSort'));

    const [openDropdown, setOpenDropdown] = useState(null);
    const [bookmarkedCardIds, setBookmarkedCardIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState([]);
    const page = useRef();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOpened, setSortOpened] = useState(false);
    const [sort, setSort] = useState(defaultSortOption);
    const { width: windowWidth } = useWindowDimensions();
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [showBookmarks, setShowBookmarks] = useState(false);
    const [showLimitedFiltersQty, setShowLimitedFiltersQty] = useState(filterPanelType === 'top');
    const [rawCards, setCards] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const cards = (() => rawCards.map(card => ({
        ...card,
        isBookmarked: bookmarkedCardIds.some(i => i === card.id),
    })))();

    const featuredCards = getConfig('featuredCards', '').map(el => ({
        ...el,
        isFeatured: true,
    }));

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
        setSort(option);
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

    const handleShowFavoritesClick = (e) => {
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
        console.log('second use effect ran');
        setBookmarkedCardIds(readBookmarksFromLocalStorage());
    }, []);

    useEffect(() => {
        console.log('first use effect ran');
        setLoading(true);
        window.fetch(collectionEndpoint)
            .then(resp => resp.json())
            .then((payload) => {
                console.log('first use effect in then block');
                setLoading(false);
                if (!get(payload, 'cards.length')) return;

                const cardProcessor = new CardProccesor(payload.cards);
                const { allCards } = cardProcessor
                    .addFeaturedCards(featuredCards)
                    .removeDuplicates()
                    .truncateList(totalCardLimit)
                    .keepBookmarkedCardsOnly(onlyShowBookmarks, bookmarkedCardIds)
                    .keepCardsWithinDateRange()
                    .populateCardMetaData(TRUNCATE_TEXT_QTY, onlyShowBookmarks);


                setCards(allCards);
                setFilters(filtersConfig.map(el => ({
                    ...el,
                    opened: window.innerWidth >= DESKTOP_MIN_WIDTH ? el.openedOnLoad : false,
                    items: el.items.map(item => ({
                        ...item,
                        selected: false,
                    })),
                })));
            }).catch(() => setLoading(false));
    }, [config.featuredCards]);

    // Update dimensions on resize
    useEffect(() => {
        console.log("Third is running");
        const updateDimensions = debounce(() => setShowMobileFilters(false), 100);
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        console.log('fourth use effect');
        saveBookmarksToLocalStorage(bookmarkedCardIds);
        console.log(bookmarkedCardIds);
    }, [bookmarkedCardIds]);

    useEffect(() => {
        console.log("Fifth is running");
        if (showBookmarks) {
            clearFilters();
            setSearchQuery('');
        }
    }, [showBookmarks]);

    useEffect(() => {
        console.log("Sixth is running");
        if (chainFromIterable(filters.map(f => f.items)).some(i => i.selected)) {
            // setShowBookmarks(false);
        }
    }, [filters]);

    // Derived state

    const activeFilterIds = getActiveFilterIds(filters);

    const filteredCards = getFilteredCards(cards, activeFilterIds, filterLogic, FILTER_TYPES);

    const searchedCards = (() => {
        const query = searchQuery.trim().toLowerCase();
        const cardsMatchingSearch = getCardsMatchingSearch(
            searchQuery,
            filteredCards,
            searchFields,
        );

        return cardsMatchingSearch
            .map(card => searchFields.reduce((baseCard, searchField) => highlightCard(
                baseCard,
                searchField,
                query,
            ), card));
    })();

    const sortedCards = (() => {
        let sorted;
        const sortName = sort ? sort.sort : null;
        if (!sortName) {
            return searchedCards;
        }
        const sortType = sortName.toLowerCase();
        const cardField = SORTING_OPTION[sortName.toUpperCase().trim()];
        if (!cardField) return searchedCards;

        // Sorting for featured and date;

        const sortingByDate = includes(['dateasc', 'datedesc'], sortType);
        if (sortingByDate) {
            sorted = sortByKey(searchedCards, c => c[cardField]);
        } else {
            sorted = [...searchedCards]
                .sort((a, b) => a[cardField].localeCompare(b[cardField], 'en', { numeric: true }));
        }

        if (includes(sortType, 'desc')) sorted.reverse();
        // In case of featured, move featured items to the top;
        if (sortType === 'featured') {
            sorted.sort((a, b) => {
                if (a.isFeatured && b.isFeatured) {
                    return a.initialTitle < b.initialTitle ? -1 : 0;
                } else if (a.isFeatured) {
                    return -1;
                } else if (b.isFeatured) {
                    return 1;
                }
                return 0;
            });
        }

        return sorted;
    })();

    const bookmarkedCards = getBookmarkedCards(sortedCards);

    window.showBookmarks = showBookmarks;
    window.bookmarkedCards = bookmarkedCards;
    window.sortedCards = sortedCards;
    const collectionCards = getCollectionCards(showBookmarks, bookmarkedCards, sortedCards);

    const totalPages = getTotalPages(resultsPerPage, filteredCards.length);

    const numCardsToShow = getNumCardsToShow(resultsPerPage, currentPage, filteredCards.length);

    const selectedFiltersItemsQty = getNumSelectedFilterItems(filters);

    const displayPaginator = shouldDisplayPaginator(
        paginationIsEnabled,
        resultsPerPage,
        filteredCards.length,
    );

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
                        {filterPanelEnabled && filterPanelType === FILTER_PANEL.LEFT && (
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
                                    resQty={filteredCards.length}
                                    bookmarkComponent={(
                                        <Bookmarks
                                            name="filtersSideBookmarks"
                                            selected={showBookmarks}
                                            onClick={handleShowFavoritesClick}
                                            qty={bookmarkedCardIds.length} />
                                    )}
                                    searchComponent={(
                                        <Search
                                            placeholderText={getConfig('search', 'i18n.leftFilterPanel.searchPlaceholderText')}
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
                                    resQty={filteredCards.length}
                                    onCheckboxClick={handleCheckBoxChange}
                                    onFilterClick={handleFilterItemClick}
                                    onClearFilterItems={clearFilterItems}
                                    onClearAllFilters={resetFiltersSearchAndBookmarks}
                                    showLimitedFiltersQty={showLimitedFiltersQty}
                                    searchComponent={(
                                        <Search
                                            placeholderText={getConfig('search', 'i18n.topFilterPanel.searchPlaceholderText')}
                                            name="filtersTopSearch"
                                            value={searchQuery}
                                            autofocus={windowWidth >= DESKTOP_MIN_WIDTH}
                                            onSearch={handleSearchInputChange} />
                                    )}
                                    sortComponent={(
                                        <Select
                                            opened={sortOpened}
                                            id="sort"
                                            val={sort}
                                            values={getConfig('sort', 'options')}
                                            onSelect={handleSortChange}
                                            name="filtersTopSelect"
                                            autoWidth
                                            optionsAlignment={filters.length > 0 && windowWidth < TABLET_MIN_WIDTH ? 'left' : 'right'} />
                                    )}
                                    onShowAllClick={handleShowAllTopFilters} />
                            }
                            {filterPanelType === FILTER_PANEL.LEFT &&
                                <FilterInfo
                                    enabled={filterPanelEnabled}
                                    filtersQty={filters.length}
                                    cardsQty={filteredCards.length}
                                    selectedFiltersQty={selectedFiltersItemsQty}
                                    windowWidth={windowWidth}
                                    onMobileFiltersToggleClick={handleFiltersToggle}
                                    searchComponent={(
                                        <Search
                                            placeholderText={getConfig('search', 'i18n.filterInfo.searchPlaceholderText')}
                                            name="searchFiltersInfo"
                                            value={searchQuery}
                                            autofocus={false}
                                            onSearch={handleSearchInputChange} />
                                    )}
                                    sortComponent={(
                                        <Select
                                            opened={sortOpened}
                                            id="sort"
                                            val={sort}
                                            values={sortOptions}
                                            onSelect={handleSortChange}
                                            autoWidth={false}
                                            optionsAlignment="right" />
                                    )}
                                    sortOptions={sortOptions} />
                            }
                            {collectionCards.length > 0 ?
                                <Fragment>
                                    <Collection
                                        resultsPerPage={resultsPerPage}
                                        pages={currentPage}
                                        cards={collectionCards}
                                        onCardBookmark={handleCardBookmarking} />
                                    {/* TODO: Migrate to useRef */}
                                    {displayPaginator && paginationType === 'loadMore' && (
                                        <div ref={page}>
                                            <LoadMore
                                                onClick={onLoadMoreClick}
                                                show={numCardsToShow}
                                                total={filteredCards.length} />
                                        </div>
                                    )}
                                    {displayPaginator && paginationType === 'paginator' &&
                                        <Paginator
                                            pageCount={windowWidth <= DESKTOP_MIN_WIDTH ?
                                                PAGINATION_COUNT.MOBILE : PAGINATION_COUNT.DESKTOP
                                            }
                                            currentPageNumber={currentPage}
                                            totalPages={totalPages}
                                            showItemsPerPage={resultsPerPage}
                                            totalResults={filteredCards.length}
                                            onClick={setCurrentPage} />
                                    }
                                </Fragment> : (
                                    isLoading && (
                                        <Loader
                                            size={LOADER_SIZE.BIG}
                                            hidden={!getConfig('collection', 'totalCardsToShow')}
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
            resultsPerPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            endpoint: PropTypes.string,
            title: PropTypes.string,
            totalCardLimit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            cardStyle: PropTypes.string,
            displayTotalResults: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
            totalResultsText: PropTypes.string,
        }),
        featuredCards: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.object)]),
        header: PropTypes.shape({
            enabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        }),
        filterPanel: PropTypes.shape({
            enabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
            type: PropTypes.string,
            filters: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.object)]),
            clearAllFiltersText: PropTypes.string,
            clearFilterText: PropTypes.string,
            filterLogic: PropTypes.string,
            leftPanelHeader: PropTypes.string,
        }),
        sort: PropTypes.shape({
            enabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
            options: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.object)]),
        }),
        pagination: PropTypes.shape({
            enabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
            type: PropTypes.string,
            paginatorQuantityText: PropTypes.string,
            paginatorPrevLabel: PropTypes.string,
            paginatorNextLabel: PropTypes.string,
            loadMoreButtonText: PropTypes.string,
            loadMoreQuantityText: PropTypes.string,
        }),
        bookmarks: PropTypes.shape({
            enabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
            cardSavedIcon: PropTypes.string,
            cardUnsavedIcon: PropTypes.string,
            saveCardText: PropTypes.string,
            unsaveCardText: PropTypes.string,
            selectBookmarksIcon: PropTypes.string,
            unselectBookmarksIcon: PropTypes.string,
            bookmarksFilterTitle: PropTypes.string,
        }),
        search: PropTypes.shape({
            enabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
            leftPanelTitle: PropTypes.string,
            inputPlaceholderText: PropTypes.string,
            searchFields: PropTypes.oneOfType([
                PropTypes.string, PropTypes.arrayOf(PropTypes.string),
            ]),
        }),
    }),
};

Container.defaultProps = {
    config: {},
};

export default Container;
