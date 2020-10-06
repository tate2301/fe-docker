import PropTypes from 'prop-types';
import React, {
    Fragment,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import 'whatwg-fetch';
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

const DESKTOP_MIN_WIDTH = 1200;
const TABLET_MIN_WIDTH = 768;
const PAGINATION_COUNT = {
    DESKTOP: 10,
    MOBILE: 4,
};
const LOADER_SIZE = {
    MEDIUM: 'medium',
    BIG: 'big',
};
const FILTER_LOGIC = {
    AND: 'and',
    OR: 'or',
    XOR: 'xor',
};
const FILTER_PANEL = {
    LEFT: 'left',
    TOP: 'top',
};
const SORTING_OPTION = {
    FEATURED: 'initialTitle',
    DATEASC: 'cardDate',
    DATEDESC: 'cardDate',
    TITLEASC: 'initialTitle',
    TITLEDESC: 'initialTitle',
};
const TRUNCATE_TEXT_QTY = 200;


const awaitTime = 100;

function getDefaultSortOption(config, query) {
    const { sort } = config;
    let res = {
        label: 'Featured',
        sort: 'featured',
    };


    if (sort && parseToPrimitive(sort.options)) {
        const filtered = parseToPrimitive(sort.options).filter(el => el.sort === query);
        if (filtered && filtered.length) [res] = filtered;
    }

    return res;
}

function getSelectedFiltersItemsQty(filters) {
    const res = filters.reduce((acc, val) => {
        const count = val.items.reduce((accum, value) => {
            if (value.selected) return accum + 1;
            return accum;
        }, 0);

        return acc + count;
    }, 0);

    return res;
}


const Container = (props) => {
    const { config } = props;
    const getConfig = useCallback((object, key) => {
        const defaultProps = {
            collection: {
                resultsPerPage: 9,
                endpoint: 'http://caas-publi-aa3c8qnjxs09-336471204.us-west-1.elb.amazonaws.com/api/v4/webinars',
                title: '',
                totalCardLimit: -1,
                cardStyle: 'none',
                displayTotalResults: true,
                totalResultsText: '{} results',
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
        };
        const val = config[object] ? config[object][key] : null;
        let res;

        if (!val && typeof val !== 'boolean' && typeof val !== 'number') res = defaultProps[object][key];
        else res = config[object][key];

        return parseToPrimitive(res);
    }, []);

    const defaultSortOption = getDefaultSortOption(config, getConfig('sort', 'defaultSort'));


    const [rawCards, setCards] = useState([]);


    const [filteredCards, setFilteredCards] = useState([]);
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
    const [lastFilterWasChecked, setLastFilterWasChecked] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showTopFilterSearch, setShowTopFilterSearch] = useState(false);
    const [selectOpened, setSelectOpened] = useState(false);
    const [selelectedFilterBy, setSelelectedFilterBy] = useState(defaultSortOption);
    const showItemsPerPage = getConfig('collection', 'resultsPerPage');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [showFavourites, setShowFavourites] = useState(false);
    const [showLimitedFiltersQty, setSHowLimitedFiltersQty] = useState(getConfig('filterPanel', 'type') === 'top');

    const selectedFiltersItemsQty = getSelectedFiltersItemsQty(filters);

    const cards = useMemo(() => rawCards.map(card => ({
        ...card,
        isBookmarked: bookmarkedCardIds.some(i => i === card.id),
    })), [rawCards, bookmarkedCardIds]);

    // callbacks


    const getCardsToShowQty = useCallback(() => {
        let res = showItemsPerPage * pages;

        if (res > filteredCards.length) res = filteredCards.length;

        return res;
    }, [showItemsPerPage, filteredCards, pages]);

    const getActiveFiltersIds = useCallback(() => filters.reduce((acc, val) => {
        val.items.forEach((el) => {
            if (el.selected) acc.push(el.id);
        });
        return acc;
    }, []), [filters]);

    const getTotalPages = useCallback(
        () => Math.ceil(filteredCards.length / showItemsPerPage),
        [filteredCards, showItemsPerPage],
    );

    const getCollectionCards = useCallback(() => {
        let res = filteredCards;

        if (showItemsPerPage && getConfig('pagination', 'type') === 'paginator') {
            const start = pages === 1 ? 0 : (pages * showItemsPerPage) - showItemsPerPage;
            const end = start + showItemsPerPage;

            res = res.slice(start, end);
        }

        return res;
    }, [filteredCards, pages, showItemsPerPage]);

    const setCardsToShowQty = () => {
        const currentPos = window.pageYOffset;
        setPages(prevState => prevState + 1);
        window.scrollTo(0, currentPos);
    };

    const setBookMarksToLS = useCallback(() => {
        try {
            localStorage.setItem('bookmarks', JSON.stringify(bookmarkedCardIds, null, 2));
        } catch (e) {
            // alert('We could not save your bookmarks, please try to reload thші page.');
        }
    }, [bookmarkedCardIds]);

    const sortCards = useCallback((field) => {
        const val = SORTING_OPTION[field.toUpperCase().trim()];
        let sorted;

        if (!val) return;
        if (filteredCards.every(c => c[val] === filteredCards[0][val])) return;

        // Sorting for featured and date;
        if (['dateasc', 'datedesc'].some(el => el === field.toLowerCase())) {
            sorted = [...filteredCards].sort((a, b) => {
                if (a[val] < b[val]) return -1;
                if (a[val] > b[val]) return 1;
                return 0;
            });
        } else {
            sorted = [...filteredCards].sort((a, b) => a[val].localeCompare(b[val], 'en', { numeric: true }));
        }

        if (field.toLowerCase().indexOf('desc') >= 0) sorted.reverse();
        // In case of featured, move featured items to the top;
        if (field === 'featured') {
            sorted.sort(a => (a.isFeatured ? -1 : 0))
                .sort((a, b) => (
                    (a.isFeatured && b.isFeatured) &&
            (a.initialTitle < b.initialTitle) ? -1 : 0));
        }

        setFilteredCards(sorted);
    }, [filteredCards]);

    const searchCards = useCallback(() => {
        const query = searchQuery.trim().toLowerCase();
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

        // In case we reset search, just show all results;
        if (!query) {
            setFilteredCards(cards.slice());
        } else {
            cards.forEach((el) => {
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

            setFilteredCards(results);
            setShowFavourites(false, () => {
                if (selelectedFilterBy && selelectedFilterBy.sort) {
                    sortCards(selelectedFilterBy.sort);
                }
            });
        }
    }, [searchQuery, cards]);

    const filterCards = useCallback(() => {
        console.log('Running', cards);
        const myFilterIds = getActiveFiltersIds();
        const query = searchQuery;
        let filterLogic = getConfig('filterPanel', 'filterLogic');
        filterLogic = filterLogic.toLowerCase().trim();

        const checkCardsApplyToFilters = (_cards, selectedFilters) => _cards.reduce((acc, card) => {
            let filterPassed = false;

            if (
                card.appliesTo &&
                  (filterLogic === FILTER_LOGIC.XOR || filterLogic === FILTER_LOGIC.AND) &&
                  selectedFilters.every(el => card.appliesTo.some(tag => tag.id === el))
            ) {
                filterPassed = true;
            } else if (
                card.appliesTo &&
                  (filterLogic === FILTER_LOGIC.OR) &&
                  selectedFilters.some(el => card.appliesTo.some(tag => tag.id === el))
            ) {
                filterPassed = true;
            }

            if (filterPassed) acc.push(card);
            return acc;
        }, []);
        const applySorting = () => {
            if (selelectedFilterBy && selelectedFilterBy.sort) {
                sortCards(selelectedFilterBy.sort);
            }
        };

        /* In case of filters were reset or q-ty decreased, or filterLogic is XOR or OR
    we need to update search; */
        if (
            (query && !myFilterIds.length) ||
          (query && !lastFilterWasChecked) ||
          (filterLogic === FILTER_LOGIC.XOR) ||
          (filterLogic === FILTER_LOGIC.OR)
        ) { searchCards(); }

        /* If no filters selected and no search, or filterLogic is XOR or OR and no search,
    we show all cards; */
        if (
            (!myFilterIds.length && !query) ||
          (filterLogic === FILTER_LOGIC.OR && !query) ||
          (filterLogic === FILTER_LOGIC.XOR && !query)
        ) {
            setFilteredCards(cards.slice());
            applySorting();
        }

        // If a new filter was added, we filter within previous results;
        if (
            (myFilterIds.length && lastFilterWasChecked) ||
          (myFilterIds.length && query)
        ) {
            setFilteredCards(checkCardsApplyToFilters(filteredCards.slice(), myFilterIds));
            applySorting();
        }

        // If a filter was removed, we search from the beginning;
        if (myFilterIds.length && !lastFilterWasChecked && !query) {
            setFilteredCards(checkCardsApplyToFilters(cards.slice(), myFilterIds));

            applySorting();
        }
    }, [searchQuery, lastFilterWasChecked, selelectedFilterBy, cards]);


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
        console.log('filter cards in clear filter items');
        filterCards();

        setLastFilterWasChecked(false);
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

    const clearAllFilters = useCallback((isFavs) => {
        const myShowFavourites = typeof isFavs !== 'boolean' ? false : isFavs;
        clearFilters();
        setSearchQuery('');
        setLastFilterWasChecked(false);
        setShowFavourites(myShowFavourites);

        if (!myShowFavourites) {
            searchCards();
            console.log('filter cards in clear all filters');
            filterCards();
        }
    }, []);

    const doShowFavourites = useCallback(() => {
        setFilteredCards(cards.filter(card => card.isBookmarked), () => {
            sortCards(selelectedFilterBy.sort);
        });
    }, [selelectedFilterBy, cards]);

    const resetFavourites = useCallback(() => {
        setFilteredCards(cards);
        setShowFavourites(false, selelectedFilterBy.sort);
    }, [cards, selelectedFilterBy]);

    const checkIfDisplayPaginator = useCallback((type) => {
        const cardsLength = filteredCards.length;
        const showItems = showItemsPerPage;

        return getConfig('pagination', 'enabled') &&
          getConfig('pagination', 'type') === type &&
          getConfig('collection', 'resultsPerPage') > 0 &&
          cardsLength > showItems;
    }, [filteredCards, showItemsPerPage]);

    const handleSelectChange = useCallback((option) => {
        if (option.label === selelectedFilterBy.label) {
            setSelectOpened(false);
            return;
        }

        setSelelectedFilterBy(option);
        setSelectOpened(false);
        sortCards(selelectedFilterBy.sort);
    }, []);

    const handleSearchInputChange = useCallback((val) => {
        clearFilters();
        setSearchQuery(val);
        // TODO: potential bug because originally searchCards is called as a
        //  callback to set search query
        searchCards();
    }, []);

    const handleFilterItemClick = (filterId) => {
        setFilters((prevFilters) => {
            let opened;
            return prevFilters.map((el) => {
                if (el.id === filterId) {
                    opened = !el.opened;
                } else if (getConfig('filterPanel', 'type') === 'top') {
                    opened = false;
                } else {
                // eslint-disable-next-line prefer-destructuring
                    opened = el.opened;
                }
                return {
                    ...el,
                    opened,
                };
            });
        });
    };

    const handleCheckBoxChange = useCallback((filterId, itemId, isChecked) => {
        const filterLogic = getConfig('filterPanel', 'filterLogic');
        if (showFavourites) resetFavourites();

        // If xor filterLogic set, we reset all filters;
        if (filterLogic.toLowerCase().trim() === FILTER_LOGIC.XOR && isChecked) clearFilters();

        setFilters(prevFilters => prevFilters.map((filter) => {
            if (filter.id === filterId) {
                filter.items = filter.items.map((item) => {
                    if (item.id === itemId) item.selected = !item.selected;

                    return item;
                });
            }

            return filter;
        }));

        setLastFilterWasChecked(isChecked);
        // TODO: potential bug because this is originaly called as a callback
        //  to the setState call above
        console.log('filter card in handleCHeckBoxCHange');
        filterCards();
    }, [showFavourites]);

    const handleFiltersToggle = () => setShowMobileFilters(prev => !prev);

    const handleSelectOpen = () => setSelectOpened(prev => !prev);

    const handlePaginatorClick = setPages;

    const updateCardsWithBookmarks = useCallback(() => {
        // const updatedBookmarks = [];

        // const doCheck = arr => arr.map((el) => {
        //     if (bookmarkedCardIds.some(item => el.id === item)) {
        //         el.isBookmarked = true;
        //         if (!updatedBookmarks.some(item => item === el.id)) updatedBookmarks.push(el.id);
        //     } else {
        //         el.isBookmarked = false;
        //     }
        //     return el;
        // });
        // TODO: make derived state for filtered cards too
        // setFilteredCards(doCheck(filteredCards));

        // TODO: possible bug: originally specificed as setstate callback
        setBookMarksToLS();
        if (showFavourites) doShowFavourites();
    }, [cards, filteredCards, bookmarkedCardIds]);

    const handleCardBookmarking = useCallback((id) => {
        // Update bookmarked IDs;
        const searchIdx = bookmarkedCardIds.indexOf(id);

        if (searchIdx >= 0) {
            setBookmarkedCardIds(bookmarkedCardIds.filter(el => el !== id));
        } else {
            setBookmarkedCardIds([...bookmarkedCardIds, id]);
        }
        console.log('from handle card bookmarking');
        updateCardsWithBookmarks();
    }, [bookmarkedCardIds]);

    const handleShowFavsClick = useCallback((clickEvt) => {
        clickEvt.stopPropagation();
        setShowFavourites(prev => !prev);
        // TODO: Refactor into useEffect hook
        if (!showFavourites) { // inverse is value after set state call
            clearAllFilters(true);
            doShowFavourites();
        } else {
            resetFavourites();
        }
    }, [showFavourites]);

    const handleSearchIcoClick = useCallback((evt) => {
        evt.preventDefault();
        setShowTopFilterSearch(evt.type === 'click');
    }, []);

    const handleShowAllTopFilters = useCallback(() => {
        setSHowLimitedFiltersQty(prev => !prev);
    }, []);

    const renderSearch = useCallback(key => (
        <Search
            childrenKey={key}
            placeholderText={getConfig('search', 'inputPlaceholderText')}
            value={searchQuery}
            leftPanelTitle={getConfig('search', 'leftPanelTitle')}
            onSearch={handleSearchInputChange} />
    ), [searchQuery]);

    const renderSelect = useCallback((autoWidth, key, optionsAlignment = 'right') => (
        <Select
            opened={selectOpened}
            val={selelectedFilterBy}
            values={parseToPrimitive(getConfig('sort', 'options'))}
            onOpen={handleSelectOpen}
            onSelect={handleSelectChange}
            childrenKey={key}
            autoWidth={autoWidth}
            optionsAlignment={optionsAlignment} />
    ), [selectOpened, selelectedFilterBy]);

    const getBookMarksFromLS = useCallback(() => {
        const data = JSON.parse(localStorage.getItem('bookmarks'));

        if (Array.isArray(data)) {
            setBookmarkedCardIds(data);
        }
    }, []);


    // Effects

    useEffect(() => {
        window.fetch(getConfig('collection', 'endpoint'))
            .then(resp => resp.json())
            .then((res) => {
                const truncateString = (str, num) => {
                    if (str.length <= num) return str;
                    return `${str.slice(0, num)}...`;
                };
                const applyCardLimitToLoadedCards = (data) => {
                    const limit = getConfig('collection', 'totalCardLimit');
                    // No limit, return all;
                    if (limit < 0) return data;

                    // Slice received data to required q-ty;
                    return data.slice(0, limit);
                };
                const removeSameCardIds = (featured, _cards) => [
                    ...featured,
                    ..._cards.filter(card => !featured.some(el => card.id === el.id)),
                ];
                const processCard = (card) => {
                    card.initialTitle = card.title;
                    card.description = truncateString(card.description, TRUNCATE_TEXT_QTY);
                    card.initialText = card.description;
                    card.isBookmarked = false;
                    card.disableBookmarkIco = getConfig('bookmarks', 'bookmarkOnlyCollection');
                    return card;
                };
                const filterCardsPerDateRange = (_cards) => {
                    if (!Array.isArray(_cards)) return [];

                    const currentDate = new Date().getTime();

                    return _cards.filter((card) => {
                        if (!card.showCardFrom) return card;

                        const dates = card.showCardFrom.split(' - ').map(date => new Date(date).getTime());

                        return dates.every(date => Number.isInteger(date)) &&
              (currentDate >= dates[0] && currentDate <= dates[1]) ? card : null;
                    });
                };

                let featuredCards = parseToPrimitive(config.featuredCards) || [];
                const filtersConfig = parseToPrimitive(getConfig('filterPanel', 'filters'));

                if (!res || (res.cards && res.cards.length <= 0)) return;

                let allCards = removeSameCardIds([], parseToPrimitive(res.cards));

                featuredCards = featuredCards.map((el) => {
                    el.isFeatured = true;
                    return el;
                });
                allCards = removeSameCardIds(featuredCards, allCards);

                // If this.config.bookmarks.bookmarkOnlyCollection;
                if (getConfig('bookmarks', 'bookmarkOnlyCollection')) {
                    allCards = allCards.filter(c =>
                        bookmarkedCardIds.some(el => el === c.id));
                    getBookMarksFromLS(false);
                }

                allCards = filterCardsPerDateRange(allCards);
                allCards = applyCardLimitToLoadedCards(allCards).map(card => processCard(card));
                console.log('Setting cards to', allCards);
                setCards(allCards);
                setFilters(filtersConfig.map((el) => {
                    el.opened = window.innerWidth >= DESKTOP_MIN_WIDTH ? el.openedOnLoad : false;
                    el.items = el.items.map((item) => {
                        item.selected = false;
                        return item;
                    });
                    return el;
                }));
                setLastFilterWasChecked(false);

                // TODO: possible bug, originally setstate callback
                // console.log('filter cadrs in loaddata');
                // filterCards();
                getBookMarksFromLS();
            });
    }, []);

    // Set focusOut handlers
    useEffect(() => {
        console.log('set focusout');
        const handleFocusOut = (clickEvt) => {
            clickEvt.stopPropagation();

            if (getConfig('filterPanel', 'type') !== 'top') return;

            const CLASS_NAME = {
                TOP_FILTER: 'consonant-top-filter',
                TOP_FILTER_OPENED: 'consonant-top-filter consonant-top-filter_opened',
                TOP_FILTER_SELECTED: 'consonant-top-filter consonant-top-filter_selected',
                SEARCH: 'consonant-top-filters--search-ico-wrapper',
            };
            const t = clickEvt.target;

            const hasClassName = (q) => {
                let result = t.className === q;

                if (!result) {
                    for (let it = t; it && it !== document; it = it.parentNode) {
                        if (it.className === q) result = true;
                    }
                }

                return result;
            };

            // TODO: Clarify intent
            if (hasClassName(CLASS_NAME.SEARCH)) {
                setShowTopFilterSearch(true);
            } else {
                setShowTopFilterSearch(false);
            }

            if (
                (hasClassName(CLASS_NAME.TOP_FILTER) ||
          hasClassName(CLASS_NAME.TOP_FILTER_OPENED) ||
          hasClassName(CLASS_NAME.TOP_FILTER_SELECTED)) &&
                !hasClassName(CLASS_NAME.SEARCH)
            ) {
                setFilters(filtersStateRef.current);
            } else {
                setFilters(filtersStateRef.current.map((f) => {
                    const newObj = JSON.parse(JSON.stringify(f));

                    newObj.opened = false;
                    return newObj;
                }));
            }
        };

        window.addEventListener('click', handleFocusOut);
        return () => window.removeEventListener('click', handleFocusOut);
    }, []);


    // Update dimensions on resize
    useEffect(() => {
        console.log('udpate dimensions');
        let updateDimensionsTimer;
        const updateDimensions = () => {
            window.clearTimeout(updateDimensionsTimer);
            updateDimensionsTimer = window.setTimeout(() => {
                setWindowWidth(window.innerWidth);
                setShowMobileFilters(false);
            }, awaitTime);
        };
        window.addEventListener('resize', updateDimensions);
        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    useEffect(() => {
        console.log('Filtering cards');
        filterCards();
    }, [cards]);

    useEffect(() => {
        updateCardsWithBookmarks();
    }, [cards, bookmarkedCardIds]);


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
                      onClearAllFilters={clearAllFilters}
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
                          selected={showFavourites}
                          onClick={handleShowFavsClick}
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
                                  onClearAllFilters={clearAllFilters}
                                  clearFilterText={getConfig('filterPanel', 'clearFilterText')}
                                  clearAllFiltersText={getConfig('filterPanel', 'clearAllFiltersText')}
                                  showTotalResults={getConfig('collection', 'displayTotalResults')}
                                  showTotalResultsText={getConfig('collection', 'totalResultsText')}
                                  showSearchbar={showTopFilterSearch}
                                  showLimitedFiltersQty={showLimitedFiltersQty}
                                  onShowAllClick={handleShowAllTopFilters}>
                                  {getConfig('search', 'enabled') &&
                                renderSearch('filtersTopSearch')
                                  }
                                  {
                                      getConfig('search', 'enabled') &&
                                  windowWidth >= TABLET_MIN_WIDTH &&
                                  <SearchIco
                                      childrenKey="filtersTopSearchIco"
                                      onClick={handleSearchIcoClick} />

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
                        {cards.length > 0 ?
                            <Fragment>
                                <Collection
                                    showItemsPerPage={showItemsPerPage}
                                    pages={pages}
                                    cards={getCollectionCards()}
                                    allowBookmarking={getConfig('bookmarks', 'enabled')}
                                    onCardBookmark={handleCardBookmarking}
                                    cardUnsavedIco={getConfig('bookmarks', 'cardUnsavedIcon')}
                                    cardSavedIco={getConfig('bookmarks', 'cardSavedIcon')}
                                    saveCardText={getConfig('bookmarks', 'saveCardText')}
                                    unsaveCardText={getConfig('bookmarks', 'unsaveCardText')}
                                    cardsStyle={getConfig('collection', 'cardStyle')} />
                                {
                                    checkIfDisplayPaginator('loadMore') &&
                                    //  Migrate to useRef
                                    <div ref={(page) => { this.page = page; }}>
                                        <LoadMore
                                            onClick={setCardsToShowQty}
                                            show={getCardsToShowQty()}
                                            total={filteredCards.length}
                                            loadMoreButtonText={getConfig('pagination', 'loadMoreButtonText')}
                                            loadMoreQuantityText={getConfig('pagination', 'loadMoreQuantityText')} />
                                    </div>
                                }
                                {
                                    checkIfDisplayPaginator('paginator') &&
                                    <Paginator
                                        pageCount={windowWidth <= DESKTOP_MIN_WIDTH ?
                                            PAGINATION_COUNT.MOBILE : PAGINATION_COUNT.DESKTOP
                                        }
                                        currentPageNumber={pages}
                                        totalPages={getTotalPages()}
                                        showItemsPerPage={showItemsPerPage}
                                        totalResults={filteredCards.length}
                                        onClick={handlePaginatorClick}
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
