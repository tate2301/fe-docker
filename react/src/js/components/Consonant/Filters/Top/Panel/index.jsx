import React from 'react';
import sum from 'lodash/sum';
import classNames from 'classnames';

import { selector } from './utils';
import { If } from '../../../Common';
import { FiltersPanelTopType } from './types';
import { Group as TopFilterItem } from '../Group';
import SearchIcon from '../../../Search/SearchIcon';
import { renderTotalResults } from '../../../Helpers/rendering';
import { isAtleastOneFilterSelected } from '../../../Helpers/general';
import {
    searchId,
    defaultProps,
} from './constants';
import {
    useExpandable,
    useConfigSelector,
} from '../../../Helpers/hooks';
import {
    TABLET_MIN_WIDTH,
    MIN_FILTERS_SHOW_BG,
    MAX_TRUNCATED_FILTERS,
} from '../../../Helpers/constants';

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
const FiltersPanelTop = ({
    resQty,
    filters,
    windowWidth,
    onFilterClick,
    sortComponent,
    onShowAllClick,
    onCheckboxClick,
    searchComponent,
    onClearAllFilters,
    onClearFilterItems,
    filterPanelEnabled,
    showLimitedFiltersQty,
}) => {
    const {
        title,
        sortEnabled,
        sortOptions,
        blurFilters,
        searchEnabled,
        clearFilterText,
        showTotalResults,
        totalResultsText,
        filterGroupLabel,
        moreFiltersBtnText,
        clearAllFiltersText,
    } = useConfigSelector(selector);

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
     **** Constants ****
     */

    /**
     * Total results HTML
     * @type {Array}
     */
    const totalResultsHtml = renderTotalResults(totalResultsText, resQty);

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
        'consonant-top-filters--clear-btn-wrapper_with-blur': blurFilters && filters.length > 1,
    });

    /**
     * Whether the search bar should be visible
     * @type {Boolean}
     */
    const shouldShowSearchBar = openExpandable === searchId;

    return (
        <div
            data-testid="consonant-filters__top"
            className="consonant-top-filters">
            <If condition={Boolean(shouldDisplaySearchBar)}>
                <div
                    data-testid="top-filters__search-wrapper"
                    className="consonant-top-filters--search-wrapper">
                    {searchComponent}
                </div>
            </If>
            <div
                className="consonant-top-filters--inner">
                <If condition={Boolean(shouldDisplayFilters)}>
                    <div
                        className="consonant-top-filters--filters-wrapper">
                        <If condition={Boolean(TABLET_OR_DESKTOP_SCREEN_SIZE)}>
                            <strong
                                className="consonant-top-filters--title">
                                {filterGroupLabel}
                            </strong>
                        </If>
                        <div
                            data-testid="consonant-filters__top__filters"
                            className={showLimitedFiltersQtyClass}>
                            {filters.map(filter =>
                                (<TopFilterItem
                                    isTopFilter
                                    id={filter.id}
                                    key={filter.id}
                                    results={resQty}
                                    name={filter.group}
                                    items={filter.items}
                                    onClick={onFilterClick}
                                    isOpened={filter.opened}
                                    onCheck={onCheckboxClick}
                                    onClearAll={onClearFilterItems}
                                    clearFilterText={clearFilterText}
                                    numItemsSelected={sum(filter.items.map(i => i.selected))} />))
                            }
                            <If condition={Boolean(shouldDisplayMoreFiltersBtn)}>
                                <button
                                    type="button"
                                    onClick={onShowAllClick}
                                    data-testid="top-filter__more-button"
                                    className="consonant-top-filters--more-btn">
                                    {moreFiltersBtnText}
                                </button>
                            </If>
                        </div>

                        <If condition={Boolean(shouldShowClearButtonWrapper)}>
                            <div
                                data-testid="top-filter__clear-button-wrapper"
                                className={clearBtnWrapperClass}>
                                <If condition={Boolean(shouldShowClearButtonWrapper)}>
                                    <button
                                        tabIndex="0"
                                        type="button"
                                        onClick={onClearAllFilters}
                                        data-testid="top-filter__clear-button"
                                        className="consonant-top-filters--clear-btn">
                                        {clearAllFiltersText}
                                    </button>
                                </If>
                            </div>
                        </If>
                    </div>
                </If>
                <If condition={searchEnabled && TABLET_OR_DESKTOP_SCREEN_SIZE}>
                    <div
                        data-testid="filter-top-ico-wrapper"
                        className="consonant-top-filters--search-ico-wrapper">
                        <If condition={Boolean(shouldShowSearchBar)}>
                            {searchComponent}
                        </If>
                        <If condition={Boolean(TABLET_OR_DESKTOP_SCREEN_SIZE)}>
                            <SearchIcon onClick={handleExpandableToggle} />
                        </If>
                    </div>
                </If>

                <If condition={Boolean(shouldDisplaySortComponent)}>
                    <div
                        data-testid="top-filters__sort-popup"
                        className="consonant-top-filters--select-wrapper">
                        {sortComponent}
                    </div>
                </If>
                <If condition={Boolean(shouldDisplayCollectionInfo)}>
                    <div className="consonant-top-filters--info-wrapper">
                        <If condition={Boolean(title)}>
                            <h2
                                data-testid="title"
                                className="consonant-top-filters--collection-title">
                                {title}
                            </h2>
                        </If>
                        <If condition={Boolean(showTotalResults)}>
                            <div
                                data-testid="results"
                                className="consonant-top-filters--results">
                                {totalResultsHtml}
                            </div>
                        </If>
                    </div>
                </If>
            </div>
        </div>
    );
};

FiltersPanelTop.propTypes = FiltersPanelTopType;
FiltersPanelTop.defaultProps = defaultProps;

export default FiltersPanelTop;
