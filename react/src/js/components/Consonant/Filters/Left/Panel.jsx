import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

const DESKTOP_MIN_WIDTH = 1200;
const LeftFilterPanel = (props) => {
    const {
        filters,
        windowWidth,
        showMobileFilters,
        showTotalResults,
        showTotalResultsText,
        onFilterClick,
        clearFilterText,
        clearAllFiltersText,
        onClearAllFilters,
        onClearFilterItems,
        onCheckboxClick,
        onMobileFiltersToggleClick,
        resQty,
        panelHeader,
        children,
    } = props;

    const countSelectedInFilter = el => el.reduce((acc, val) => (val.selected ? acc + 1 : acc), 0);
    const checkFilterSelected = () => filters.some(f => countSelectedInFilter(f.items) > 0);
    const mobileFiltersTitle = (windowWidth < DESKTOP_MIN_WIDTH &&
        <div className="consonant-left-filters--mob-title">
            <button
                type="button"
                onClick={onMobileFiltersToggleClick}
                className="consonant-left-filters--mob-back">Back
            </button>
            <span>Filter by</span>
        </div>
    );
    const desktopFiltersTitle = (windowWidth >= DESKTOP_MIN_WIDTH &&
        <h3 className="consonant-left-filters--desk-title">{panelHeader}</h3>
    );
    const desktopFiltersClearBtn = (windowWidth >= DESKTOP_MIN_WIDTH &&
        <button
            type="button"
            className="consonant-left-filters--clear-link"
            onClick={onClearAllFilters}>{clearAllFiltersText}
        </button>
    );
    const mobileFiltersFooter = (windowWidth < DESKTOP_MIN_WIDTH &&
        <div className="consonant-left-filters--mobile-footer">
            {showTotalResults &&
                <span
                    data-testid="mobile-footer-total-res"
                    className="consonant-left-filters--mobile-footer-total-res-qty">
                    {showTotalResultsText.replace('{}', resQty)}
                </span>
            }
            {
                checkFilterSelected() &&
                <button
                    type="button"
                    data-testid="mobile-footer-clear"
                    className="consonant-left-filters--mobile-footer-clear-btn"
                    onClick={onClearAllFilters}>{clearAllFiltersText}
                </button>
            }
            <button
                type="button"
                data-testid="mobile-footer-btn"
                className="consonant-left-filters--mobile-footer-btn"
                onClick={onMobileFiltersToggleClick}>
                {checkFilterSelected() ? 'Apply' : 'Done'}
            </button>
        </div>
    );

    let updatedChildren = [];
    const renderChildren = (key) => {
        const res = updatedChildren.filter(el => el.props && el.props.childrenKey === key);
        return res.length > 0 ? res : null;
    };

    if (!Array.isArray(children)) updatedChildren.push(children);
    else updatedChildren = children;

    return (
        <div
            data-testid="consonant-filters__left"
            className={showMobileFilters ? 'consonant-left-filters consonant-left-filters_opened' : 'consonant-left-filters'}>
            {
                <div className="consonant-left-filters--header">
                    {mobileFiltersTitle}
                    {desktopFiltersTitle}
                    {desktopFiltersClearBtn}
                </div>
            }
            {renderChildren('filtersSideSearch')}
            {
                filters.length > 0 &&
                <div className="consonant-left-filters--list">
                    {filters.map(item =>
                        (<Item
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
            {renderChildren('filtersSideBookmarks')}
            {mobileFiltersFooter}
        </div>
    );
};

export default LeftFilterPanel;

LeftFilterPanel.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.element])),
        PropTypes.element,
        PropTypes.bool,
    ]),
    filters: PropTypes.arrayOf(PropTypes.object),
    windowWidth: PropTypes.number,
    showMobileFilters: PropTypes.bool,
    showTotalResults: PropTypes.bool,
    showTotalResultsText: PropTypes.string,
    onFilterClick: PropTypes.func.isRequired,
    clearFilterText: PropTypes.string.isRequired,
    clearAllFiltersText: PropTypes.string.isRequired,
    onClearAllFilters: PropTypes.func.isRequired,
    onClearFilterItems: PropTypes.func.isRequired,
    onCheckboxClick: PropTypes.func.isRequired,
    onMobileFiltersToggleClick: PropTypes.func.isRequired,
    resQty: PropTypes.number,
    panelHeader: PropTypes.string,
};

LeftFilterPanel.defaultProps = {
    filters: [],
    windowWidth: window.innerWidth,
    showMobileFilters: false,
    showTotalResults: true,
    showTotalResultsText: '{} results',
    resQty: 0,
    children: [],
    panelHeader: 'Refine the results',
};
