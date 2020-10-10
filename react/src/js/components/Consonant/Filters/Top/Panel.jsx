import PropTypes from 'prop-types';
import React from 'react';
import { useExpandable } from '../../../../utils/hooks';
import SearchIco from '../../Search/SearchIco';
import TopFilterItem from './Item';

const TABLET_MIN_WIDTH = 768;
const SHOW_MAX_TRUNCATED_FILTERS = 3;
const MIN_FILTERS_SHOW_BG = 3;
const FiltersPanelTop = (props) => {
    const {
        filters,
        resQty,
        showTotalResults,
        showTotalResultsText,
        onCheckboxClick,
        onFilterClick,
        onClearAllFilters,
        onClearFilterItems,
        clearFilterText,
        clearAllFiltersText,
        showLimitedFiltersQty,
        onShowAllClick,
        searchEnabled,
        windowWidth,
        searchComponent,
        sortComponent,
        sortEnabled,
        sortOptions,
    } = props;

    const searchId = 'top-search';
    const [openExpandable, handleExpandableToggle] = useExpandable(searchId);

    const showSearchbar = openExpandable === searchId;

    const countSelectedInFilter = el => el.reduce((acc, val) => (val.selected ? acc + 1 : acc), 0);
    const checkFiltersSelected = () => filters.some(f => countSelectedInFilter(f.items) > 0);

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
                            {filters.map(item =>
                                (<TopFilterItem
                                    key={item.id}
                                    name={item.group}
                                    items={item.items}
                                    itemsSelected={countSelectedInFilter(item.items)}
                                    results={resQty}
                                    id={item.id}
                                    isOpened={item.opened}
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
                            (checkFiltersSelected() || filters.length >= MIN_FILTERS_SHOW_BG) &&
                            <div
                                className={
                                    filters.length === 1 ?
                                        'consonant-top-filters--clear-btn-wrapper consonant-top-filters--clear-btn-wrapper_no-bg' :
                                        'conson0ant-top-filters--clear-btn-wrapper'
                                }>
                                {checkFiltersSelected() &&
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
                    <div data-testid="top-filters__select-wrapper" className="consonant-top-filters--select-wrapper">
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
    clearFilterText: PropTypes.string.isRequired,
    clearAllFiltersText: PropTypes.string.isRequired,
    showTotalResults: PropTypes.bool,
    showTotalResultsText: PropTypes.string,
    showLimitedFiltersQty: PropTypes.bool,
    onShowAllClick: PropTypes.func.isRequired,
    searchEnabled: PropTypes.bool.isRequired,
    windowWidth: PropTypes.number.isRequired,
    searchComponent: PropTypes.node.isRequired,
    sortOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    sortEnabled: PropTypes.bool.isRequired,
    sortComponent: PropTypes.node.isRequired,
};

FiltersPanelTop.defaultProps = {
    filters: [],
    resQty: 0,
    showTotalResults: true,
    showTotalResultsText: '{} results',
    showLimitedFiltersQty: false,
};
