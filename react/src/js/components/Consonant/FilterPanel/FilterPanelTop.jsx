import React from 'react';
import PropTypes from 'prop-types';
import FilterItem from '../FilterItem';
import { render } from 'less';

const FiltersPanelTop = (props) => {
    const {
        filters,
        resQty,
        onCheckboxClick,
        onFilterClick,
        onClearFilterItems,
        clearFilterText,
        clearAllFiltersText,
        children,
    } = props;

    const renderChildren = (idx, key) => {
        if (children[idx]) return children[idx];
        return children.key === key ? children : null;
    };
    const countSelectedInFilter = el => el.reduce((acc, val) => (val.selected ? acc + 1 : acc), 0);

    console.log(children);
    console.log(clearFilterText);

    return (
        <div className="consonant-filters consonant-filters_top">
            <div className="consonant-filters--top-search-wrapper">
                {renderChildren(0, 'filtersTopSearch')}
            </div>
            <div className="consonant-filters--top-filters-wrapper">
                <div className="consonant-filters--top-filters">
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
                <div className="consonant-filters--top-filters-btn-wrapper">
                  <button type="button">{clearAllFiltersText}</button>
                </div>
            </div>
            {showTotalResults && <span className="consonant-filters--top-results-qty">{resQty}</span>}
            {renderChildren(1, 'filtersTopSearchIco')}
            {renderChildren(2, 'filtersTopSelect')}
        </div>
    );
};

export default FiltersPanelTop;

FiltersPanelTop.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.arrayOf(PropTypes.bool),
        PropTypes.element,
        PropTypes.bool,
    ]),
    filters: PropTypes.arrayOf(PropTypes.object),
    resQty: PropTypes.number,
    onCheckboxClick: PropTypes.func.isRequired,
    onFilterClick: PropTypes.func.isRequired,
    onClearFilterItems: PropTypes.func.isRequired,
    clearFilterText: PropTypes.string.isRequired,
    clearAllFiltersText: PropTypes.string.isRequired,
    showTotalResults: PropTypes.bool,
};

FiltersPanelTop.defaultProps = {
    filters: [],
    resQty: 0,
    showTotalResults: true,
    children: [],
};
