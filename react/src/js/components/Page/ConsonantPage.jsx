import React, { Fragment } from 'react';
import ConsonantCardCollection from '../Consonant/Collection';
import FiltersPanel from '../Consonant/FiltersPanel';
import ConsonantHeader from '../Consonant/Header';
import FiltersInfo from '../Consonant/FiltersInfo';

// Fixtures;
const filters = [
    {
        id: '1',
        name: 'Filter number 1',
        opened: false,
        items: [
            {
                id: '1',
                name: 'Filter 1',
                selected: false,
            },
            {
                id: '2',
                name: 'Filter 2',
                selected: false,
            },
            {
                id: '3',
                name: 'Filter 3',
                selected: false,
            },
            {
                id: '4',
                name: 'Filter 4',
                selected: false,
            },
            {
                id: '5',
                name: 'Filter 5',
                selected: false,
            },
            {
                id: '6',
                name: 'Filter 6',
                selected: false,
            },
            {
                id: '7',
                name: 'Filter 7',
                selected: false,
            },
        ],
    },
    {
        id: '2',
        name: 'Filter number 2',
        opened: false,
        items: [
            {
                id: '1',
                name: 'Filter item 5',
                selected: false,
            },
            {
                id: '2',
                name: 'Filter item 6',
                selected: false,
            },
            {
                id: '3',
                name: 'Filter item 7',
                selected: false,
            },
            {
                id: '4',
                name: 'Filter item 8',
                selected: false,
            },
        ],
    },
];
const selectValues = [
    'Popular',
    'Date',
];
let prevTimer;

export default class ConsonantPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filters,
            searchQuery: '',
            selelectedFilterBy: '',
            windowWidth: window.innerWidth,
            showMobileFilters: false,
        };

        this.updateDimensions = this.updateDimensions.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.clearFilterItems = this.clearFilterItems.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.handleFilterItemClick = this.handleFilterItemClick.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.handleFiltersToggle = this.handleFiltersToggle.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
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

    updateDimensions = () => {
        const awaitTime = 100;

        window.clearTimeout(prevTimer);
        prevTimer = window.setTimeout(() => {
            this.setState({
                windowWidth: window.innerWidth,
                showMobileFilters: false,
            });
        }, awaitTime);
    };

    clearFilterItems(id) {
        this.setState(prevState => prevState.filters.map((el) => {
            if (el.id === id) {
                el.items.map((item) => {
                    item.selected = false;
                    return item;
                });
            }
            return el;
        }));
    }

    clearFilters() {
        this.setState(prevState => ({
            searchQuery: '',
            filters: prevState.filters.map((el) => {
                el.items.map((filter) => {
                    filter.selected = false;
                    return filter;
                });
                return el;
            }),
        }));
    }

    handleSelectChange(val) {
        this.setState({ selelectedFilterBy: val }, () => {
            console.log('UPDATED STATE: ', this.state);
        });
    }

    handleSearchInputChange(val) {
        this.setState({
            searchQuery: val,
        }, () => {
            console.log('UPDATED STATE: ', this.state);
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

    handleCheckBoxChange(filterId, itemId) {
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
            };
        }, () => {
            console.log('UPDATED STATE: ', this.state);
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
                            cardsQty={123}
                            onFilterClick={this.handleFilterItemClick}
                            onClearAllFilters={this.clearFilters}
                            onClearFilterItems={this.clearFilterItems}
                            onCheckboxClick={this.handleCheckBoxChange}
                            onMobileFiltersToggleClick={this.handleFiltersToggle}
                            onSearch={this.handleSearchInputChange} />
                        <div>
                            <FiltersInfo
                                filters={this.state.filters}
                                cardsQty={111}
                                selectedFiltersQty={0}
                                windowWidth={this.state.windowWidth}
                                selectValues={selectValues}
                                selelectedFilterBy={this.state.selelectedFilterBy}
                                onSelect={this.handleSelectChange}
                                onSearch={this.handleSearchInputChange}
                                onMobileFiltersToggleClick={this.handleFiltersToggle} />
                            <ConsonantCardCollection
                                loadCards />
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}
