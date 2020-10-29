import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import sum from 'lodash/sum';

import ChosenFilter from './Desktop-Only/ChosenItem';
import Item from './Item';

import { Title as MobileTitle } from './Mobile-Only/Title';
import { PanelFooter as MobileFooter } from './Mobile-Only/PanelFooter';
import { Title as DesktopTitle } from './Desktop-Only/Title';
import { ClearBtn as DesktopClearBtn } from './Desktop-Only/ClearButton';

import { isAtleastOneFilterSelected } from '../../Helpers/general';
import { useConfig } from '../../Helpers/hooks';

/**
 * Left filters panel
 *
 * @component
 * @example
 * const props= {
    filters: Array,
    selectedFiltersQty: Number,
    showMobileFilters: Boolean,
    onFilterClick: Function,
    onClearAllFilters: Function,
    onClearFilterItems: Function,
    onCheckboxClick: Function,
    onMobileFiltersToggleClick: Function,
    onSelectedFilterClick: Function,
    resQty: Number,
    searchComponent: Node,
    bookmarkComponent: Node,
    windowWidth: Number,
 * }
 * return (
 *   <LeftFilterPanel {...props}/>
 * )
 */
const LeftFilterPanel = ({
    filters,
    selectedFiltersQty,
    showMobileFilters,
    onFilterClick,
    onClearAllFilters,
    onClearFilterItems,
    onCheckboxClick,
    onMobileFiltersToggleClick,
    onSelectedFilterClick,
    resQty,
    searchComponent,
    bookmarkComponent,
    windowWidth,
}) => {
    const getConfig = useConfig();

    /**
     **** Authored Configs ****
     */
    const showTotalResults = getConfig('collection', 'showTotalResults');
    const clearAllFiltersText = getConfig('filterPanel', 'i18n.leftPanel.clearAllFiltersText');
    const bookmarksEnabled = getConfig('bookmarks', 'leftFilterPanel.showBookmarksFilter');
    const searchEnabled = getConfig('search', 'enabled');
    const panelHeader = getConfig('filterPanel', 'i18n.leftPanel.header');
    const showTotalResultsText = getConfig('filterPanel', 'i18n.leftPanel.mobile.panel.totalResultsText');
    const clearFilterText = getConfig('filterPanel', 'i18n.leftPanel.mobile.panel.clearFilterText');
    const leftPanelMobileHeader = getConfig('filterPanel', 'i18n.leftPanel.mobile.panel.header');
    const applyText = getConfig('filterPanel', 'i18n.leftPanel.mobile.panel.applyBtnText');
    const doneText = getConfig('filterPanel', 'i18n.leftPanel.mobile.panel.doneBtnText');

    /**
     **** Constants ****
     */

    /**
     * Whether at least one filter is selected
     * @type {Boolean}
     */
    const atleastOneFilterSelected = isAtleastOneFilterSelected(filters);

    /**
     * Minimal viewport width to fit desktops/laptops
     * @type {Number}
     */
    const DESKTOP_MIN_WIDTH = 1200;

    /**
     * Whether the current viewport width fits desktops/laptops
     * @type {Boolean}
     */
    const DESKTOP_SCREEN_SIZE = windowWidth >= DESKTOP_MIN_WIDTH;

    /**
     * Whether the current viewport width fits tablets or mobile devices
     * @type {Boolean}
     */
    const NOT_DESKTOP_SCREEN_SIZE = windowWidth < DESKTOP_MIN_WIDTH;

    /**
     * Whether the search bar should be displayed
     * @type {Boolean}
     */
    const shouldRenderSearchComponent = windowWidth >= DESKTOP_MIN_WIDTH && searchEnabled;

    /**
     * Whether the chosen filters should be displayed
     * @type {Boolean}
     */
    const shouldRenderChosenFilters = windowWidth >= DESKTOP_MIN_WIDTH && selectedFiltersQty > 0;

    /**
     * Whether at least one filter exist
     * @type {Boolean}
     */
    const atleastOneFilter = filters.length > 0;

    /**
     * Class name for the left filters:
     * whether the left filters panel is opened or closed
     * @type {String}
     */
    const filtersClass = classNames({
        'consonant-left-filters': true,
        'consonant-left-filters_opened': showMobileFilters,
    });

    return (
        <div
            data-testid="consonant-filters__left"
            className={filtersClass}>
            <div
                className="consonant-left-filters--header">
                {NOT_DESKTOP_SCREEN_SIZE &&
                    <MobileTitle
                        onClick={onMobileFiltersToggleClick}
                        leftPanelMobileHeader={leftPanelMobileHeader} />
                }
                {DESKTOP_SCREEN_SIZE &&
                    <DesktopTitle
                        panelHeader={panelHeader} />
                }
                {DESKTOP_SCREEN_SIZE &&
                    <DesktopClearBtn
                        clearAllFiltersText={clearAllFiltersText}
                        onClearAllFilters={onClearAllFilters}
                        panelHeader={panelHeader} />
                }
            </div>
            {shouldRenderSearchComponent && searchComponent}
            {shouldRenderChosenFilters &&
                <div
                    className="consonant-left-filters--chosen-filters">
                    {filters.map(el => (
                        el.items.map(filter => (
                            filter.selected &&
                            <ChosenFilter
                                key={filter.id}
                                name={filter.label}
                                id={filter.id}
                                parentId={el.id}
                                onClick={onSelectedFilterClick} />
                        ))
                    ))}
                </div>
            }
            {bookmarksEnabled && bookmarkComponent}
            {atleastOneFilter &&
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
            }
            {NOT_DESKTOP_SCREEN_SIZE &&
                <MobileFooter
                    doneText={doneText}
                    applyText={applyText}
                    someFiltersAreSelected={atleastOneFilterSelected}
                    showTotalResultsText={showTotalResultsText}
                    onMobileFiltersToggleClick={onMobileFiltersToggleClick}
                    clearAllFiltersText={clearAllFiltersText}
                    onClearAllFilters={onClearAllFilters}
                    resQty={resQty}
                    showTotalResults={showTotalResults} />
            }
        </div>
    );
};

LeftFilterPanel.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.object),
    selectedFiltersQty: PropTypes.number,
    showMobileFilters: PropTypes.bool,
    onFilterClick: PropTypes.func.isRequired,
    onClearAllFilters: PropTypes.func.isRequired,
    onClearFilterItems: PropTypes.func.isRequired,
    onCheckboxClick: PropTypes.func.isRequired,
    onMobileFiltersToggleClick: PropTypes.func.isRequired,
    onSelectedFilterClick: PropTypes.func.isRequired,
    resQty: PropTypes.number,
    searchComponent: PropTypes.node.isRequired,
    bookmarkComponent: PropTypes.node.isRequired,
    windowWidth: PropTypes.number,
};

LeftFilterPanel.defaultProps = {
    filters: [],
    selectedFiltersQty: 0,
    showMobileFilters: false,
    resQty: 0,
    windowWidth: window.innerWidth,
};

export default LeftFilterPanel;
