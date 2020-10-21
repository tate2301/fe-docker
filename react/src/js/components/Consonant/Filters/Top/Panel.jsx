import PropTypes from 'prop-types';
import classNames from 'classnames';
import sum from 'lodash/sum';
import React from 'react';
import { isAtleastOneFilterSelected } from '../../../../utils/general';
import { useConfig, useExpandable } from '../../../../utils/hooks';
import SearchIcon from '../../Search/SearchIcon';
import { Group as TopFilterItem } from './Group';
import {
    TABLET_MIN_WIDTH,
    MAX_TRUNCATED_FILTERS,
    MIN_FILTERS_SHOW_BG,
} from '../../../../utils/constants';

const FiltersPanelTop = ({
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
}) => {
    const getConfig = useConfig();

    const searchEnabled = getConfig('search', 'enabled');
    const clearFilterText = getConfig('filterPanel', 'i18n.topPanel.mobile.group.clearFilterText');
    const clearAllFiltersText = getConfig('filterPanel', 'i18n.topPanel.clearAllFiltersText');
    const showTotalResults = getConfig('collection', 'showTotalResults');
    const showTotalResultsText = getConfig('collection', 'i18n.totalResultsText');
    const sortEnabled = getConfig('sort', 'enabled');
    const sortOptions = getConfig('sort', 'options');
    const filterGroupLabel = getConfig('filterPanel', 'i18n.topPanel.groupLabel');
    const moreFiltersBtnText = getConfig('filterPanel', 'i18n.topPanel.moreFiltersBtnText');

    const searchId = 'top-search';
    const [openExpandable, handleExpandableToggle] = useExpandable(searchId);

    const showSearchbar = openExpandable === searchId;

    const atleastOneFilterSelected = isAtleastOneFilterSelected(filters);

    const TABLET_OR_MOBILE_SCREEN_SIZE = windowWidth < TABLET_MIN_WIDTH;
    const TABLET_OR_DESKTOP_SCREEN_SIZE = windowWidth >= TABLET_MIN_WIDTH;

    const shouldHideSomeFilters = filters.length > MAX_TRUNCATED_FILTERS;
    const shouldDisplaySortComponent = sortEnabled && sortOptions.length > 0;
    const shouldDisplayFilters = filters.length > 0 && filterPanelEnabled;
    const shouldDisplayMoreFiltersBtn =
        shouldHideSomeFilters && TABLET_OR_DESKTOP_SCREEN_SIZE && showLimitedFiltersQty;
    const shouldShowTotalResults = TABLET_OR_DESKTOP_SCREEN_SIZE && showTotalResults;

    const showLimitedFiltersQtyClass = classNames({
        'consonant-top-filters--filters': true,
        'consonant-top-filters--filters_truncated': showLimitedFiltersQty,
    });

    const totalResultsText = showTotalResultsText.replace('{total}', resQty);

    const clearBtnWrapperClass = classNames({
        'consonant-top-filters--clear-btn-wrapper': true,
        'consonant-top-filters--clear-btn-wrapper_no-bg': filters.length === 1,
    });

    return (
        <div
            data-testid="consonant-filters__top"
            className="consonant-top-filters">
            {searchComponent && TABLET_OR_MOBILE_SCREEN_SIZE && (
                <div
                    data-testid="top-filters__search-wrapper"
                    className="consonant-top-filters--search-wrapper">
                    {searchComponent}
                </div>
            )}
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
                            {
                                shouldDisplayMoreFiltersBtn &&
                                <button
                                    type="button"
                                    data-testid="top-filter__more-button"
                                    className="consonant-top-filters--more-btn"
                                    onClick={onShowAllClick}>
                                    {moreFiltersBtnText}
                                </button>
                            }
                        </div>
                        {
                            (atleastOneFilterSelected || filters.length >= MIN_FILTERS_SHOW_BG) &&
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
                {shouldShowTotalResults &&
                    <span
                        data-testid="filter-top-result-count"
                        className="consonant-top-filters--res-qty">
                        <strong>
                            {totalResultsText}
                        </strong>
                    </span>
                }
                {searchEnabled && TABLET_OR_DESKTOP_SCREEN_SIZE && (
                    <div
                        data-testid="filter-top-ico-wrapper"
                        className="consonant-top-filters--search-ico-wrapper">
                        {showSearchbar && searchComponent}
                        {TABLET_OR_DESKTOP_SCREEN_SIZE && (
                            <SearchIcon
                                onClick={handleExpandableToggle} />
                        )}
                    </div>
                )}
                {shouldDisplaySortComponent &&
                    <div
                        data-testid="top-filters__sort-popup"
                        className="consonant-top-filters--select-wrapper">
                        {sortComponent}
                    </div>
                }
            </div>
        </div>
    );
};

export default FiltersPanelTop;

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
