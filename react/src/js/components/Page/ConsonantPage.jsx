/* eslint-disable */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import Collection from '../Consonant/Collection';
import FiltersPanel from '../Consonant/FiltersPanel';
import ConsonantHeader from '../Consonant/Header';
import FiltersInfo from '../Consonant/FiltersInfo';
import LoadMore from '../Consonant/LoadMore';
import Loader from '../Consonant/Loader';
import Pagination from '../Consonant/Pagination';

const LOADER_SIZE = {
    MEDIUM: 'medium',
    BIG: 'big',
};
const FILTER_LOGIC = {
    AND: 'and',
    OR: 'or',
    XOR: 'xor',
};
const SORTING_OPTION = {
    FEATURED: 'initialTitle',
    DATE: 'lastModified',
    TITLE: 'initialTitle',
};
const TRUNCATE_TEXT_QTY = 200;
let updateDimensionsTimer;

export default class ConsonantPage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            cards: [],
            filteredCards: [],
            bookmarkedCards: [],
            pages: 1,
            filters: [],
            lastFilterWasChecked: false,
            searchQuery: '',
            selectOpened: false,
            selelectedFilterBy: this.getDefaultSortOption(),
            showItemsPerPage: this.getConfig('collection', 'resultsPerPage'),
            windowWidth: window.innerWidth,
            showMobileFilters: false,
            showFavourites: false,
        };

        this.updateDimensions = this.updateDimensions.bind(this);
        this.clearAllFilters = this.clearAllFilters.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.clearFilterItems = this.clearFilterItems.bind(this);
        this.loadData = this.loadData.bind(this);
        this.setCardsToShowQty = this.setCardsToShowQty.bind(this);
        this.getCardsToShowQty = this.getCardsToShowQty.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.handleFilterItemClick = this.handleFilterItemClick.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.handleFiltersToggle = this.handleFiltersToggle.bind(this);
        this.getActiveFiltersIds = this.getActiveFiltersIds.bind(this);
        this.getBookMarksFromLS = this.getBookMarksFromLS.bind(this);
        this.filterCards = this.filterCards.bind(this);
        this.sortCards = this.sortCards.bind(this);
        this.searchCards = this.searchCards.bind(this);
        this.showFavourites = this.showFavourites.bind(this);
        this.handleCardBookmarking = this.handleCardBookmarking.bind(this);
        this.updateCardsWithBookmarks = this.updateCardsWithBookmarks.bind(this);
        this.handleShowFavsClick = this.handleShowFavsClick.bind(this);
        this.handleSelectOpen = this.handleSelectOpen.bind(this);
        this.resetFavourites = this.resetFavourites.bind(this);
        this.setBookMarksToLS = this.setBookMarksToLS.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);

        // Load data on init;
        this.loadData().then((res) => {
            const truncateString = (str, num) => {
                if (str.length <= num) return str;
                return `${str.slice(0, num)}...`;
            };
            const applyCardLimitToLoadedCards = (data) => {
                const currentCardsQty = this.state.cards.length;
                const limit = this.getConfig('collection', 'totalCardLimit');

                // No limit, return all;
                if (limit < 0) return data;

                /* Limit is exceeded (for example, featured cards were added),
                    we need decrease it to max allowed; */
                if (currentCardsQty >= limit) {
                    this.setState(prevState => ({ cards: [...prevState.cards.slice(0, limit)] }));
                    return [];
                }

                // Slice received data to required q-ty;
                return data.slice(0, limit - currentCardsQty);
            };
            const removeSameCardIds = (featured, cards) => [
                ...featured,
                ...cards.filter(card => !featured.some(el => card.id === el.id)),
            ];
            const processCard = (card) => {
                card.initialTitle = card.title;
                card.description = truncateString(card.description, TRUNCATE_TEXT_QTY);
                card.initialText = card.description;
                card.isBookmarked = false;
                return card
            };

            let { featuredCards } = this.props.config || [];
            const filters = this.getConfig('filterPanel', 'filters');

            if (!res || !res.cards) return;

            let cards = removeSameCardIds(this.state.cards, res.cards);

            featuredCards = featuredCards.map((el) => {
                el.isFeatured = true;
                return el;
            });
            cards = removeSameCardIds(featuredCards, cards);
            cards = applyCardLimitToLoadedCards(cards).map(card => processCard(card));
            this.setState({
                cards,
                filters: filters.map((el) => {
                    el.opened = false;
                    el.items = el.items.map((item) => {
                        item.selected = false;
                        return item;
                    });
                    return el;
                }),
                lastFilterWasChecked: false,
            }, () => {
                this.filterCards();
                this.getBookMarksFromLS();
            });
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    getConfig(object, key) {
        const defaultProps = {
            collection: {
                resultsPerPage: 9,
                endpoint: 'http://caas-publi-aa3c8qnjxs09-336471204.us-west-1.elb.amazonaws.com/api/v4/webinars',
                title: '',
                totalCardLimit: -1,
            },
            featuredCards: [],
            header: {
                enabled: true,
            },
            filterPanel: {
                enabled: true,
                type: 'side',
                filters: [],
                clearAllFiltersText: 'Clear all',
                clearFilterText: 'Clear',
                filterLogic: 'and',
            },
            sort: {
                enabled: true,
                options: [
                    {
                        label: 'Featured',
                        sort: 'featured',
                    },
                    {
                        label: 'Date',
                        sort: 'date',
                    },
                    {
                        label: 'Title',
                        sort: 'title',
                    },
                ],
            },
            pagination: {
                enabled: true,
                type: 'load-more',
            },
            bookmarks: {
                enabled: true,
                cardSavedIcon: '',
                cardUnsavedIcon: '',
                selectBookmarksIcon: '',
                unselectBookmarksIcon: '',
                saveBookmarkText: 'Save card',
                unsaveBookmarkText: 'Unsave card',
            },
            search: {
                enabled: true,
                placeholderText: 'Search here...',
            },
            totalResults: {
                display: true,
            },
        };

        if (
            !this.props.config[object] ||
            (
                !this.props.config[object][key] &&
                (
                    typeof this.props.config[object][key] !== 'boolean' &&
                    typeof this.props.config[object][key] !== 'number'
                )
            )
        ) { return defaultProps[object][key] }
        return this.props.config[object][key];
    }

    getDefaultSortOption() {
        const { sort } = this.props.config;
        let res = {
            label: 'Featured',
            sort: 'featured',
        };

        if (sort && sort.options) {
            const filtered = sort.options.filter(el => el.sort === 'featured');
            if (filtered && filtered.length) [res] = filtered;
        }

        return res;
    }

    getSelectedFiltersItemsQty() {
        const res = this.state.filters.reduce((acc, val) => {
            const count = val.items.reduce((accum, value) => {
                if (value.selected) return accum + 1;
                return accum;
            }, 0);

            return acc + count;
        }, 0);

        return res;
    }

    getCardsToShowQty() {
        let res = this.state.showItemsPerPage * this.state.pages;

        if (res > this.state.filteredCards.length) res = this.state.filteredCards.length;

        return res;
    }

    getActiveFiltersIds() {
        const filters = this.state.filters.reduce((acc, val) => {
            val.items.forEach((el) => {
                if (el.selected) acc.push(el.id);
            });
            return acc;
        }, []);

        return filters;
    }

    getBookMarksFromLS() {
        const data = JSON.parse(localStorage.getItem('bookmarks'));

        if (Array.isArray(data)) {
            this.setState({ bookmarkedCards: data }, this.updateCardsWithBookmarks);
        }
    }

    setCardsToShowQty() {
        const currentPos = window.pageYOffset;
        this.setState(prevState => ({
            pages: prevState.pages + 1,
        }), () => { window.scrollTo(0, currentPos); });
    }

    setBookMarksToLS() {
        try {
            localStorage.setItem('bookmarks', JSON.stringify(this.state.bookmarkedCards, null, 2));
        } catch (e) {
            alert('We could not save your bookmarks, please try to reload thші page.');
        }
    }

    async loadData() {
        const response = await window.fetch(this.getConfig('collection', 'endpoint'));
        const json = await response.json();
        return json;
    }

    filterCards() {
        const filters = this.getActiveFiltersIds();
        const query = this.state.searchQuery;
        let filterLogic = this.getConfig('filterPanel', 'filterLogic');
        filterLogic = filterLogic.toLowerCase().trim();

        const checkCardsApplyToFilters = (cards, selectedFilters) => {
            const res = cards.reduce((acc, card) => {
                let filterPassed = false;

                if (
                    card.appliesTo &&
                    (filterLogic === FILTER_LOGIC.XOR || filterLogic === FILTER_LOGIC.AND) &&
                    selectedFilters.every(el => card.appliesTo.some(tag => tag.id === el))
                ) { filterPassed = true; } else if (
                    card.appliesTo &&
                    (filterLogic === FILTER_LOGIC.OR) &&
                    selectedFilters.some(el => card.appliesTo.some(tag => tag.id === el))
                ) { filterPassed = true; }

                if (filterPassed) acc.push(card);
                return acc;
            }, []);
            return res;
        };
        const applySorting = () => {
            if (this.state.selelectedFilterBy && this.state.selelectedFilterBy.sort) {
                this.sortCards(this.state.selelectedFilterBy.sort);
            }
        };

        /* In case of filters were reset or q-ty decreased, or filterLogic is XOR or OR
        we need to update search; */
        if (
            (query && !filters.length) ||
            (query && !this.state.lastFilterWasChecked) ||
            (filterLogic === FILTER_LOGIC.XOR) ||
            (filterLogic === FILTER_LOGIC.OR)
        ) { this.searchCards(); }

        /* If no filters selected and no search, or filterLogic is XOR or OR and no search,
        we show all cards; */
        if (
            (!filters.length && !query) ||
            (filterLogic === FILTER_LOGIC.OR && !query) ||
            (filterLogic === FILTER_LOGIC.XOR && !query)
        ) {
            this.setState(prevState => ({ filteredCards: [...prevState.cards] }), applySorting);
        }

        // If a new filter was added, we filter within previous results;
        if (
            (filters.length && this.state.lastFilterWasChecked) ||
            (filters.length && query)
        ) {
            this.setState(prevState => ({
                filteredCards: checkCardsApplyToFilters([...prevState.filteredCards], filters),
            }), applySorting);
        }

        // If a filter was removed, we search from the beginning;
        if (filters.length && !this.state.lastFilterWasChecked && !query) {
            this.setState(prevState => ({
                filteredCards: checkCardsApplyToFilters([...prevState.cards], filters),
            }), applySorting);
        }
    }

    updateDimensions = () => {
        const awaitTime = 100;

        window.clearTimeout(updateDimensionsTimer);
        updateDimensionsTimer = window.setTimeout(() => {
            this.setState({
                windowWidth: window.innerWidth,
                showMobileFilters: false,
            });
        }, awaitTime);
    };

    sortCards(field) {
        const val = SORTING_OPTION[field.toUpperCase().trim()];
        const featuredLabel = 'featured';

        if (!val) return;

        const sorted = [...this.state.filteredCards].sort((a, b) => {
            if (a[val] < b[val]) return -1;
            if (a[val] > b[val]) return 1;
            return 0;
        });

        // In case of featured, move featured items to the top;
        if (field === featuredLabel) {
            sorted.sort(a => (a.isFeatured ? -1 : 0))
                .sort((a, b) => (
                    (a.isFeatured && b.isFeatured) &&
                    (a.initialTitle < b.initialTitle) ? -1 : 0));
        }

        this.setState({ filteredCards: sorted });
    }

    searchCards() {
        const query = this.state.searchQuery.trim().toLowerCase();
        const results = [];
        const highlightText = (text, val) => text.replace(new RegExp(val, 'gi'), value => `<span class="consonant-search-result">${value}</span>`);

        // In case we reset search, just show all results;
        if (!query) {
            this.setState(prevState => ({ filteredCards: [...prevState.cards] }));
        } else {
            this.state.cards.forEach((el) => {
                let pushToRes = false;
                const copy = { ...el };

                // Filter cards per title;
                if (copy.title.toLowerCase().trim().indexOf(query) >= 0) {
                    copy.title = highlightText(copy.title, query);
                    pushToRes = true;
                }

                // Filter cards per text;
                if (copy.description.toLowerCase().trim().indexOf(query) >= 0) {
                    copy.description = highlightText(copy.description, query);
                    pushToRes = true;
                }

                if (pushToRes) results.push(copy);
            });

            this.setState({
                filteredCards: results,
                showFavourites: false,
            }, () => {
                if (this.state.selelectedFilterBy && this.state.selelectedFilterBy.sort) {
                    this.sortCards(this.state.selelectedFilterBy.sort);
                }
            });
        }
    }

    clearFilterItems(id) {
        this.setState(prevState => ({
            filters: prevState.filters.map((el) => {
                if (el.id === id) {
                    el.items.map((item) => {
                        item.selected = false;
                        return item;
                    });
                }
                return el;
            }),
            lastFilterWasChecked: false,
        }), () => { this.filterCards(); });
    }

    clearFilters() {
        this.setState(prevState => ({
            filters: prevState.filters.map((el) => {
                el.items.map((filter) => {
                    filter.selected = false;
                    return filter;
                });
                return el;
            }),
        }));
    }

    clearAllFilters(isFavs) {
        const showFavourites = typeof isFavs !== 'boolean' ? false : isFavs;

        this.clearFilters();
        this.setState({
            searchQuery: '',
            lastFilterWasChecked: false,
            showFavourites,
        }, () => {
            if (!showFavourites) {
                this.searchCards();
                this.filterCards();
            }
        });
    }

    showFavourites() {
        this.setState(prevState => ({
            filteredCards: prevState.cards.filter(card => card.isBookmarked),
        }), () => {
            this.sortCards(this.state.selelectedFilterBy.sort);
        });
    }

    resetFavourites() {
        this.setState(prevState => ({
            filteredCards: prevState.cards,
            showFavourites: false,
        }), () => {
            this.sortCards(this.state.selelectedFilterBy.sort);
        });
    }

    handleSelectChange(option) {
        if (option.label === this.state.selelectedFilterBy.label) {
            this.setState({ selectOpened: false });
            return;
        }

        this.setState({
            selelectedFilterBy: option,
            selectOpened: false,
        }, () => {
            this.sortCards(this.state.selelectedFilterBy.sort);
        });
    }

    handleSearchInputChange(val) {
        this.clearFilters();
        this.setState({
            searchQuery: val,
        }, () => {
            this.searchCards();
        });
    }

    handleFilterItemClick(filterId) {
        this.setState((prevState) => {
            const res = prevState.filters.map((el) => {
                if (el.id === filterId) {
                    el.opened = !el.opened;
                }

                return el;
            });

            return { filters: res };
        });
    }

    handleCheckBoxChange(filterId, itemId, isChecked) {
        const filterLogic = this.getConfig('filterPanel', 'filterLogic');

        if (this.state.showFavourites) this.resetFavourites();

        // If xor filterLogic set, we reset all filters;
        if (filterLogic.toLowerCase().trim() === FILTER_LOGIC.XOR && isChecked) this.clearFilters();

        this.setState((prevState) => {
            const list = prevState.filters.map((filter) => {
                if (filter.id === filterId) {
                    filter.items = filter.items.map((item) => {
                        if (item.id === itemId) item.selected = !item.selected;

                        return item;
                    });
                }

                return filter;
            });

            return {
                filters: list,
                lastFilterWasChecked: isChecked,
            };
        }, this.filterCards);
    }

    handleFiltersToggle() {
        this.setState(prevState => ({
            showMobileFilters: !prevState.showMobileFilters,
        }));
    }

    handleSelectOpen() {
        this.setState(prevState => ({ selectOpened: !prevState.selectOpened }));
    }

    updateCardsWithBookmarks() {
        const updatedBookmarks = [];

        const doCheck = arr => arr.map((el) => {
            if (this.state.bookmarkedCards.some(item => el.id === item)) {
                el.isBookmarked = true;
                if (!updatedBookmarks.some(item => item === el.id)) updatedBookmarks.push(el.id);
            } else {
                el.isBookmarked = false;
            }
            return el;
        });

        // Update state;
        this.setState(prevState => ({
            cards: doCheck(prevState.cards),
            filteredCards: doCheck(prevState.filteredCards),
            bookmarkedCards: updatedBookmarks,
        }), () => {
            this.setBookMarksToLS();
            if (this.state.showFavourites) this.showFavourites();
        });
    }

    handleCardBookmarking(id) {
        // Update bookmarked IDs;
        const searchIdx = this.state.bookmarkedCards.indexOf(id);

        if (searchIdx >= 0) {
            this.setState(prevState => ({
                bookmarkedCards: prevState.bookmarkedCards.filter(el => el !== id),
            }), this.updateCardsWithBookmarks);
        } else {
            this.setState(prevState => ({
                bookmarkedCards: [...prevState.bookmarkedCards, id],
            }), this.updateCardsWithBookmarks);
        }
    }

    handleShowFavsClick(clickEvt) {
        clickEvt.stopPropagation();
        this.setState(prevState => ({ showFavourites: !prevState.showFavourites }), () => {
            if (this.state.showFavourites) {
                this.clearAllFilters(true);
                this.showFavourites();
            } else {
                this.resetFavourites();
            }
        });
    }

    render() {
        return (
            <Fragment>
                {this.getConfig('header', 'enabled') && <ConsonantHeader />}
                <section
                    className="consonant-page">
                    <div className="consonant-page--inner">
                        <span>
                            {this.getConfig('filterPanel', 'enabled') &&
                                <FiltersPanel
                                    filters={this.state.filters}
                                    windowWidth={this.state.windowWidth}
                                    showMobileFilters={this.state.showMobileFilters}
                                    showTotalResults={this.getConfig('totalResults', 'display')}
                                    searchQuery={this.state.searchQuery}
                                    resQty={this.state.filteredCards.length}
                                    onFilterClick={this.handleFilterItemClick}
                                    clearFilterText={this.getConfig('filterPanel', 'clearFilterText')}
                                    clearAllFiltersText={this.getConfig('filterPanel', 'clearAllFiltersText')}
                                    onClearAllFilters={this.clearAllFilters}
                                    onClearFilterItems={this.clearFilterItems}
                                    showFavsMenuLink={this.getConfig('bookmarks', 'enabled')}
                                    selectBookmarksIcon={this.getConfig('bookmarks', 'selectBookmarksIcon')}
                                    unselectBookmarksIcon={this.getConfig('bookmarks', 'unselectBookmarksIcon')}
                                    onFavsClick={this.handleShowFavsClick}
                                    showFavs={this.state.showFavourites}
                                    favsQty={this.state.bookmarkedCards.length}
                                    onCheckboxClick={this.handleCheckBoxChange}
                                    onMobileFiltersToggleClick={this.handleFiltersToggle}
                                    searchEnabled={this.getConfig('search', 'enabled')}
                                    searchPlaceholder={this.getConfig('search', 'placeholderText')}
                                    onSearch={this.handleSearchInputChange} />
                            }
                        </span>
                        <span>
                            <FiltersInfo
                                enabled={this.getConfig('filterPanel', 'enabled')}
                                title={this.getConfig('collection', 'title')}
                                filters={this.state.filters}
                                cardsQty={this.state.filteredCards.length}
                                showSelect={this.getConfig('sort', 'enabled')}
                                showTotalResults={this.getConfig('totalResults', 'display')}
                                selectedFiltersQty={this.getSelectedFiltersItemsQty()}
                                windowWidth={this.state.windowWidth}
                                selectValues={this.getConfig('sort', 'options')}
                                selelectedFilterBy={this.state.selelectedFilterBy}
                                selectOpened={this.state.selectOpened}
                                onSelectOpen={this.handleSelectOpen}
                                onSelect={this.handleSelectChange}
                                searchEnabled={this.getConfig('search', 'enabled')}
                                searchPlaceholder={this.getConfig('search', 'placeholderText')}
                                searchQuery={this.state.searchQuery}
                                onSearch={this.handleSearchInputChange}
                                onMobileFiltersToggleClick={this.handleFiltersToggle}
                                onSelectedFilterClick={this.handleCheckBoxChange} />
                            {this.state.cards.length > 0 ?
                                <Fragment>
                                    <Collection
                                        showItemsPerPage={this.state.showItemsPerPage}
                                        pages={this.state.pages}
                                        cards={this.state.filteredCards}
                                        allowBookmarking={this.getConfig('bookmarks', 'enabled')}
                                        onCardBookmark={this.handleCardBookmarking}
                                        cardUnsavedIco={this.getConfig('bookmarks', 'cardUnsavedIcon')}
                                        cardSavedIco={this.getConfig('bookmarks', 'cardSavedIcon')}
                                        saveBookmarkText={this.getConfig('bookmarks', 'saveBookmarkText')}
                                        unsaveBookmarkText={this.getConfig('bookmarks', 'unsaveBookmarkText')} />
                                    {
                                        this.getConfig('pagination', 'enabled') &&
                                        <div ref={(page) => { this.page = page; }}>
                                            <LoadMore
                                                onClick={this.setCardsToShowQty}
                                                show={this.getCardsToShowQty()}
                                                total={this.state.filteredCards.length} />
                                            <Pagination />
                                        </div>
                                    }
                                </Fragment> :
                                <Loader
                                    size={LOADER_SIZE.BIG}
                                    hidden={!this.getConfig('collection', 'totalCardLimit')}
                                    absolute />
                            }
                        </span>
                    </div>
                </section>
            </Fragment>
        );
    }
}

ConsonantPage.propTypes = {
    config: PropTypes.shape({
        collection: PropTypes.shape({
            resultsPerPage: PropTypes.number,
            endpoint: PropTypes.string,
            title: PropTypes.string,
            totalCardLimit: PropTypes.number,
        }),
        featuredCards: PropTypes.arrayOf(PropTypes.object),
        header: PropTypes.shape({
            enabled: PropTypes.bool,
        }),
        filterPanel: PropTypes.shape({
            enabled: PropTypes.bool,
            type: PropTypes.string,
            filters: PropTypes.arrayOf(PropTypes.object),
            clearAllFiltersText: PropTypes.string,
            clearFilterText: PropTypes.string,
            filterLogic: PropTypes.string,
        }),
        sort: PropTypes.shape({
            enabled: PropTypes.bool,
            options: PropTypes.arrayOf(PropTypes.object),
        }),
        pagination: PropTypes.shape({
            enabled: PropTypes.bool,
            type: PropTypes.string,
        }),
        bookmarks: PropTypes.shape({
            enabled: PropTypes.bool,
            cardSavedIcon: PropTypes.string,
            cardUnsavedIcon: PropTypes.string,
            selectBookmarksIcon: PropTypes.string,
            unselectBookmarksIcon: PropTypes.string,
        }),
        search: PropTypes.shape({
            enabled: PropTypes.bool,
            placeholderText: PropTypes.string,
        }),
        totalResults: PropTypes.shape({
            display: PropTypes.bool,
        }),
    }),
};

ConsonantPage.defaultProps = {
    config: {},
};
