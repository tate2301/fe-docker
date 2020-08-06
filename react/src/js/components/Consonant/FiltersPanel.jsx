import React from 'react';
import PropTypes from 'prop-types';
import FilterItem from './FilterItem';
import ConsonantSearch from '../ConsonantSearch/ConsonantSearch';

const DESKTOP_MIN_WIDTH = 1200;

const FiltersPanel = (props) => {
    const {
        filters,
        windowWidth,
        showMobileFilters,
        searchQuery,
        cardsQty,
        onFilterClick,
        onClearAllFilters,
        onClearFilterItems,
        onCheckboxClick,
        onMobileFiltersToggleClick,
        onSearch,
    } = props;

    const mobileFiltersTitle = (windowWidth < DESKTOP_MIN_WIDTH &&
        <div className="consonant-filters--mob-title">
            <button
                type="button"
                onClick={onMobileFiltersToggleClick}
                className="consonant-filters--mob-back">Back
            </button>
            <span>Filter by</span>
        </div>
    );
    const desktopFiltersTitle = (windowWidth >= DESKTOP_MIN_WIDTH &&
        <h3 className="consonant-filters--desk-title">Refine the results</h3>
    );
    const desktopFiltersClearBtn = (windowWidth >= DESKTOP_MIN_WIDTH &&
        <button
            type="button"
            className="consonant-filters--clear-link"
            onClick={onClearAllFilters}>clear all
        </button>
    );
    const desktopFiltersSearch = (windowWidth >= DESKTOP_MIN_WIDTH &&
        <ConsonantSearch
            itemsQty={cardsQty}
            value={searchQuery}
            onSearch={onSearch} />
    );
    const mobileFiltersFooter = (windowWidth < DESKTOP_MIN_WIDTH &&
        <div className="consonant-filters--mobile-footer">
            <span className="consonant-filters--mobile-footer-total-res">231 results</span>
            <button
                type="button"
                className="consonant-filters--mobile-footer-clear"
                onClick={onClearAllFilters}>Clear all
            </button>
            <button
                type="button"
                className="consonant-filters--mobile-footer-btn"
                onClick={onMobileFiltersToggleClick}>apply
            </button>
        </div>
    );

    return (
        <div
            className={
                showMobileFilters ?
                    'consonant-filters consonant-filters_opened' :
                    'consonant-filters'
            }>
            <div className="consonant-filters--header">
                {mobileFiltersTitle}
                {desktopFiltersTitle}
                {desktopFiltersClearBtn}
            </div>
            {desktopFiltersSearch}
            <div className="consonant-filters--list">
                {filters.map(item =>
                    (<FilterItem
                        key={item.id}
                        name={item.group}
                        items={item.items}
                        id={item.id}
                        isOpened={item.opened}
                        onCheck={onCheckboxClick}
                        onClick={onFilterClick}
                        onClearAll={onClearFilterItems} />))}
            </div>
            {mobileFiltersFooter}
        </div>
    );
};

export default FiltersPanel;

FiltersPanel.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.object),
    windowWidth: PropTypes.number,
    showMobileFilters: PropTypes.bool,
    searchQuery: PropTypes.string,
    cardsQty: PropTypes.number,
    onFilterClick: PropTypes.func.isRequired,
    onClearAllFilters: PropTypes.func.isRequired,
    onClearFilterItems: PropTypes.func.isRequired,
    onCheckboxClick: PropTypes.func.isRequired,
    onMobileFiltersToggleClick: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
};

FiltersPanel.defaultProps = {
    filters: [],
    windowWidth: window.innerWidth,
    showMobileFilters: false,
    searchQuery: '',
    cardsQty: 0,
};
