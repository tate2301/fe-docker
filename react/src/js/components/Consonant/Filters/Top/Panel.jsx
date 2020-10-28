import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import sum from 'lodash/sum';

import { isAtleastOneFilterSelected } from '../../Helpers/general';
import SearchIcon from '../../Search/SearchIcon';
import { Group as TopFilterItem } from './Group';
import { renderTotalResults } from '../../Helpers/rendering';

import {
    useConfig,
    useExpandable,
} from '../../Helpers/hooks';

import {
    TABLET_MIN_WIDTH,
    MAX_TRUNCATED_FILTERS,
    MIN_FILTERS_SHOW_BG,
} from '../../Helpers/constants';

/**
 * Top filters panel
 *
 * @component
 * @example
 * const props= {
    filters: Array,
    resQty: Number,
    onCheckboxClick: Function,
    onFilterClick: Function,
    onClearAllFilters: Function,
    onClearFilterItems: Function,
    showLimitedFiltersQty: Boolean,
    onShowAllClick: Function,
    windowWidth: Number,
    searchComponent: Node,
    sortComponent: Node,
    filterPanelEnabled: Boolean,
 * }
 * return (
 *   <FiltersPanelTop {...props}/>
 * )
 */
const FiltersPanelTop = (props) => {
    const {
        filters,
        resQty,
        onCheckboxClick,
        onFilterClick,
        onClearAllFilters,
        onClearFilterItems,
        showLimitedFiltersQty,
        onShowAllClick,
        windowWidth,
        searchComponent,
        sortComponent,
        filterPanelEnabled,
    } = props;

    const getConfig = useConfig();

    /**
     **** Authored Configs ****
     */
    const searchEnabled = getConfig('search', 'enabled');
    const clearFilterText = getConfig('filterPanel', 'i18n.topPanel.mobile.group.clearFilterText');
    const clearAllFiltersText = getConfig('filterPanel', 'i18n.topPanel.clearAllFiltersText');
    const blurMobileFilters = getConfig('filterPanel', 'topPanel.mobile.blurFilters');
    const showTotalResults = getConfig('collection', 'showTotalResults');
    const showTotalResultsText = getConfig('collection', 'i18n.totalResultsText');
    const sortEnabled = getConfig('sort', 'enabled');
    const sortOptions = getConfig('sort', 'options');
    const filterGroupLabel = getConfig('filterPanel', 'i18n.topPanel.groupLabel');
    const moreFiltersBtnText = getConfig('filterPanel', 'i18n.topPanel.moreFiltersBtnText');
    const title = getConfig('collection', 'i18n.title');

    /**
     **** Constants ****
     */

    /**
     * Top search bar identifier
     * @type {String}
     */
    const searchId = 'top-search';

    /**
     * Total results HTML
     * @type {Array}
     */
    const totalResultsHtml = renderTotalResults(showTotalResultsText, resQty);

    /**
     * Whether at least one filter is selected
     * @type {Boolean}
     */
    const atleastOneFilterSelected = isAtleastOneFilterSelected(filters);

    /**
     * Whether the current viewport width fits mobile devices or tablets
     * @type {Boolean}
     */
    const TABLET_OR_MOBILE_SCREEN_SIZE = windowWidth < TABLET_MIN_WIDTH;

    /**
     * Whether the current viewport width fits tablets or desktops/laptops
     * @type {Boolean}
     */
    const TABLET_OR_DESKTOP_SCREEN_SIZE = windowWidth >= TABLET_MIN_WIDTH;

    /**
     * Whether we should hide all filters after quantity defined in MAX_TRUNCATED_FILTERS constant
     * @type {Boolean}
     */
    const shouldHideSomeFilters = filters.length > MAX_TRUNCATED_FILTERS;

    /**
     * Whether the sort dropdown should be displayed
     * @type {Boolean}
     */
    const shouldDisplaySortComponent = sortEnabled && sortOptions.length > 0;

    /**
     * Whether the filters should be displayed
     * @type {Boolean}
     */
    const shouldDisplayFilters = filters.length > 0 && filterPanelEnabled;

    /**
     * Whether the "Show all filters" button should be displayed
     * @type {Boolean}
     */
    const shouldDisplayMoreFiltersBtn =
        shouldHideSomeFilters && TABLET_OR_DESKTOP_SCREEN_SIZE && showLimitedFiltersQty;

    /**
     * Whether the title of the collection and the quantity of the filtered cards
     * should be displayed
     * @type {Boolean}
     */
    const shouldDisplayCollectionInfo = title || showTotalResults;

    /**
     * Whether the search bar should be displayed
     * @type {Boolean}
     */
    const shouldDisplaySearchBar = searchComponent && TABLET_OR_MOBILE_SCREEN_SIZE;

    /**
     * Whether the "Clear all filters" button should be displayed
     * @type {Boolean}
     */
    const shouldShowClearButtonWrapper = atleastOneFilterSelected
        || filters.length >= MIN_FILTERS_SHOW_BG;

    /**
     * Class name for the top filters:
     * whether we should hide all filters after quantity defined in MAX_TRUNCATED_FILTERS constant
     * @type {String}
     */
    const showLimitedFiltersQtyClass = classNames({
        'consonant-top-filters--filters': true,
        'consonant-top-filters--filters_truncated': showLimitedFiltersQty,
    });

    /**
     * Class name for the "Clear filters" button:
     * whether the blur effect should be applied to the container
     * @type {String}
     */
    const clearBtnWrapperClass = classNames({
        'consonant-top-filters--clear-btn-wrapper': true,
        'consonant-top-filters--clear-btn-wrapper_with-blur': blurMobileFilters && filters.length > 1,
    });

    /**
     **** Hooks ****
     */

    /**
     * @typedef {String} openExpandableState - Id of the <Search /> component
     * @description — defined in the searchId constant
     *
     * @typedef {Function} ExpandableToggleSetter - Handles toggling opened/closed state of
     * the <Search /> component
     * @description
     *
     * @type {[String, Function]} openExpandable
     */
    const [openExpandable, handleExpandableToggle] = useExpandable(searchId);

    /**
     * Whether the search bar should be visible
     * @type {Boolean}
     */
    const shouldShowSearchBar = openExpandable === searchId;

    return (
        <div
            data-testid="consonant-filters__top"
            className="consonant-top-filters">
            {shouldDisplaySearchBar &&
                <div
                    data-testid="top-filters__search-wrapper"
                    className="consonant-top-filters--search-wrapper">
                    {searchComponent}
                </div>
            }
            <div
                className="consonant-top-filters--inner">
                {shouldDisplayFilters &&
                    <div
                        className="consonant-top-filters--filters-wrapper">
                        {TABLET_OR_DESKTOP_SCREEN_SIZE &&
                            <strong
                                className="consonant-top-filters--title">
                                {filterGroupLabel}
                            </strong>
                        }
                        <div
                            data-testid="consonant-filters__top__filters"
                            className={showLimitedFiltersQtyClass}>
                            {filters.map(filter =>
                                (<TopFilterItem
                                    key={filter.id}
                                    name={filter.group}
                                    items={filter.items}
                                    numItemsSelected={sum(filter.items.map(i => i.selected))}
                                    results={resQty}
                                    id={filter.id}
                                    isOpened={filter.opened}
                                    onCheck={onCheckboxClick}
                                    onClick={onFilterClick}
                                    onClearAll={onClearFilterItems}
                                    clearFilterText={clearFilterText}
                                    isTopFilter />))
                            }
                            {shouldDisplayMoreFiltersBtn &&
                                <button
                                    type="button"
                                    data-testid="top-filter__more-button"
                                    className="consonant-top-filters--more-btn"
                                    onClick={onShowAllClick}>
                                    {moreFiltersBtnText}
                                </button>
                            }
                        </div>
                        {shouldShowClearButtonWrapper &&
                            <div
                                data-testid="top-filter__clear-button-wrapper"
                                className={clearBtnWrapperClass}>
                                {atleastOneFilterSelected &&
                                    <button
                                        type="button"
                                        data-testid="top-filter__clear-button"
                                        className="consonant-top-filters--clear-btn"
                                        onClick={onClearAllFilters}
                                        tabIndex="0">
                                        {clearAllFiltersText}
                                    </button>
                                }
                            </div>
                        }
                    </div>
                }
                {searchEnabled && TABLET_OR_DESKTOP_SCREEN_SIZE &&
                    <div
                        data-testid="filter-top-ico-wrapper"
                        className="consonant-top-filters--search-ico-wrapper">
                        {shouldShowSearchBar && searchComponent}
                        {TABLET_OR_DESKTOP_SCREEN_SIZE &&
                            <SearchIcon
                                onClick={handleExpandableToggle} />
                        }
                    </div>
                }
                {shouldDisplaySortComponent &&
                    <div
                        data-testid="top-filters__sort-popup"
                        className="consonant-top-filters--select-wrapper">
                        {sortComponent}
                    </div>
                }
                {shouldDisplayCollectionInfo &&
                    <div className="consonant-top-filters--info-wrapper">
                        {title &&
                            <h2
                                data-testid="title"
                                className="consonant-top-filters--collection-title">
                                {title}
                            </h2>
                        }
                        {showTotalResults &&
                            <div
                                data-testid="results"
                                className="consonant-top-filters--results">
                                {totalResultsHtml}
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
};

FiltersPanelTop.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.object),
    resQty: PropTypes.number,
    onCheckboxClick: PropTypes.func.isRequired,
    onFilterClick: PropTypes.func.isRequired,
    onClearAllFilters: PropTypes.func.isRequired,
    onClearFilterItems: PropTypes.func.isRequired,
    showLimitedFiltersQty: PropTypes.bool,
    onShowAllClick: PropTypes.func.isRequired,
    windowWidth: PropTypes.number.isRequired,
    searchComponent: PropTypes.node.isRequired,
    filterPanelEnabled: PropTypes.bool.isRequired,
    sortComponent: PropTypes.node.isRequired,
};

FiltersPanelTop.defaultProps = {
    filters: [],
    resQty: 0,
    showLimitedFiltersQty: false,
};

export default FiltersPanelTop;
