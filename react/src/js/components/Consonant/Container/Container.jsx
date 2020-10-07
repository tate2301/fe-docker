import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import 'whatwg-fetch';
import {
    CLASS_NAME,
    DEFAULT_CONFIG,
    DESKTOP_MIN_WIDTH,
    FILTER_LOGIC,
    FILTER_PANEL,
    LOADER_SIZE,
    PAGINATION_COUNT,
    SORTING_OPTION,
    TABLET_MIN_WIDTH,
    TRUNCATE_TEXT_QTY,
} from '../../../constants';
import { filterCardsByDateRange } from '../../../utils/cards';
import { getDefaultSortOption, getNumSelectedFilterItems } from '../../../utils/consonant';
import {
    chainFromIterable,
    intersection,
    isSuperset,
    readBookmarksFromLocalStorage,
    removeDuplicatesByKey,
    saveBookmarksToLocalStorage,
    truncateList,
    truncateString,
} from '../../../utils/general';
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
import SearchIco from '../Search/SearchIco';
import Select from '../Select/Select';


const Container = (props) => {
    const { config } = props;

    const getConfig = useCallback((object, key) => {
        const value = _.get(config, `${object}.${key}`, DEFAULT_CONFIG[ object ][ key ]);
        return parseToPrimitive(value);
    }, []);

    const defaultSortOption = getDefaultSortOption(config, getConfig('sort', 'defaultSort'));

    const [rawCards, setCards] = useState([]);

    const [bookmarkedCardIds, setBookmarkedCardIds] = useState([]);
    const [pages, setPages] = useState(1);
    const [filters, _setFilters] = useState([]);
    const filtersStateRef = useRef(filters);
    const setFilters = (data) => {
        // TODO: use proper isFunction method
        if (typeof data === 'function') {
            filtersStateRef.current = data(filters);
        } else {
            filtersStateRef.current = data;
        }
        _setFilters(data);
    };
    const page = useRef();
    const [searchQuery, setSearchQuery] = useState('');
    const [showTopFilterSearch, setShowTopFilterSearch] = useState(false);
    const [sortOpened, setSortOpened] = useState(false);
    const [sort, setSort] = useState(defaultSortOption);
    const showItemsPerPage = getConfig('collection', 'resultsPerPage');
    const { width: windowWidth } = useWindowDimensions();
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [showBookmarks, setShowBookmarks] = useState(false);
    const [showLimitedFiltersQty, setShowLimitedFiltersQty] = useState(getConfig('filterPanel', 'type') === 'top');

    const selectedFiltersItemsQty = getNumSelectedFilterItems(filters);

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
        disableBookmarkIco: getConfig('bookmarks', 'bookmarkOnlyCollection'),
    }), []);

    const onLoadMoreClick = useCallback(() => {
        setPages(prevState => prevState + 1);
        window.scrollTo(0, window.pageYOffset);
    }, []);

    const clearFilterItems = useCallback((id) => {
        setFilters(prevFilters =>
            prevFilters.map((el) => {
                if (el.id === id) {
                    el.items.map((item) => {
                        item.selected = false;
                        return item;
                    });
                }
                return el;
            }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilters(prevFilters => prevFilters.map((el) => {
            el.items.map((filter) => {
                filter.selected = false;
                return filter;
            });
            return el;
        }));
    }, []);

    const resetFiltersSearchAndBookmarks = useCallback(() => {
        clearFilters();
        setSearchQuery('');
        setShowBookmarks(false);
    }, []);

    const handleSortChange = useCallback((option) => {
        setSort(option);
        setSortOpened(false);
    }, [sort]);

    const handleSearchInputChange = useCallback((val) => {
        clearFilters();
        setSearchQuery(val);
    }, []);

    const handleFilterItemClick = (filterId) => {
        const isUsingTopFilter = getConfig('filterPanel', 'type') === 'top';
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
        const filterLogic = getConfig('filterPanel', 'filterLogic');
        setShowBookmarks(false);

        // If xor filterLogic set, we reset all filters;
        if (filterLogic.toLowerCase().trim() === FILTER_LOGIC.XOR && isChecked) clearFilters();

        setFilters(prevFilters => prevFilters.map((filter) => {
            if (filter.id === filterId) {
                return {
                    ...filter,
                    items: filter.items.map(item => ({
                        ...item,
                        selected: item.id === itemId ? !item.selected : item.selected,
                    })),
                };
            }

            return filter;
        }));
    }, [showBookmarks]);

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

    const handleShowFavoritesClick = useCallback((clickEvt) => {
        clickEvt.stopPropagation();
        setShowBookmarks(prev => !prev);
    }, [showBookmarks]);

    const handleSearchIconClick = useCallback((evt) => {
        evt.preventDefault();
        setShowTopFilterSearch(evt.type === 'click');
    }, []);

    const handleShowAllTopFilters = useCallback(() => {
        setShowLimitedFiltersQty(prev => !prev);
    }, []);

    const renderSearch = useCallback((key, autofocus = false) => (
        <Search
            childrenKey={key}
            placeholderText={getConfig('search', 'inputPlaceholderText')}
            value={searchQuery}
            autofocus={autofocus}
            leftPanelTitle={getConfig('search', 'leftPanelTitle')}
            onSearch={handleSearchInputChange} />
    ), [searchQuery]);

    const renderSelect = useCallback((autoWidth, key, optionsAlignment = 'right') => (
        <Select
            // onOpen={() => setSelectOpened(p => !p)}
            opened={sortOpened}
            val={sort}
            values={parseToPrimitive(getConfig('sort', 'options'))}
            onSelect={handleSortChange}
            childrenKey={key}
            autoWidth={autoWidth}
            optionsAlignment={optionsAlignment} />
    ), [sortOpened, sort]);

    // Effects

    useEffect(() => {
        window.fetch(getConfig('collection', 'endpoint'))
            .then(resp => resp.json())
            .then((payload) => {
                if (!_.get(payload, 'cards.length')) return;

                const limit = getConfig('collection', 'totalCardLimit');
                const filtersConfig = parseToPrimitive(getConfig('filterPanel', 'filters'));
                const onlyShowBookmarks = getConfig('bookmarks', 'bookmarkOnlyCollection');

                let featuredCards = parseToPrimitive(config.featuredCards) || [];
                featuredCards = featuredCards.map(el => ({
                    ...el,
                    isFeatured: true,
                }));

                let allCards = removeDuplicatesByKey(featuredCards.concat(parseToPrimitive(payload.cards)), 'id');

                // If this.config.bookmarks.bookmarkOnlyCollection;
                if (onlyShowBookmarks) {
                    allCards = allCards.filter(card =>
                        bookmarkedCardIds.some(cardId => cardId === card.id));
                }

                allCards = filterCardsByDateRange(allCards);
                allCards = truncateList(limit, allCards).map(populateCardMetadata);
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
    }, []);

    useEffect(() => {
        setBookmarkedCardIds(readBookmarksFromLocalStorage());
    }, []);

    // Set focusOut handlers
    useEffect(() => {
        const handleFocusOut = (clickEvt) => {
            clickEvt.stopPropagation();

            const t = clickEvt.target;

            // setSortOpened(false);
            const isUsingTopFilter = getConfig('filterPanel', 'type') === 'top';


            const hasClassName = (className) => {
                if (t.className === className) return true;
                for (let it = t; it && it !== document; it = it.parentNode) {
                    if (it.className.indexOf(className) >= 0) return true;
                }
                return false;
            };

            // TODO: Clarify intent
            if (hasClassName(CLASS_NAME.SEARCH)) {
                setShowTopFilterSearch(true);
            } else {
                setShowTopFilterSearch(false);
            }

            let targetSelectOpened = false;

            if (!isUsingTopFilter && !hasClassName(CLASS_NAME.SELECT)) return;

            if (
                (hasClassName(CLASS_NAME.TOP_FILTER) ||
                    hasClassName(CLASS_NAME.TOP_FILTER_OPENED) ||
                    hasClassName(CLASS_NAME.TOP_FILTER_SELECTED)) &&
                !hasClassName(CLASS_NAME.SEARCH)
            ) {
                setFilters(filtersStateRef.current);
            } else if (hasClassName(CLASS_NAME.SELECT)) {
                targetSelectOpened = true;
            } else {
                setFilters(filtersStateRef.current.map(f => ({
                    ...f,
                    opened: false,
                })));
            }

            setSortOpened(targetSelectOpened);
        };


        window.addEventListener('click', handleFocusOut);
        return () => window.removeEventListener('click', handleFocusOut);
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
    }, [showBookmarks]);

    // Derived state

    const activeFilterIds = useMemo(() => chainFromIterable(filters.map(f => f.items))
        .filter(item => item.selected)
        .map(item => item.id), [filters]);

    const filteredCards = useMemo(() => {
        const filterLogic = getConfig('filterPanel', 'filterLogic')
            .toLowerCase()
            .trim();

        return cards.filter((card) => {
            if (!card.appliesTo) {
                return false;
            }

            const usingXorAndFilter = filterLogic === FILTER_LOGIC.XOR
                || filterLogic === FILTER_LOGIC.AND;
            const usingOrFilter = filterLogic === FILTER_LOGIC.OR;

            const tagIds = new Set(card.appliesTo.map(tag => tag.id));
            const activeFilterIdsSet = new Set(activeFilterIds);

            if (usingXorAndFilter) {
                return isSuperset(tagIds, activeFilterIdsSet);
            } else if (usingOrFilter) {
                return intersection(tagIds, activeFilterIdsSet).size;
            }
            throw new Error(`Unrecognized filter logic: ${filterLogic}`);
        });
    }, [cards, activeFilterIds]);

    const searchedCards = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) {
            return filteredCards;
        }
        const results = [];
        const searchFields = parseToPrimitive(getConfig('search', 'searchFields'));
        const fieldsToHighlight = ['title', 'description'];
        const highlightText = (text, val) => text.replace(new RegExp(val, 'gi'), value => `
            <span
                data-testid="consonant-search-result"
                class="consonant-search-result">
                ${value}
            </span>
        `);

        filteredCards.forEach((el) => {
            let pushToRes = false;
            const copy = { ...el };

            searchFields.forEach((field) => {
                if (copy[field] && copy[field].toLowerCase().trim().indexOf(query) >= 0) {
                    pushToRes = true;

                    if (fieldsToHighlight.some(f => f === field)) {
                        copy[field] = highlightText(copy[field], query);
                    }
                }
            });

            if (pushToRes) results.push(copy);
        });
        return results;
    }, [searchQuery, filteredCards]);

    const sortedCards = useMemo(() => {
        if (!sort || !sort.sort) {
            return searchedCards;
        }
        const field = sort.sort;
        const val = SORTING_OPTION[field.toUpperCase().trim()];
        let sorted;

        if (!val) return searchedCards;
        if (searchedCards.every(c => c[val] === searchedCards[0][val])) return searchedCards;

        // Sorting for featured and date;
        if (['dateasc', 'datedesc'].some(el => el === field.toLowerCase())) {
            sorted = [...searchedCards].sort((a, b) => {
                if (a[val] < b[val]) return -1;
                if (a[val] > b[val]) return 1;
                return 0;
            });
        } else {
            sorted = [...searchedCards].sort((a, b) => a[val].localeCompare(b[val], 'en', { numeric: true }));
        }

        if (field.toLowerCase().indexOf('desc') >= 0) sorted.reverse();
        // In case of featured, move featured items to the top;
        if (field === 'featured') {
            sorted.sort(a => (a.isFeatured ? -1 : 0))
                .sort((a, b) => (
                    (a.isFeatured && b.isFeatured) &&
          (a.initialTitle < b.initialTitle) ? -1 : 0));
        }

        return sorted;
    }, [searchedCards, sort.sort]);

    const bookmarkedCards = useMemo(
        () => sortedCards.filter(card => card.isBookmarked),
        [sortedCards],
    );

    const collectionCards = useMemo(() => {
        // INFO: bookmarked cards will be ordered because bookmarked cards is
        //  derived from sorted Cards
        const shownCards = showBookmarks ? bookmarkedCards : sortedCards;

        const isUsingPaginator = getConfig('pagination', 'type') === 'paginator';
        if (showItemsPerPage && isUsingPaginator) {
            const start = (pages - 1) * showItemsPerPage;
            return shownCards.slice(start, start + showItemsPerPage);
        }

        return shownCards;
    }, [sortedCards, filteredCards, pages, showItemsPerPage, showBookmarks]);

    const totalPages = useMemo(
        () => Math.ceil(filteredCards.length / showItemsPerPage),
        [filteredCards, showItemsPerPage],
    );

    const numCardsToShow = useMemo(
        () => Math.min(showItemsPerPage * pages, filteredCards.length),
        [showItemsPerPage, filteredCards, pages],
    );

    // Other callbacks

    const shouldDisplayPaginator = useCallback((type) => {
        const paginationIsEnabled = getConfig('pagination', 'enabled');
        const paginationIsCorrectType = getConfig('pagination', 'type') === type;
        const resultsPerPageNotZero = getConfig('collection', 'resultsPerPage') > 0;
        const cardLengthExceedsDisplayLimit = filteredCards.length > showItemsPerPage;

        return paginationIsEnabled &&
            paginationIsCorrectType &&
            resultsPerPageNotZero &&
            cardLengthExceedsDisplayLimit;
    }, [filteredCards, showItemsPerPage]);


    return (
        <Fragment>
            <section
                className="consonant-wrapper">
                <div className="consonant-wrapper--inner">
                    {
                        getConfig('filterPanel', 'enabled') &&
              getConfig('filterPanel', 'type') === FILTER_PANEL.LEFT &&
              <span>
                  <LeftFilterPanel
                      filters={filters}
                      windowWidth={windowWidth}
                      showTotalResults={getConfig('collection', 'displayTotalResults')}
                      showTotalResultsText={getConfig('collection', 'totalResultsText')}
                      onFilterClick={handleFilterItemClick}
                      clearFilterText={getConfig('filterPanel', 'clearFilterText')}
                      clearAllFiltersText={getConfig('filterPanel', 'clearAllFiltersText')}
                      onClearAllFilters={resetFiltersSearchAndBookmarks}
                      onClearFilterItems={clearFilterItems}
                      onCheckboxClick={handleCheckBoxChange}
                      onMobileFiltersToggleClick={handleFiltersToggle}
                      showMobileFilters={showMobileFilters}
                      resQty={filteredCards.length}
                      panelHeader={getConfig('filterPanel', 'leftPanelHeader')}>
                      {
                          windowWidth >= DESKTOP_MIN_WIDTH &&
                                        getConfig('search', 'enabled') &&
                                        renderSearch('filtersSideSearch')
                      }
                      {getConfig('bookmarks', 'enabled') &&
                      <Bookmarks
                          childrenKey="filtersSideBookmarks"
                          title={getConfig('bookmarks', 'bookmarksFilterTitle')}
                          selectedIco={getConfig('bookmarks', 'selectBookmarksIcon')}
                          unselectedIco={getConfig('bookmarks', 'unselectBookmarksIcon')}
                          selected={showBookmarks}
                          onClick={handleShowFavoritesClick}
                          qty={bookmarkedCardIds.length} />
                      }
                  </LeftFilterPanel>
              </span>
                    }
                    <span>
                        {getConfig('filterPanel', 'enabled') &&
                              getConfig('filterPanel', 'type') === FILTER_PANEL.TOP &&
                              <FiltersPanelTop
                                  filters={filters}
                                  resQty={filteredCards.length}
                                  onCheckboxClick={handleCheckBoxChange}
                                  onFilterClick={handleFilterItemClick}
                                  onClearFilterItems={clearFilterItems}
                                  onClearAllFilters={resetFiltersSearchAndBookmarks}
                                  clearFilterText={getConfig('filterPanel', 'clearFilterText')}
                                  clearAllFiltersText={getConfig('filterPanel', 'clearAllFiltersText')}
                                  showTotalResults={getConfig('collection', 'displayTotalResults')}
                                  showTotalResultsText={getConfig('collection', 'totalResultsText')}
                                  showSearchbar={showTopFilterSearch}
                                  showLimitedFiltersQty={showLimitedFiltersQty}
                                  onShowAllClick={handleShowAllTopFilters}>
                                  {getConfig('search', 'enabled') &&
                                renderSearch('filtersTopSearch', window.innerWidth >= DESKTOP_MIN_WIDTH)
                                  }
                                  {
                                      getConfig('search', 'enabled') &&
                                  windowWidth >= TABLET_MIN_WIDTH &&
                                  <SearchIco
                                      childrenKey="filtersTopSearchIco"
                                      onClick={handleSearchIconClick} />

                                  }
                                  {
                                      getConfig('sort', 'enabled') &&
                                  parseToPrimitive(getConfig('sort', 'options')).length > 0 &&
                                  renderSelect(
                                      true,
                                      'filtersTopSelect',
                                      filters.length > 0
                                    && window.innerWidth < TABLET_MIN_WIDTH ?
                                          'left' : 'right',
                                  )
                                  }
                              </FiltersPanelTop>
                        }
                        {getConfig('filterPanel', 'type') === FILTER_PANEL.LEFT &&
                        <FilterInfo
                            enabled={getConfig('filterPanel', 'enabled')}
                            title={getConfig('collection', 'title')}
                            filters={filters}
                            cardsQty={filteredCards.length}
                            showTotalResults={getConfig('collection', 'displayTotalResults')}
                            showTotalResultsText={getConfig('collection', 'totalResultsText')}
                            selectedFiltersQty={selectedFiltersItemsQty}
                            windowWidth={windowWidth}
                            onMobileFiltersToggleClick={handleFiltersToggle}
                            onSelectedFilterClick={handleCheckBoxChange}>
                            {
                                getConfig('search', 'enabled') &&
                  windowWidth < DESKTOP_MIN_WIDTH &&
                  renderSearch('searchFiltersInfo')
                            }
                            {
                                getConfig('sort', 'enabled') &&
                  parseToPrimitive(getConfig('sort', 'options')).length > 0 &&
                  renderSelect(false, 'selectFiltersInfo')
                            }
                        </FilterInfo>
                        }
                        {collectionCards.length > 0 ?
                            <Fragment>
                                <Collection
                                    showItemsPerPage={showItemsPerPage}
                                    pages={pages}
                                    cards={collectionCards}
                                    allowBookmarking={getConfig('bookmarks', 'enabled')}
                                    onCardBookmark={handleCardBookmarking}
                                    cardUnsavedIco={getConfig('bookmarks', 'cardUnsavedIcon')}
                                    cardSavedIco={getConfig('bookmarks', 'cardSavedIcon')}
                                    saveCardText={getConfig('bookmarks', 'saveCardText')}
                                    unsaveCardText={getConfig('bookmarks', 'unsaveCardText')}
                                    cardsStyle={getConfig('collection', 'cardStyle')} />
                                {
                                    shouldDisplayPaginator('loadMore') &&
                                    //  Migrate to useRef
                                    <div ref={page}>
                                        <LoadMore
                                            onClick={onLoadMoreClick}
                                            show={numCardsToShow}
                                            total={filteredCards.length}
                                            loadMoreButtonText={getConfig('pagination', 'loadMoreButtonText')}
                                            loadMoreQuantityText={getConfig('pagination', 'loadMoreQuantityText')} />
                                    </div>
                                }
                                {
                                    shouldDisplayPaginator('paginator') &&
                                    <Paginator
                                        pageCount={windowWidth <= DESKTOP_MIN_WIDTH ?
                                            PAGINATION_COUNT.MOBILE : PAGINATION_COUNT.DESKTOP
                                        }
                                        currentPageNumber={pages}
                                        totalPages={totalPages}
                                        showItemsPerPage={showItemsPerPage}
                                        totalResults={filteredCards.length}
                                        onClick={setPages}
                                        quantityText={getConfig('pagination', 'paginatorQuantityText')}
                                        prevLabel={getConfig('pagination', 'paginatorPrevLabel')}
                                        nextLabel={getConfig('pagination', 'paginatorNextLabel')} />
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
        </Fragment >
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
