import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { chainFromIterable } from '../../../../utils/general';
import { useConfig, useExpandable } from '../../../../utils/hooks';
import SearchIco from '../../Search/SearchIco';
import TopFilterItem from './Item';

const TABLET_MIN_WIDTH = 768;
const SHOW_MAX_TRUNCATED_FILTERS = 3;
const MIN_FILTERS_SHOW_BG = 3;
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
}) => {
    const getConfig = useConfig();

    const searchEnabled = getConfig('search', 'enabled');
    const clearFilterText = getConfig('filterPanel', 'clearFilterText');
    const clearAllFiltersText = getConfig('filterPanel', 'clearAllFiltersText');
    const showTotalResults = getConfig('collection', 'displayTotalResults');
    const showTotalResultsText = getConfig('collection', 'totalResultsText');
    const sortEnabled = getConfig('sort', 'enabled');
    const sortOptions = getConfig('sort', 'options');

    const searchId = 'top-search';
    const [openExpandable, handleExpandableToggle] = useExpandable(searchId);


    const showSearchbar = openExpandable === searchId;

    const someFiltersAreSelected = useMemo(
        () =>
            chainFromIterable(filters.map(f => f.items))
                .some(item => item.selected),
        [filters],
    );

    return (
        <div data-testid="consonant-filters__top" className="consonant-top-filters">
            {searchComponent && windowWidth < TABLET_MIN_WIDTH && (
                <div data-testid="top-filters__search-wrapper" className="consonant-top-filters--search-wrapper">
                    {searchComponent}
                </div>
            )}
            <div
                className="consonant-top-filters--inner">
                {filters.length &&
                    <div className="consonant-top-filters--filters-wrapper">
                        {windowWidth >= TABLET_MIN_WIDTH &&
                            <strong className="consonant-top-filters--title">Filters:</strong>
                        }
                        <div
                            data-testid="consonant-filters__top__filters"
                            className={
                                showLimitedFiltersQty ?
                                    'consonant-top-filters--filters consonant-top-filters--filters_truncated' :
                                    'consonant-top-filters--filters'
                            }>
                            {filters.map(filter =>
                                (<TopFilterItem
                                    key={filter.id}
                                    name={filter.group}
                                    items={filter.items}
                                    numItemsSelected={_.sum(filter.items.map(i => i.selected))}
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
                                filters.length > SHOW_MAX_TRUNCATED_FILTERS &&
                                windowWidth >= TABLET_MIN_WIDTH &&
                                showLimitedFiltersQty &&
                                <button
                                    type="button"
                                    data-testid="top-filter__more-button"
                                    className="consonant-top-filters--more-btn"
                                    onClick={onShowAllClick}>more filters +
                                </button>
                            }
                        </div>
                        {
                            (someFiltersAreSelected || filters.length >= MIN_FILTERS_SHOW_BG) &&
                            <div
                                className={
                                    filters.length === 1 ?
                                        'consonant-top-filters--clear-btn-wrapper consonant-top-filters--clear-btn-wrapper_no-bg' :
                                        'conson0ant-top-filters--clear-btn-wrapper'
                                }>
                                {someFiltersAreSelected &&
                                    <button
                                        type="button"
                                        data-testid="top-filter__clear-button"
                                        className="consonant-top-filters--clear-btn"
                                        onClick={onClearAllFilters}
                                        tabIndex="0">{clearAllFiltersText}
                                    </button>
                                }
                            </div>
                        }
                    </div>
                }
                {windowWidth >= TABLET_MIN_WIDTH && showTotalResults &&
                    <span
                        data-testid="filter-top-result-count"
                        className="consonant-top-filters--res-qty">
                        <strong>{showTotalResultsText.replace('{}', resQty)}</strong>
                    </span>
                }
                {searchEnabled && windowWidth >= TABLET_MIN_WIDTH && (
                    <div data-testid="filter-top-ico-wrapper" className="consonant-top-filters--search-ico-wrapper">
                        {showSearchbar && searchComponent}
                        {windowWidth >= TABLET_MIN_WIDTH && (
                            <SearchIco
                                childrenKey="filtersTopSearchIco"
                                onClick={handleExpandableToggle} />
                        )}
                    </div>
                )}
                {sortEnabled && sortOptions.length &&
                    <div data-testid="top-filters__sort-popup" className="consonant-top-filters--select-wrapper">
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
    sortComponent: PropTypes.node.isRequired,
};

FiltersPanelTop.defaultProps = {
    filters: [],
    resQty: 0,
    showLimitedFiltersQty: false,
};
