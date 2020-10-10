import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import 'whatwg-fetch';
import {
    cleanText, sortByKey,
    chainFromIterable,
    intersection,
    isSuperset,
    readBookmarksFromLocalStorage,
    removeDuplicatesByKey,
    saveBookmarksToLocalStorage,
    truncateList,
    truncateString,
} from '../../../utils/general';
import { makeConfigGetter, getDefaultSortOption, getNumSelectedFilterItems } from '../../../utils/consonant';
import {
    DESKTOP_MIN_WIDTH,
    FILTER_LOGIC,
    FILTER_PANEL,
    LOADER_SIZE,
    PAGINATION_COUNT,
    SORTING_OPTION,
    TABLET_MIN_WIDTH,
    TRUNCATE_TEXT_QTY,
} from '../../../constants';
import { ExpandableContext, ConfigContext } from '../../../contexts';
import { filterCardsByDateRange } from '../../../utils/cards';


import { useWindowDimensions } from '../../../utils/hooks';


import parseToPrimitive from '../../../utils/parseToPrimitive';
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

    const getConfig = useCallback(makeConfigGetter(config), [config]);

    const filterPanelEnabled = getConfig('filterPanel', 'enabled');
    const filterPanelType = getConfig('filterPanel', 'type');
    const paginationType = getConfig('pagination', 'type');
    const paginationIsEnabled = getConfig('pagination', 'enabled');
    const resultsPerPage = getConfig('collection', 'resultsPerPage');
    const onlyShowBookmarks = getConfig('bookmarks', 'bookmarkOnlyCollection');
    const filtersConfig = parseToPrimitive(getConfig('filterPanel', 'filters'));
    const filterLogic = getConfig('filterPanel', 'filterLogic').toLowerCase().trim();
    const collectionEndpoint = getConfig('collection', 'endpoint');
    const totalCardLimit = getConfig('collection', 'totalCardLimit');
    const searchFields = parseToPrimitive(getConfig('search', 'searchFields'));
    const sortOptions = parseToPrimitive(getConfig('sort', 'options'));
    const defaultSortOption = getDefaultSortOption(config, getConfig('sort', 'defaultSort'));

    const [openDropdown, setOpenDropdown] = useState(null);
    const [bookmarkedCardIds, setBookmarkedCardIds] = useState([]);
    const [pages, setPages] = useState(1);
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

    const cards = useMemo(() => rawCards.map(card => ({
        ...card,
        isBookmarked: bookmarkedCardIds.some(i => i === card.id),
    })), [rawCards, bookmarkedCardIds]);

    // callbacks

    const populateCardMetadata = useCallback(card => ({
        ...card,
        initialTitle: card.title,
        description: truncateString(card.description, TRUNCATE_TEXT_QTY),
        initialText: card.description,
        isBookmarked: false,
        disableBookmarkIco: onlyShowBookmarks,
    }), []);

    const onLoadMoreClick = useCallback(() => {
        setPages(prevState => prevState + 1);
        window.scrollTo(0, window.pageYOffset);
    }, []);

    const clearFilterItems = useCallback((id) => {
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
    }, [setFilters]);

    const clearFilters = useCallback(() => {
        setFilters(prevFilters => prevFilters.map(el => ({
            ...el,
            items: el.items.map(filter => ({ ...filter, selected: false })),
        })));
    }, [setFilters]);

    const resetFiltersSearchAndBookmarks = useCallback(() => {
        clearFilters();
        setSearchQuery('');
        setShowBookmarks(false);
    }, [clearFilters]);

    const handleSortChange = useCallback((option) => {
        setSort(option);
        setSortOpened(false);
    }, [setSort, setSortOpened]);

    const handleSearchInputChange = useCallback((val) => {
        clearFilters();
        setSearchQuery(val);
    }, [setSearchQuery, clearFilters]);

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

    const handleCheckBoxChange = useCallback((filterId, itemId, isChecked) => {
        // If xor filterLogic set, we reset all filters;
        if (filterLogic.toLowerCase().trim() === FILTER_LOGIC.XOR && isChecked) clearFilters();

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
    }, [clearFilters, setFilters]);

    const handleFiltersToggle = () => setShowMobileFilters(prev => !prev);

    const handleCardBookmarking = useCallback((id) => {
        // Update bookmarked IDs
        const cardIsBookmarked = bookmarkedCardIds.find(card => card === id);

        if (cardIsBookmarked) {
            setBookmarkedCardIds(prev => prev.filter(el => el !== id));
        } else {
            setBookmarkedCardIds(prev => [...prev, id]);
        }
    }, [bookmarkedCardIds]);

    const handleShowFavoritesClick = useCallback((e) => {
        e.stopPropagation();
        setShowBookmarks(prev => !prev);
    }, [setShowBookmarks]);

    const handleShowAllTopFilters = useCallback(() => {
        setShowLimitedFiltersQty(prev => !prev);
    }, []);

    const handleWindowClick = useCallback(() => {
        setOpenDropdown(null);
    }, []);

    // Effects

    useEffect(() => {
        window.fetch(collectionEndpoint)
            .then(resp => resp.json())
            .then((payload) => {
                if (!_.get(payload, 'cards.length')) return;

                let featuredCards = parseToPrimitive(config.featuredCards) || [];
                featuredCards = featuredCards.map(el => ({
                    ...el,
                    isFeatured: true,
                }));

                let allCards = removeDuplicatesByKey(featuredCards.concat(parseToPrimitive(payload.cards)), 'id');

                // If this.config.bookmarks.bookmarkOnlyCollection;
                if (onlyShowBookmarks) {
                    allCards = allCards.filter(card => _.includes(bookmarkedCardIds, card.id));
                }

                allCards = filterCardsByDateRange(allCards);
                allCards = truncateList(totalCardLimit, allCards).map(populateCardMetadata);
                setCards(allCards);
                setFilters(filtersConfig.map(el => ({
                    ...el,
                    opened: window.innerWidth >= DESKTOP_MIN_WIDTH ? el.openedOnLoad : false,
                    items: el.items.map(item => ({
                        ...item,
                        selected: false,
                    })),
                })));
            });
    }, [bookmarkedCardIds, config.featuredCards, populateCardMetadata]);

    useEffect(() => {
        setBookmarkedCardIds(readBookmarksFromLocalStorage());
    }, []);

    // Update dimensions on resize
    useEffect(() => {
        const updateDimensions = _.debounce(() => setShowMobileFilters(false), 100);
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        saveBookmarksToLocalStorage(bookmarkedCardIds);
    }, [cards, bookmarkedCardIds]);

    useEffect(() => {
        if (showBookmarks) {
            clearFilters();
            setSearchQuery('');
        }
    }, [showBookmarks, clearFilters]);

    useEffect(() => {
        if (chainFromIterable(filters.map(f => f.items)).some(i => i.selected)) {
            setShowBookmarks(false);
        }
    }, [filters]);

    // Derived state

    const activeFilterIds = useMemo(() => chainFromIterable(filters.map(f => f.items))
        .filter(item => item.selected)
        .map(item => item.id), [filters]);

    const filteredCards = useMemo(() => {
        const activeFilterIdsSet = new Set(activeFilterIds);

        const usingXorAndFilter = filterLogic === FILTER_LOGIC.XOR
            || filterLogic === FILTER_LOGIC.AND;
        const usingOrFilter = filterLogic === FILTER_LOGIC.OR;

        return cards.filter((card) => {
            if (!card.appliesTo) {
                return false;
            }

            const tagIds = new Set(card.appliesTo.map(tag => tag.id));

            if (usingXorAndFilter) {
                return isSuperset(tagIds, activeFilterIdsSet);
            } else if (usingOrFilter) {
                return intersection(tagIds, activeFilterIdsSet).size;
            }
            throw new Error(`Unrecognized filter logic: ${filterLogic}`);
        });
    }, [cards, activeFilterIds]);

    const highlightSearchResultText = (text, val) => text.replace(new RegExp(val, 'gi'), value => `
            <span data-testid="consonant-search-result" class="consonant-search-result">
                ${value}
            </span>
        `);

    const searchedCards = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return filteredCards;
        const fieldsToHighlight = ['title', 'description'];

        return filteredCards
            .filter(card => searchFields.some((searchField) => {
                const searchFieldValue = cleanText(_.get(card, searchField, ''));
                return _.includes(searchFieldValue, query);
            }))
            .map(card => fieldsToHighlight.reduce((modifiedCard, field) => ({
                ...modifiedCard,
                [field]: highlightSearchResultText(modifiedCard[field], query),
            }), card));
    }, [searchQuery, filteredCards]);

    const sortedCards = useMemo(() => {
        const sortName = sort ? sort.sort : null;
        if (!sortName) {
            return searchedCards;
        }
        const cardField = SORTING_OPTION[sortName.toUpperCase().trim()];
        if (!cardField) return searchedCards;

        let sorted;

        // Sorting for featured and date;

        const sortingByDate = _.includes(['dateasc', 'datedesc'], sortName.toLowerCase());
        if (sortingByDate) {
            sorted = sortByKey(searchedCards, c => c[cardField]);
        } else {
            sorted = [...searchedCards]
                .sort((a, b) => a[cardField].localeCompare(b[cardField], 'en', { numeric: true }));
        }

        if (_.includes(sortName.toLowerCase(), 'desc')) sorted.reverse();
        // In case of featured, move featured items to the top;
        if (sortName.toLowerCase() === 'featured') {
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
    }, [searchedCards, sort]);

    const bookmarkedCards = useMemo(
        () => sortedCards.filter(card => card.isBookmarked),
        [sortedCards],
    );


    const collectionCards = useMemo(() => {
        // INFO: bookmarked cards will be ordered because bookmarked cards is
        //  derived from sorted Cards
        const shownCards = showBookmarks ? bookmarkedCards : sortedCards;

        const isUsingPaginator = paginationType === 'paginator';
        if (resultsPerPage && isUsingPaginator) {
            const start = (pages - 1) * resultsPerPage;
            return shownCards.slice(start, start + resultsPerPage);
        }

        return shownCards;
    }, [sortedCards, pages, resultsPerPage, showBookmarks, bookmarkedCards]);

    const totalPages = useMemo(
        () => Math.ceil(filteredCards.length / resultsPerPage),
        [filteredCards, resultsPerPage],
    );

    const numCardsToShow = useMemo(
        () => Math.min(resultsPerPage * pages, filteredCards.length),
        [resultsPerPage, filteredCards, pages],
    );

    const selectedFiltersItemsQty = getNumSelectedFilterItems(filters);

    // Other callbacks

    const shouldDisplayPaginator = useMemo(() => {
        const resultsPerPageNotZero = resultsPerPage > 0;
        const cardLengthExceedsDisplayLimit = filteredCards.length > resultsPerPage;

        return paginationIsEnabled &&
            resultsPerPageNotZero &&
            cardLengthExceedsDisplayLimit;
    }, [filteredCards.length, resultsPerPage]);


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
                                    windowWidth={windowWidth}
                                    onFilterClick={handleFilterItemClick}
                                    onClearAllFilters={resetFiltersSearchAndBookmarks}
                                    onClearFilterItems={clearFilterItems}
                                    onCheckboxClick={handleCheckBoxChange}
                                    onMobileFiltersToggleClick={handleFiltersToggle}
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
                                            name="filtersSideSearch"
                                            value={searchQuery}
                                            autofocus={false}
                                            onSearch={handleSearchInputChange} />
                                    )}
                                    panelHeader={getConfig('filterPanel', 'leftPanelHeader')} />
                            </span>
                        )}
                        <span>
                            {filterPanelEnabled &&
                              filterPanelType === FILTER_PANEL.TOP &&
                              <FiltersPanelTop
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
                                          values={parseToPrimitive(getConfig('sort', 'options'))}
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
                                filters={filters}
                                cardsQty={filteredCards.length}
                                selectedFiltersQty={selectedFiltersItemsQty}
                                windowWidth={windowWidth}
                                onMobileFiltersToggleClick={handleFiltersToggle}
                                searchComponent={(
                                    <Search
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
                                sortOptions={sortOptions}
                                onSelectedFilterClick={handleCheckBoxChange} />
                            }
                            {collectionCards.length > 0 ?
                                <Fragment>
                                    <Collection
                                        showItemsPerPage={resultsPerPage}
                                        pages={pages}
                                        cards={collectionCards}
                                        onCardBookmark={handleCardBookmarking} />
                                    {/* TODO: Migrate to useRef */}
                                    {shouldDisplayPaginator && paginationType === 'loadMore' && (
                                        <div ref={page}>
                                            <LoadMore
                                                onClick={onLoadMoreClick}
                                                show={numCardsToShow}
                                                total={filteredCards.length} />
                                        </div>
                                    )}
                                    {shouldDisplayPaginator && paginationType === 'paginator' &&
                                        <Paginator
                                            pageCount={windowWidth <= DESKTOP_MIN_WIDTH ?
                                                PAGINATION_COUNT.MOBILE : PAGINATION_COUNT.DESKTOP
                                            }
                                            currentPageNumber={pages}
                                            totalPages={totalPages}
                                            showItemsPerPage={resultsPerPage}
                                            totalResults={filteredCards.length}
                                            onClick={setPages} />
                                    }
                                </Fragment> :
                                <Loader
                                    size={LOADER_SIZE.BIG}
                                    hidden={!getConfig('collection', 'totalCardLimit')}
                                    absolute />
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
