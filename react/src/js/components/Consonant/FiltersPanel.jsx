import React from 'react';
import PropTypes from 'prop-types';
import FilterItem from './FilterItem';
import Search from './Search';

const DESKTOP_MIN_WIDTH = 1200;

const FiltersPanel = (props) => {
    const {
        filters,
        windowWidth,
        showMobileFilters,
        showTotalResults,
        searchEnabled,
        searchPlaceholder,
        searchQuery,
        onFilterClick,
        clearFilterText,
        clearAllFiltersText,
        onClearAllFilters,
        onClearFilterItems,
        onCheckboxClick,
        onMobileFiltersToggleClick,
        showFavsMenuLink,
        selectBookmarksIcon,
        unselectBookmarksIcon,
        showFavs,
        favsQty,
        onFavsClick,
        onSearch,
        resQty,
    } = props;


    const countSelectedInFilter = el => el.reduce((acc, val) => (val.selected ? acc + 1 : acc), 0);
    const checkFilterSelected = () => filters.some(f => countSelectedInFilter(f.items) > 0);

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
            onClick={onClearAllFilters}>{clearAllFiltersText}
        </button>
    );
    const desktopFiltersSearch = (
        windowWidth >= DESKTOP_MIN_WIDTH &&
        searchEnabled &&
        <Search
            placeholderText={searchPlaceholder}
            value={searchQuery}
            onSearch={onSearch} />
    );
    const mobileFiltersFooter = (windowWidth < DESKTOP_MIN_WIDTH &&
        <div className="consonant-filters--mobile-footer">
            {showTotalResults &&
            <span className="consonant-filters--mobile-footer-total-res">{resQty} results</span>
            }
            {
                checkFilterSelected() &&
                <button
                    type="button"
                    className="consonant-filters--mobile-footer-clear"
                    onClick={onClearAllFilters}>{clearAllFiltersText}
                </button>
            }
            <button
                type="button"
                className="consonant-filters--mobile-footer-btn"
                onClick={onMobileFiltersToggleClick}>
                {checkFilterSelected() ? 'Apply' : 'Done'}
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
            {
                filters.length > 0 &&
                    <div className="consonant-filters--list">
                        {filters.map(item =>
                            (<FilterItem
                                key={item.id}
                                name={item.group}
                                icon={item.icon}
                                items={item.items}
                                itemsSelected={countSelectedInFilter(item.items)}
                                results={resQty}
                                id={item.id}
                                isOpened={item.opened}
                                onCheck={onCheckboxClick}
                                onClick={onFilterClick}
                                onClearAll={onClearFilterItems}
                                clearFilterText={clearFilterText} />))}
                    </div>
            }
            { showFavsMenuLink &&
                <button
                    type="button"
                    onClick={onFavsClick}
                    className={
                        showFavs ?
                            'consonant-filters--bookmarks consonant-filters--bookmarks_selected' :
                            'consonant-filters--bookmarks'
                    }>
                    <span className="consonant-filters--bookmarks-ico-wrapper">
                        {(selectBookmarksIcon && unselectBookmarksIcon) ?
                            <img
                                src={showFavs ? unselectBookmarksIcon : selectBookmarksIcon}
                                width="16"
                                alt=""
                                loading="lazy" /> :
                            <svg
                                width="16"
                                height="14"
                                className="consonant-filters--bookmarks-ico"><use href="#heart" />
                            </svg>
                        }
                        <span className="consonant-filters--bookmarks-title">My favorites</span>
                    </span>
                    <span className="consonant-filters--item-badge">{favsQty}</span>
                </button>
            }
            {mobileFiltersFooter}
        </div>
    );
};

export default FiltersPanel;

FiltersPanel.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.object),
    windowWidth: PropTypes.number,
    showMobileFilters: PropTypes.bool,
    showTotalResults: PropTypes.bool,
    showFavsMenuLink: PropTypes.bool.isRequired,
    selectBookmarksIcon: PropTypes.string.isRequired,
    unselectBookmarksIcon: PropTypes.string.isRequired,
    showFavs: PropTypes.bool,
    favsQty: PropTypes.number,
    searchQuery: PropTypes.string,
    onFilterClick: PropTypes.func.isRequired,
    clearFilterText: PropTypes.string.isRequired,
    clearAllFiltersText: PropTypes.string.isRequired,
    onClearAllFilters: PropTypes.func.isRequired,
    onClearFilterItems: PropTypes.func.isRequired,
    onCheckboxClick: PropTypes.func.isRequired,
    onMobileFiltersToggleClick: PropTypes.func.isRequired,
    onFavsClick: PropTypes.func.isRequired,
    searchEnabled: PropTypes.bool.isRequired,
    searchPlaceholder: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    resQty: PropTypes.number,
};

FiltersPanel.defaultProps = {
    filters: [],
    windowWidth: window.innerWidth,
    showFavs: false,
    showMobileFilters: false,
    showTotalResults: true,
    searchQuery: '',
    resQty: 0,
    favsQty: 0,
};
