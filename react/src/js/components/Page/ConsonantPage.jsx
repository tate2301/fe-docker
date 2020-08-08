import React, { Fragment } from 'react';
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
const PARAMS = {
    LOAD_POSTS_URL: 'http://caas-publi-aa3c8qnjxs09-336471204.us-west-1.elb.amazonaws.com/api/v3/caas',
    SHOW_ITEMS_PER_STEP: 21,
};

let updateDimensionsTimer;
let updateScrollPosTimer;

export default class ConsonantPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            filteredCards: [],
            pages: 1,
            filters: [],
            lastFilterWasChecked: false,
            searchQuery: '',
            selelectedFilterBy: '',
            initialScrollPos: 0,
            showItemsPerPage: PARAMS.SHOW_ITEMS_PER_STEP,
            windowWidth: window.innerWidth,
            showMobileFilters: false,
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
        this.filterCards = this.filterCards.bind(this);
        this.sortCards = this.sortCards.bind(this);
        this.searchCards = this.searchCards.bind(this);
    }

    componentDidMount() {
        this.setInitialScrollPos();
        window.addEventListener('resize', this.updateDimensions);
        window.addEventListener('resize', this.handleInitialScrollPos);

        // Load data on init;
        this.loadData().then((res) => {
            if (!res || !res.cards || !res.filters) return;

            this.setState(prevState => ({
                cards: [...prevState.cards, ...res.cards.map((card) => {
                    card.initialTitle = card.title;
                    card.initialText = card.text;
                    return card;
                })],
                filters: res.filters.map((el) => {
                    el.opened = false;
                    el.items = el.items.map((item) => {
                        item.selected = false;
                        return item;
                    });
                    return el;
                }),
                lastFilterWasChecked: false,
            }), () => { this.filterCards(); });
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

    setCardsToShowQty() {
        const currentPos = this.getWrapperScrollPos();
        this.setState(prevState => ({
            pages: prevState.pages + 1,
        }), () => {
            window.scrollTo(0, Math.abs(currentPos) + this.state.initialScrollPos);
        });
    }

    getWrapperScrollPos() {
        return 500;
        // return parseInt(this.cardsWrapper.getBoundingClientRect().top, 10);
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

    setInitialScrollPos() {
        this.setState({ initialScrollPos: Math.abs(this.getWrapperScrollPos()) });
    }

    async loadData() {
        const response = await fetch(PARAMS.LOAD_POSTS_URL);
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

        console.log('SO CARDS TO SORT', this.state.filteredCards);

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

                console.log('ELLLLL > ', copy.title);

                // Filter cards per title;
                if (copy.title.toLowerCase().trim().indexOf(query) >= 0) {
                    copy.title = highlightText(copy.title, query);
                    pushToRes = true;
                }

                // Filter cards per text;
                if (copy.text.toLowerCase().trim().indexOf(query) >= 0) {
                    copy.text = highlightText(copy.text, query);
                    pushToRes = true;
                }

                if (pushToRes) results.push(copy);
            });

            this.setState({ filteredCards: results }, () => {
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

    clearAllFilters() {
        this.clearFilters();
        this.setState({
            searchQuery: '',
            lastFilterWasChecked: false,
        }, () => {
            this.searchCards();
            this.filterCards();
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
        }, () => {
            console.log('UPDATED STATE handleCheckBoxChange: ', this.state);
            this.filterCards();
        });
    }

    handleFiltersToggle() {
        this.setState(prevState => ({
            showMobileFilters: !prevState.showMobileFilters,
        }));
    }

    render() {
        return (
            <Fragment>
                <ConsonantHeader />
                <section className="consonant-page">
                    <div className="consonant-page--inner">
                        <FiltersPanel
                            filters={this.state.filters}
                            windowWidth={this.state.windowWidth}
                            showMobileFilters={this.state.showMobileFilters}
                            searchQuery={this.state.searchQuery}
                            cardsQty={this.state.cards.length}
                            onFilterClick={this.handleFilterItemClick}
                            onClearAllFilters={this.clearAllFilters}
                            onClearFilterItems={this.clearFilterItems}
                            onCheckboxClick={this.handleCheckBoxChange}
                            onMobileFiltersToggleClick={this.handleFiltersToggle}
                            onSearch={this.handleSearchInputChange} />
                        <div>
                            <FiltersInfo
                                filters={this.state.filters}
                                cardsQty={this.state.filteredCards.length}
                                selectedFiltersQty={this.getSelectedFiltersItemsQty()}
                                windowWidth={this.state.windowWidth}
                                selectValues={selectValues}
                                selelectedFilterBy={this.state.selelectedFilterBy}
                                onSelect={this.handleSelectChange}
                                onSearch={this.handleSearchInputChange}
                                onMobileFiltersToggleClick={this.handleFiltersToggle}
                                onSelectedFilterClick={this.handleCheckBoxChange} />
                            {this.state.cards.length > 0 ?
                                <Fragment>
                                    <Collection
                                        showItemsPerPage={this.state.showItemsPerPage}
                                        pages={this.state.pages}
                                        cards={this.state.filteredCards} />
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
