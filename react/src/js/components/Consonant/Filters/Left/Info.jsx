import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Info as MobileInfo } from './Mobile-Only/Info';
import { renderTotalResults } from '../../Helpers/rendering';

import { useConfig } from '../../Helpers/hooks';

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
const Info = (props) => {
    const {
        enabled,
        filtersQty,
        cardsQty,
        selectedFiltersQty,
        onMobileFiltersToggleClick,
        searchComponent,
        sortComponent,
        sortOptions,
        windowWidth,
    } = props;

    const getConfig = useConfig();

    /**
     **** Authored Configs ****
     */
    const title = getConfig('collection', 'i18n.title');
    const enableFilterPanel = getConfig('filterPanel', 'enabled');
    const showTotalResults = getConfig('collection', 'showTotalResults');
    const showTotalResultsText = getConfig('collection', 'i18n.totalResultsText');
    const searchEnabled = getConfig('search', 'enabled');
    const sortEnabled = getConfig('sort', 'enabled');
    const mobileFilterBtnLabel = getConfig('filterPanel', 'i18n.leftPanel.mobile.filtersBtnLabel');

    /**
     **** Constants ****
     */

    /**
     * Total results HTML
     * @type {Array}
     */
    const totalResultsHtml = renderTotalResults(showTotalResultsText, cardsQty);

    /**
     * Minimal viewport width to fit desktops/laptops
     * @type {Number}
     */
    const DESKTOP_MIN_WIDTH = 1200;

    /**
     * Whether the current viewport width fits tablets or mobile devices
     * @type {Boolean}
     */
    const NOT_DESKTOP_SCREEN_SIZE = windowWidth < DESKTOP_MIN_WIDTH;

    /**
     * Whether the sort dropdown should be displayed
     * @type {Boolean}
     */
    const shouldRenderSortPopup = sortEnabled && sortOptions.length > 0;

    /**
     * Whether the search bar should be displayed
     * @type {Boolean}
     */
    const shouldRenderSearch = searchEnabled && NOT_DESKTOP_SCREEN_SIZE;

    /**
     * Whether the left filters info block should be displayed
     * on mobile and tablet breakpoints
     * @type {Boolean}
     */
    const shouldRenderMobileInfo = NOT_DESKTOP_SCREEN_SIZE && filtersQty > 0 && enabled;

    /**
     * Class name for the left filters info:
     * whether the left filters info block should share width with left filters panel
     * @type {String}
     */
    const containerClassName = classNames({
        'consonant-filters-info': true,
        'consonant-filters-info_no-filter-panel': !enableFilterPanel,
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
                {shouldRenderSearch && searchComponent}
            </div>
            {shouldRenderMobileInfo &&
                <MobileInfo
                    selectedFiltersQty={selectedFiltersQty}
                    mobileFilterBtnLabel={mobileFilterBtnLabel}
                    onMobileFiltersToggleClick={onMobileFiltersToggleClick} />
            }
            {shouldRenderSortPopup && sortComponent}
            <div
                className={wrapperClassName}>
                {title &&
                    <h2
                        data-testid="title"
                        className="consonant-filters-info--title">
                        {title}
                    </h2>
                }
                {showTotalResults &&
                    <div
                        data-testid="results"
                        className="consonant-filters-info--results">
                        {totalResultsHtml}
                    </div>
                }
            </div>
        </aside>
    );
};

Info.propTypes = {
    enabled: PropTypes.bool.isRequired,
    filtersQty: PropTypes.number,
    cardsQty: PropTypes.number,
    selectedFiltersQty: PropTypes.number,
    onMobileFiltersToggleClick: PropTypes.func.isRequired,
    searchComponent: PropTypes.node.isRequired,
    sortComponent: PropTypes.node.isRequired,
    sortOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    windowWidth: PropTypes.number,
};

Info.defaultProps = {
    filtersQty: 0,
    cardsQty: 0,
    selectedFiltersQty: 0,
    windowWidth: window.innerWidth,
};

export { Info };
