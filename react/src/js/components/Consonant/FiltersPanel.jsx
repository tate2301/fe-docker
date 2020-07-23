import React from 'react';
import FilterItem from './FilterItem';
import SelectedFilter from './SelectedFilter';
import ConsonantSearch from '../ConsonantSearch/ConsonantSearch';
import ConsonantSelect from '../ConsonantSelect/ConsonantSelect';

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
                results: 23,
                selected: false,
            },
            {
                id: '2',
                name: 'Filter 2',
                results: 210,
                selected: false,
            },
            {
                id: '3',
                name: 'Filter 3',
                results: 3,
                selected: false,
            },
            {
                id: '4',
                name: 'Filter 4',
                results: 30,
                selected: false,
            },
            {
                id: '5',
                name: 'Filter 5',
                results: 30,
                selected: false,
            },
            {
                id: '6',
                name: 'Filter 6',
                results: 30,
                selected: false,
            },
            {
                id: '7',
                name: 'Filter 7',
                results: 30,
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
                results: 23,
                selected: false,
            },
            {
                id: '2',
                name: 'Filter item 6',
                results: 210,
                selected: false,
            },
            {
                id: '3',
                name: 'Filter item 7',
                results: 3,
                selected: false,
            },
            {
                id: '4',
                name: 'Filter item 8',
                results: 30,
                selected: false,
            },
        ],
    },
];

const selectValues = [
    'Most popular',
    'Option 1',
    'Option 2',
    'Option 3',
];

const DESKTOP_MIN_WIDTH = 1200;
let prevTimer;

