import React, { Fragment } from 'react';
import classNames from 'classnames';

import { selector } from './utils';
import { If } from '../../../Common';
import FilterList from './FilterList';
import { LeftFilterPanelType } from './types';
import ChoosenFilters from './ChoosenFilters';
import { useConfigSelector } from '../../../Helpers/hooks';
import { Title as MobileTitle } from '../Mobile-Only/Title';
import { DESKTOP_MIN_WIDTH, defaultProps } from './constants';
import { Title as DesktopTitle } from '../Desktop-Only/Title';
import { isAtleastOneFilterSelected } from '../../../Helpers/general';
import { PanelFooter as MobileFooter } from '../Mobile-Only/PanelFooter';
import { ClearBtn as DesktopClearBtn } from '../Desktop-Only/ClearButton';

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
    resQty,
    filters,
    windowWidth,
    onFilterClick,
    searchComponent,
    onCheckboxClick,
    bookmarkComponent,
    showMobileFilters,
    onClearAllFilters,
    onClearFilterItems,
    selectedFiltersQty,
    onSelectedFilterClick,
    onMobileFiltersToggleClick,
}) => {
    /**
     **** Authored Configs ****
     */

    const {
        doneText,
        applyText,
        panelHeader,
        searchEnabled,
        clearFilterText,
        bookmarksEnabled,
        showTotalResults,
        clearAllFiltersText,
        showTotalResultsText,
        leftPanelMobileHeader,
    } = useConfigSelector(selector);

    /**
     **** Constants ****
     */

    /**
     * Whether at least one filter is selected
     * @type {Boolean}
     */
    const atleastOneFilterSelected = isAtleastOneFilterSelected(filters);

    /**
     * Whether the current viewport width fits desktops/laptops
     * @type {Boolean}
     */
    const DESKTOP_SCREEN_SIZE = windowWidth >= DESKTOP_MIN_WIDTH;

    /**
     * Whether the current viewport width fits tablets or mobile devices
     * @type {Boolean}
     */
    const notDesktopScreenSize = windowWidth < DESKTOP_MIN_WIDTH;

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
                <If condition={Boolean(notDesktopScreenSize)}>
                    <MobileTitle
                        onClick={onMobileFiltersToggleClick}
                        leftPanelMobileHeader={leftPanelMobileHeader} />

                </If>
                <If condition={Boolean(DESKTOP_SCREEN_SIZE)}>
                    <Fragment>
                        <DesktopTitle panelHeader={panelHeader} />
                        <DesktopClearBtn
                            panelHeader={panelHeader}
                            clearAllFiltersText={clearAllFiltersText}
                            onClearAllFilters={onClearAllFilters} />
                    </Fragment>
                </If>
            </div>
            <If condition={Boolean(shouldRenderSearchComponent)}>
                {searchComponent}
            </If>
            <If condition={Boolean(shouldRenderChosenFilters)}>
                <ChoosenFilters filters={filters} onClick={onSelectedFilterClick} />
            </If>
            <If condition={Boolean(bookmarksEnabled)}>
                {bookmarkComponent}
            </If>
            <If condition={Boolean(atleastOneFilter)}>
                <FilterList
                    resQty={resQty}
                    filters={filters}
                    onFilterClick={onFilterClick}
                    onCheckboxClick={onCheckboxClick}
                    clearFilterText={clearFilterText}
                    onClearFilterItems={onClearFilterItems} />
            </If>
            <If condition={Boolean(notDesktopScreenSize)}>
                <MobileFooter
                    resQty={resQty}
                    doneText={doneText}
                    applyText={applyText}
                    showTotalResults={showTotalResults}
                    onClearAllFilters={onClearAllFilters}
                    clearAllFiltersText={clearAllFiltersText}
                    showTotalResultsText={showTotalResultsText}
                    someFiltersAreSelected={atleastOneFilterSelected}
                    onMobileFiltersToggleClick={onMobileFiltersToggleClick} />
            </If>
        </div>
    );
};

LeftFilterPanel.propTypes = LeftFilterPanelType;
LeftFilterPanel.defaultProps = defaultProps;

export default LeftFilterPanel;
