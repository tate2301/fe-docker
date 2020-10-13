import PropTypes from 'prop-types';
import sum from 'lodash/sum';
import React, { useMemo } from 'react';
import { chainFromIterable } from '../../../../utils/general';
import { useConfig } from '../../../../utils/hooks';
import Item from './Item';

const DESKTOP_MIN_WIDTH = 1200;
const LeftFilterPanel = ({
    filters,
    windowWidth,
    showMobileFilters,
    onFilterClick,
    onClearAllFilters,
    onClearFilterItems,
    onCheckboxClick,
    onMobileFiltersToggleClick,
    resQty,
    panelHeader,
    searchComponent,
    bookmarkComponent,
}) => {
    const getConfig = useConfig();

    const showTotalResults = getConfig('collection', 'showTotalResults');
    const showTotalResultsText = getConfig('collection', 'i18n.totalResultsText');
    const clearFilterText = getConfig('filterPanel', 'clearFilterText');
    const clearAllFiltersText = getConfig('filterPanel', 'clearAllFiltersText');
    const bookmarksEnabled = getConfig('bookmarks', 'enabled');
    const searchEnabled = getConfig('search', 'enabled');

    const someFiltersAreSelected = useMemo(
        () =>
            chainFromIterable(filters.map(f => f.items))
                .some(item => item.selected),
        [filters],
    );

    const mobileFiltersTitle = windowWidth < DESKTOP_MIN_WIDTH && (
        <div className="consonant-left-filters--mob-title">
            <button
                type="button"
                onClick={onMobileFiltersToggleClick}
                className="consonant-left-filters--mob-back">
                Back
            </button>
            <span>Filter by</span>
        </div>
    );
    const desktopFiltersTitle = windowWidth >= DESKTOP_MIN_WIDTH && (
        <h3 className="consonant-left-filters--desk-title">{panelHeader}</h3>
    );
    const desktopFiltersClearBtn = windowWidth >= DESKTOP_MIN_WIDTH && (
        <button
            type="button"
            data-testid="left-filter-panel-clear-all-btn"
            className="consonant-left-filters--clear-link"
            onClick={onClearAllFilters}
            tabIndex="0">{clearAllFiltersText}
        </button>
    );

    const mobileFiltersFooter = windowWidth < DESKTOP_MIN_WIDTH && (
        <div className="consonant-left-filters--mobile-footer">
            {showTotalResults && (
                <span
                    data-testid="mobile-footer-total-res"
                    className="consonant-left-filters--mobile-footer-total-res-qty">
                    {showTotalResultsText.replace('{}', resQty)}
                </span>
            )}
            {someFiltersAreSelected && (
                <button
                    type="button"
                    data-testid="mobile-footer-clear"
                    className="consonant-left-filters--mobile-footer-clear-btn"
                    onClick={onClearAllFilters}>
                    {clearAllFiltersText}
                </button>
            )}
            <button
                type="button"
                data-testid="mobile-footer-btn"
                className="consonant-left-filters--mobile-footer-btn"
                onClick={onMobileFiltersToggleClick}>
                {someFiltersAreSelected ? 'Apply' : 'Done'}
            </button>
        </div>
    );

    return (
        <div
            data-testid="consonant-filters__left"
            className={showMobileFilters ? 'consonant-left-filters consonant-left-filters_opened' : 'consonant-left-filters'}>
            <div className="consonant-left-filters--header">
                {mobileFiltersTitle}
                {desktopFiltersTitle}
                {desktopFiltersClearBtn}
            </div>
            {windowWidth >= DESKTOP_MIN_WIDTH && searchEnabled && searchComponent}
            {bookmarksEnabled && bookmarkComponent}
            {filters.length > 0 && (
                <div className="consonant-left-filters--list">
                    {filters.map(filter => (
                        <Item
                            key={filter.id}
                            name={filter.group}
                            icon={filter.icon}
                            items={filter.items}
                            numItemsSelected={sum(filter.items.map(i => i.selected))}
                            results={resQty}
                            id={filter.id}
                            isOpened={filter.opened}
                            onCheck={onCheckboxClick}
                            onClick={onFilterClick}
                            onClearAll={onClearFilterItems}
                            clearFilterText={clearFilterText} />
                    ))}
                </div>
            )}
            {mobileFiltersFooter}
        </div>
    );
};

export default LeftFilterPanel;

LeftFilterPanel.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.object),
    windowWidth: PropTypes.number,
    showMobileFilters: PropTypes.bool,
    onFilterClick: PropTypes.func.isRequired,
    onClearAllFilters: PropTypes.func.isRequired,
    onClearFilterItems: PropTypes.func.isRequired,
    onCheckboxClick: PropTypes.func.isRequired,
    onMobileFiltersToggleClick: PropTypes.func.isRequired,
    resQty: PropTypes.number,
    panelHeader: PropTypes.string,
    searchComponent: PropTypes.node.isRequired,
    bookmarkComponent: PropTypes.node.isRequired,
};

LeftFilterPanel.defaultProps = {
    filters: [],
    windowWidth: window.innerWidth,
    showMobileFilters: false,
    resQty: 0,
    panelHeader: 'Refine the results',
};