export default class FilterPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filters,
            searchQuery: '',
            selelectedFilterBy: '',
            showFilters: false,
            windowWidth: window.innerWidth,
            ui: {
                selectedFiltersHeight: 0,
            },
        };

        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.handleFilterItemClick = this.handleFilterItemClick.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.clearFilterItems = this.clearFilterItems.bind(this);
        this.handleFiltersToggle = this.handleFiltersToggle.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.updateFiltersHeight = this.updateFiltersHeight.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
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
                showFilters: false,
            });
        }, awaitTime);
    };

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
            this.updateFiltersHeight();
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

    handleFiltersToggle() {
        this.setState(prevState => ({
            showFilters: !prevState.showFilters,
        }));
    }

    handleSelectChange(val) {
        this.setState({ selelectedFilterBy: val }, () => {
            console.log('UPDATED STATE: ', this.state);
        });
    }

    clearFilterItems(id) {
        this.setState(prevState => prevState.filters.map((el) => {
            if (el.id === id) {
                el.items.map((item) => {
                    item.selected = false;
                    return item;
                });
            }
            return el;
        }), () => {
            this.updateFiltersHeight();
        });
    }

    clearFilters() {
        this.setState(prevState => prevState.filters.map(el => (
            el.items.map((filter) => {
                filter.selected = false;
                return filter;
            })
        )), () => {
            this.updateFiltersHeight();
        });
    }

    updateFiltersHeight() {
        const node = this.selectedFilters;
        const height = node ? node.offsetHeight : 0;

        this.setState(prevState => ({
            ui: {
                ...prevState.ui,
                selectedFiltersHeight: height,
            },
        }), () => {
            console.log('UPDATED STATE: ', this.state);
        });
    }

    defineClassName() {
        const res = this.state.showFilters ?
            'consonant-filters consonant-filters_opened' :
            'consonant-filters';
        let spaceClass = '';
        const HEIGHT = {
            ONE_LINE: 55,
            TWO_LINES: 87,
            THREE_LINES: 119,
        };
        const height = this.state.ui.selectedFiltersHeight;

        // Set className based on height of filters wrapper;
        if (this.state.windowWidth >= DESKTOP_MIN_WIDTH) {
            if (height >= HEIGHT.ONE_LINE) spaceClass = 'consonant-filters_one-line';
            if (height >= HEIGHT.TWO_LINES) spaceClass = 'consonant-filters_two-lines';
            if (height >= HEIGHT.THREE_LINES) spaceClass = 'consonant-filters_three-lines';
        }

        return spaceClass ? `${res} ${spaceClass}` : res;
    }

    render() {
        const desktopFiltersAsideInfo = (this.state.windowWidth >= DESKTOP_MIN_WIDTH &&
            <div className="consonant-filters--info-wrapper">
                <h2 className="consonant-filters--info-title">Lorem ipsum dolor sit amet.</h2>
                <span className="consonant-filters--info-results">273 results</span>
            </div>
        );
        const mobileAsideInfoSearch = (this.state.windowWidth < DESKTOP_MIN_WIDTH &&
            <div className="consonant-filters--info-search">
                <ConsonantSearch
                    itemsQty={123}
                    value={this.state.searchQuery}
                    onSearch={this.handleSearchInputChange} />
            </div>
        );
        const mobileAsideInfoFilterBtn = (this.state.windowWidth < DESKTOP_MIN_WIDTH &&
            <div className="consonant-filters--info-btn-wrapper">
                <button
                    type="button"
                    className={
                        this.getSelectedFiltersItemsQty() > 0 ?
                            'consonant-filters--info-btn consonant-filters--info-btn_with-filters' :
                            'consonant-filters--info-btn'
                    }
                    onClick={this.handleFiltersToggle}>
                    <span className="consonant-filters--info-btn-ico" />
                    <span className="consonant-filters--info-btn-text">filters</span>
                    {
                        this.getSelectedFiltersItemsQty() > 0 &&
                        <span className="consonant-filters--info-btn-selected">
                            {this.getSelectedFiltersItemsQty()}
                        </span>
                    }
                </button>
            </div>
        );
        const mobileFiltersTitle = (this.state.windowWidth < DESKTOP_MIN_WIDTH &&
            <div className="consonant-filters--mob-title">
                <button
                    type="button"
                    onClick={this.handleFiltersToggle}
                    className="consonant-filters--mob-back">Back
                </button>
                <span>Filter by</span>
            </div>
        );
        const desktopFiltersTitle = (this.state.windowWidth >= DESKTOP_MIN_WIDTH &&
            <h3 className="consonant-filters--desk-title">Refine the results</h3>
        );
        const desktopFiltersClearBtn = (this.state.windowWidth >= DESKTOP_MIN_WIDTH &&
            <button
                type="button"
                className="consonant-filters--clear-link"
                onClick={this.clearFilters}>clear all
            </button>
        );
        const desktopFiltersSearch = (this.state.windowWidth >= DESKTOP_MIN_WIDTH &&
            <ConsonantSearch
                // @todo pass prop;
                itemsQty={123}
                value={this.state.searchQuery}
                onSearch={this.handleSearchInputChange} />
        );
        const mobileFiltersFooter = (this.state.windowWidth < DESKTOP_MIN_WIDTH &&
            <div className="consonant-filters--mobile-footer">
                <span className="consonant-filters--mobile-footer-total-res">231 results</span>
                <button
                    type="button"
                    className="consonant-filters--mobile-footer-clear"
                    onClick={this.clearFilters}>Clear all
                </button>
                <button
                    type="button"
                    className="consonant-filters--mobile-footer-btn"
                    onClick={this.handleFiltersToggle}>apply
                </button>
            </div>
        );
        const desktopSelectedFilters = (
            this.state.windowWidth >= DESKTOP_MIN_WIDTH &&
            this.getSelectedFiltersItemsQty() > 0 &&
            <div
                ref={(selectedFilters) => { this.selectedFilters = selectedFilters; }}
                className="consonant-filters--selected-filters">
                {this.state.filters.map(el => (
                    el.items.map(filter => (
                        filter.selected &&
                        <SelectedFilter
                            key={filter.id}
                            name={filter.name}
                            id={filter.id}
                            parentId={el.id}
                            onClick={this.handleCheckBoxChange} />
                    ))
                ))}
            </div>
        );
        return (
            <div className={this.defineClassName()}>
                <aside className="consonant-filters--info">
                    {desktopFiltersAsideInfo}
                    {mobileAsideInfoSearch}
                    {mobileAsideInfoFilterBtn}
                    <ConsonantSelect
                        val={this.state.selelectedFilterBy}
                        values={selectValues}
                        onSelect={this.handleSelectChange} />
                    {desktopSelectedFilters}
                </aside>
                <div className="consonant-filters--header">
                    {mobileFiltersTitle}
                    {desktopFiltersTitle}
                    {desktopFiltersClearBtn}
                </div>
                {desktopFiltersSearch}
                <div className="consonant-filters--list">
                    {this.state.filters.map(item =>
                        (<FilterItem
                            key={item.id}
                            name={item.name}
                            items={item.items}
                            id={item.id}
                            isOpened={item.opened}
                            onCheck={this.handleCheckBoxChange}
                            onClick={this.handleFilterItemClick}
                            onClearAll={this.clearFilterItems} />))}
                </div>
                {mobileFiltersFooter}
            </div>
        );
    }
}
