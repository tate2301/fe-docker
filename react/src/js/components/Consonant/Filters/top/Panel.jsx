import React from 'react';
import PropTypes from 'prop-types';
import TopFilterItem from './Item';

const TABLET_MIN_WIDTH = 768;
const SHOW_MAX_TRUNCATED_FILTERS = 3;
const FiltersPanelTop = (props) => {
    const {
        filters,
        resQty,
        showTotalResults,
        showSearchbar,
        onCheckboxClick,
        onFilterClick,
        onClearAllFilters,
        onClearFilterItems,
        clearFilterText,
        clearAllFiltersText,
        children,
        showLimitedFiltersQty,
        onShowAllClick,
    } = props;

    let updatedChildren = [];
    const renderChildren = (key) => {
        const res = updatedChildren.filter(el => el.key === key);

        return res.length > 0 ? res : null;
    };
    const countSelectedInFilter = el => el.reduce((acc, val) => (val.selected ? acc + 1 : acc), 0);
    const checkFiltersSelected = () => filters.some(f => countSelectedInFilter(f.items) > 0);

    if (!Array.isArray(children)) updatedChildren.push(children);
    else updatedChildren = children;

    return (
        <div className="consonant-top-filters">
            {
                updatedChildren.some(el => el.key === 'filtersTopSearch') &&
                window.innerWidth < TABLET_MIN_WIDTH &&
                    <div className="consonant-top-filters--search-wrapper">
                        {renderChildren('filtersTopSearch')}
                    </div>
            }
            <div className="consonant-top-filters--inner">
                {filters.length > 0 &&
                    <div className="consonant-top-filters--filters-wrapper">
                        {window.innerWidth >= TABLET_MIN_WIDTH &&
                            <strong className="consonant-top-filters--title">Filters:</strong>
                        }
                        <div className={
                            showLimitedFiltersQty ?
                                'consonant-top-filters--filters consonant-top-filters--filters_truncated' :
                                'consonant-top-filters--filters'
                        }>
                            {filters.map(item =>
                                (<TopFilterItem
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
                                    clearFilterText={clearFilterText}
                                    isTopFilter />))
                            }
                            {
                                filters.length > SHOW_MAX_TRUNCATED_FILTERS &&
                                window.innerWidth >= TABLET_MIN_WIDTH &&
                                <button
                                    type="button"
                                    className="consonant-top-filters--more-btn"
                                    onClick={onShowAllClick}>
                                    {showLimitedFiltersQty ? 'more filters +' : 'hide -'}
                                </button>
                            }
                        </div>
                        <div className="consonant-top-filters--clear-btn-wrapper">
                            {checkFiltersSelected() &&
                            <button
                                type="button"
                                className="consonant-top-filters--clear-btn"
                                onClick={onClearAllFilters}>{clearAllFiltersText}
                            </button>
                            }
                        </div>
                    </div>
                }
                {window.innerWidth >= TABLET_MIN_WIDTH && showTotalResults &&
                    <span className="consonant-top-filters--res-qty">
                        <strong>{resQty} </strong>results
                    </span>
                }
                {
                    updatedChildren.some(el => el.key === 'filtersTopSearchIco') &&
                    window.innerWidth >= TABLET_MIN_WIDTH &&
                        <div className="consonant-top-filters--search-ico-wrapper">
                            {showSearchbar && renderChildren('filtersTopSearch')}
                            {renderChildren('filtersTopSearchIco')}
                        </div>
                }
                {updatedChildren.some(el => el.key === 'filtersTopSelect') &&
                    <div className="consonant-top-filters--select-wrapper">
                        {renderChildren('filtersTopSelect')}
                    </div>
                }
            </div>
        </div>
    );
};

export default FiltersPanelTop;

FiltersPanelTop.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.element])),
        PropTypes.element,
        PropTypes.bool,
    ]),
    filters: PropTypes.arrayOf(PropTypes.object),
    resQty: PropTypes.number,
    onCheckboxClick: PropTypes.func.isRequired,
    onFilterClick: PropTypes.func.isRequired,
    onClearAllFilters: PropTypes.func.isRequired,
    onClearFilterItems: PropTypes.func.isRequired,
    clearFilterText: PropTypes.string.isRequired,
    clearAllFiltersText: PropTypes.string.isRequired,
    showTotalResults: PropTypes.bool,
    showSearchbar: PropTypes.bool,
    showLimitedFiltersQty: PropTypes.bool,
    onShowAllClick: PropTypes.func.isRequired,
};

FiltersPanelTop.defaultProps = {
    filters: [],
    resQty: 0,
    showTotalResults: true,
    showSearchbar: false,
    children: [],
    showLimitedFiltersQty: false,
};
