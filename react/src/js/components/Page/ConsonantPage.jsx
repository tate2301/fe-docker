/* eslint-disable react/no-unused-prop-types,semi */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import Collection from '../Consonant/Collection';
import FiltersPanel from '../Consonant/FiltersPanel';
import ConsonantHeader from '../Consonant/Header';
import FiltersInfo from '../Consonant/FiltersInfo';
import LoadMore from '../Consonant/LoadMore';
import Loader from '../Consonant/Loader';

const selectValues = [
    'Popular',
    'Date',
    'Title',
];
const LOADER_SIZE = {
    MEDIUM: 'medium',
    BIG: 'big',
};
const TRUNCATE_TEXT_QTY = 200;
let updateDimensionsTimer;
let updateScrollPosTimer;

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
            selelectedFilterBy: 'Popular',
            initialScrollPos: 0,
            showItemsPerPage: this.props.config.collection.resultsPerPage,
            windowWidth: window.innerWidth,
            showMobileFilters: false,
            showFavourites: false,
        };

        this.updateDimensions = this.updateDimensions.bind(this);
        this.clearAllFilters = this.clearAllFilters.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.clearFilterItems = this.clearFilterItems.bind(this);
        this.loadData = this.loadData.bind(this);
        this.setInitialScrollPos = this.setInitialScrollPos.bind(this);
        this.setCardsToShowQty = this.setCardsToShowQty.bind(this);
        this.getWrapperScrollPos = this.getWrapperScrollPos.bind(this);
        this.getCardsToShowQty = this.getCardsToShowQty.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.handleFilterItemClick = this.handleFilterItemClick.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.handleFiltersToggle = this.handleFiltersToggle.bind(this);
        this.handleInitialScrollPos = this.handleInitialScrollPos.bind(this);
        this.getActiveFiltersIds = this.getActiveFiltersIds.bind(this);
        this.getBookMarksFromLS = this.getBookMarksFromLS.bind(this);
        this.filterCards = this.filterCards.bind(this);
        this.sortCards = this.sortCards.bind(this);
        this.searchCards = this.searchCards.bind(this);
        this.showFavourites = this.showFavourites.bind(this);
        this.handleCardBookmarking = this.handleCardBookmarking.bind(this);
        this.updateCardsWithBookmarks = this.updateCardsWithBookmarks.bind(this);
        this.handleShowFavsClick = this.handleShowFavsClick.bind(this);
        this.resetFavourites = this.resetFavourites.bind(this);
        this.setBookMarksToLS = this.setBookMarksToLS.bind(this);
        console.log(props.config);
    }

    componentDidMount() {
        console.log('So props received', this.props);

        this.setInitialScrollPos();
        window.addEventListener('resize', this.updateDimensions);
        window.addEventListener('resize', this.handleInitialScrollPos);

        // Load data on init;
        this.loadData().then((res) => {
            const truncateString = (str, num) => {
                if (str.length <= num) return str;
                return `${str.slice(0, num)}...`;
            };
            const applyCardLimitToLoadedCards = (data) => {
                const currentCardsQty = this.state.cards.length;
                const limit = this.props.config.collection.totalCardLimit;

                // No limit, return all;
                if (limit <= 0) return data;

                /* Limit is exceeded (for example, featured cards were added),
                    we need decrease it to max allowed; */
                if (currentCardsQty >= limit) {
                    this.setState(prevState => ({ cards: [...prevState.cards.slice(0, limit)] }));
                    return [];
                }

                // Slice received data to required q-ty;
                return data.slice(0, limit - currentCardsQty);
            };

            const { featuredCards } = this.props.config;

            const processCard = (card) => {
                card.initialTitle = card.title;
                card.description = truncateString(card.description, TRUNCATE_TEXT_QTY);
                card.initialText = card.description;
                card.isBookmarked = false;
                return card
            };

            if (Array.isArray(featuredCards) && featuredCards.length) {
                this.setState(prevState => ({
                    cards: [...featuredCards.map(card => processCard(card)), ...prevState.cards],
                }));
            }

            res.cards = applyCardLimitToLoadedCards(res.cards);

            if (!res || !res.cards || !res.filters) return;

            this.setState(prevState => ({
                cards: [...prevState.cards, ...res.cards.map(card => processCard(card))],
                filters: res.filters.map((el) => {
                    el.opened = false;
                    el.items = el.items.map((item) => {
                        item.selected = false;
                        return item;
                    });
                    return el;
                }),
                lastFilterWasChecked: false,
            }), () => {
                this.filterCards();
                this.getBookMarksFromLS();
            });
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
        window.removeEventListener('resize', this.handleInitialScrollPos);
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

    getWrapperScrollPos() {
        return parseInt(this.page.getBoundingClientRect().top, 10);
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
        const currentPos = this.getWrapperScrollPos();
        this.setState(prevState => ({
            pages: prevState.pages + 1,
        }), () => {
            window.scrollTo(0, Math.abs(currentPos) + this.state.initialScrollPos);
        });
    }

    setBookMarksToLS() {
        try {
            localStorage.setItem('bookmarks', JSON.stringify(this.state.bookmarkedCards, null, 2));
        } catch (e) {
            alert('We could not save your bookmarks, please try to reload thші page.');
        }
    }

    setInitialScrollPos() {
        this.setState({ initialScrollPos: Math.abs(this.getWrapperScrollPos()) });
    }

    async loadData() {
        const response = await window.fetch(this.props.config.collection.endpoint);
        const json = await response.json();
        return json;
    }

    filterCards() {
        const filters = this.getActiveFiltersIds();
        const query = this.state.searchQuery;
        const checkCardsApplyToFilters = (cards, selectedFilters) => {
            const res = cards.reduce((acc, card) => {
                let filterPassed = false;

                if (
                    card.appliesTo &&
                    selectedFilters.every(el => card.appliesTo.some(tag => tag.id === el))
                ) { filterPassed = true; }

                if (filterPassed) acc.push(card);
                return acc;
            }, []);
            return res;
        };
        const applySorting = () => {
            if (this.state.selelectedFilterBy) {
                this.sortCards(this.state.selelectedFilterBy);
            }
        };

        // In case of filters were reset or q-ty decreased, we need to update search;
        if (
            (query && !filters.length) ||
            (query && !this.state.lastFilterWasChecked)
        ) { this.searchCards(); }

        // If no filters selected and no search, we show all cards;
        if (!filters.length && !query) {
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
        const FIELD = {
            popular: 'initialTitle',
            date: 'lastModified',
            title: 'initialTitle',
        };
        const val = FIELD[field.trim().toLowerCase()];

        if (!val) return;

        const sorted = [...this.state.filteredCards].sort((a, b) => {
            if (a[val] < b[val]) return -1;

            if (a[val] > b[val]) return 1;
            return 0;
        });

        this.setState({ filteredCards: sorted });
    }

    searchCards() {
        const query = this.state.searchQuery;
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
                if (this.state.selelectedFilterBy) {
                    this.sortCards(this.state.selelectedFilterBy);
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
            this.sortCards(this.state.selelectedFilterBy);
        });
    }

    resetFavourites() {
        this.setState(prevState => ({
            filteredCards: prevState.cards,
            showFavourites: false,
        }), () => {
            this.sortCards(this.state.selelectedFilterBy);
        });
    }

    handleInitialScrollPos() {
        const awaitTime = 100;

        window.clearTimeout(updateScrollPosTimer);
        updateScrollPosTimer = window.setTimeout(() => {
            window.scrollTo(0, 0);
            this.setInitialScrollPos();
        }, awaitTime);
    }

    handleSelectChange(val) {
        if (val === this.state.selelectedFilterBy) return;

        this.setState({ selelectedFilterBy: val }, () => {
            this.sortCards(this.state.selelectedFilterBy);
        });
    }

    handleSearchInputChange(val) {
        this.clearFilters();
        this.setState({
            searchQuery: val.toLowerCase().trim(),
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
        if (this.state.showFavourites) this.resetFavourites();

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
                {this.props.config.header.enabled && <ConsonantHeader />}
                <section
                    ref={(page) => { this.page = page; }}
                    className="consonant-page">
                    <div className="consonant-page--inner">
                        <div>
                            <FiltersPanel
                                filters={this.state.filters}
                                windowWidth={this.state.windowWidth}
                                showMobileFilters={this.state.showMobileFilters}
                                searchQuery={this.state.searchQuery}
                                cardsQty={this.state.cards.length}
                                resQty={this.state.filteredCards.length}
                                onFilterClick={this.handleFilterItemClick}
                                onClearAllFilters={this.clearAllFilters}
                                onClearFilterItems={this.clearFilterItems}
                                onFavsClick={this.handleShowFavsClick}
                                showFavs={this.state.showFavourites}
                                favsQty={this.state.bookmarkedCards.length}
                                onCheckboxClick={this.handleCheckBoxChange}
                                onMobileFiltersToggleClick={this.handleFiltersToggle}
                                onSearch={this.handleSearchInputChange} />
                        </div>
                        <div>
                            <FiltersInfo
                                title={this.props.config.collection.title}
                                filters={this.state.filters}
                                cardsQty={this.state.filteredCards.length}
                                selectedFiltersQty={this.getSelectedFiltersItemsQty()}
                                windowWidth={this.state.windowWidth}
                                selectValues={selectValues}
                                selelectedFilterBy={this.state.selelectedFilterBy}
                                onSelect={this.handleSelectChange}
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
                                        onCardBookmark={this.handleCardBookmarking} />
                                    <LoadMore
                                        onClick={this.setCardsToShowQty}
                                        show={this.getCardsToShowQty()}
                                        total={this.state.filteredCards.length} />
                                </Fragment> :
                                <Loader
                                    size={LOADER_SIZE.BIG}
                                    absolute />
                            }
                        </div>
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
            endpoint: PropTypes.string.isRequired,
            title: PropTypes.string,
            totalCardLimit: PropTypes.number,
        }),
        featuredCards: PropTypes.arrayOf(PropTypes.object),
        header: PropTypes.shape({
            enabled: PropTypes.bool,
        }),
        poc_label: PropTypes.string,
    }),
};

ConsonantPage.defaultProps = {
    config: {
        collection: {
            resultsPerPage: 9,
            title: '',
            totalCardLimit: 0, // No totalCardLimit by default;
        },
        featuredCards: [],
        header: {
            enabled: true,
        },
        poc_label: 'Default value',
    },
};
