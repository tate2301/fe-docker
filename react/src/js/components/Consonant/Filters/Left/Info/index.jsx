import React from 'react';
import classNames from 'classnames';

import { selector } from './utils';
import { InfoType } from './types';
import { If } from '../../../Common';
import { Info as MobileInfo } from '../Mobile-Only/Info';
import { useConfigSelector } from '../../../Helpers/hooks';
import { DESKTOP_MIN_WIDTH, defaultProps } from './constants';
import { renderTotalResults } from '../../../Helpers/rendering';

/**
 * Left filter info panel
 *
 * @component
 * @example
 * const props= {
    enabled: Boolean,
    filtersQty: Number,
    cardsQty: Number,
    selectedFiltersQty: Number,
    onMobileFiltersToggleClick: Function,
    searchComponent: Node,
    sortComponent: Node,
    sortOptions: Array,
    windowWidth: Number,
 * }
 * return (
 *   <Info {...props}/>
 * )
 */
const Info = ({
    enabled,
    cardsQty,
    filtersQty,
    sortOptions,
    windowWidth,
    sortComponent,
    searchComponent,
    selectedFiltersQty,
    onMobileFiltersToggleClick,
}) => {
    const {
        title,
        sortEnabled,
        searchEnabled,
        showTotalResults,
        totalResultsText,
        filterPanelEnabled,
        mobileFilterButtonlabel,
    } = useConfigSelector(selector);

    /**
     **** Authored Configs ****
     */

    /**
     **** Constants ****
     */

    /**
     * Total results HTML
     * @type {Array}
     */
    const totalResultsHtml = renderTotalResults(totalResultsText, cardsQty);

    /**
     * Whether the current viewport width fits tablets or mobile devices
     * @type {Boolean}
     */
    const notDesktopScreenSize = windowWidth < DESKTOP_MIN_WIDTH;

    /**
     * Whether the sort dropdown should be displayed
     * @type {Boolean}
     */
    const shouldRenderSortPopup = sortEnabled && sortOptions.length > 0;

    /**
     * Whether the search bar should be displayed
     * @type {Boolean}
     */
    const shouldRenderSearch = searchEnabled && notDesktopScreenSize;

    /**
     * Whether the left filters info block should be displayed
     * on mobile and tablet breakpoints
     * @type {Boolean}
     */
    const shouldRenderMobileInfo = notDesktopScreenSize && filtersQty > 0 && enabled;

    /**
     * Class name for the left filters info:
     * whether the left filters info block should share width with left filters panel
     * @type {String}
     */
    const containerClassName = classNames({
        'consonant-filters-info': true,
        'consonant-filters-info_no-filter-panel': !filterPanelEnabled,
    });

    /**
     * Class name for the left filters info inner wrapper:
     * whether the left filters info inner wrapper should display a vertical separator
     * after the block with the quantity of the filtered cards
     * @type {String}
     */
    const wrapperClassName = classNames({
        'consonant-filters-info--wrapper': true,
        'consonant-filters-info--wrapper_no-line': !sortEnabled || !sortOptions.length,
    });

    return (
        <aside
            data-testid="consonant-filters__info"
            className={containerClassName}>
            <div
                className="consonant-filters-info--search">
                <If condition={Boolean(shouldRenderSearch)}>
                    {searchComponent}
                </If>
            </div>
            <If condition={Boolean(shouldRenderMobileInfo)}>
                <MobileInfo
                    selectedFiltersQty={selectedFiltersQty}
                    mobileFilterBtnLabel={mobileFilterButtonlabel}
                    onMobileFiltersToggleClick={onMobileFiltersToggleClick} />
            </If>
            <If condition={Boolean(shouldRenderSortPopup)}>
                {sortComponent}
            </If>
            <div
                className={wrapperClassName}>
                <If condition={Boolean(title)}>
                    <h2
                        data-testid="title"
                        className="consonant-filters-info--title">
                        {title}
                    </h2>
                </If>
                <If condition={Boolean(showTotalResults)}>
                    <div
                        data-testid="results"
                        className="consonant-filters-info--results">
                        {totalResultsHtml}
                    </div>
                </If>
            </div>
        </aside>
    );
};

Info.propTypes = InfoType;
Info.defaultProps = defaultProps;

/* eslint-disable-next-line import/prefer-default-export */
export { Info };
