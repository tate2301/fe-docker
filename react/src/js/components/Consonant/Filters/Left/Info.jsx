import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useConfig } from '../../Helpers/hooks';
import { Info as MobileInfo } from './Mobile-Only/Info';
import { renderTotalResults } from '../../Helpers/rendering';

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
    const title = getConfig('collection', 'i18n.title');
    const enableFilterPanel = getConfig('filterPanel', 'enabled');
    const showTotalResults = getConfig('collection', 'showTotalResults');
    const showTotalResultsText = getConfig('collection', 'i18n.totalResultsText');
    const searchEnabled = getConfig('search', 'enabled');
    const sortEnabled = getConfig('sort', 'enabled');

    const containerClassName = classNames({
        'consonant-filters-info': true,
        'consonant-filters-info_no-filter-panel': !enableFilterPanel,
    });

    const wrapperClassName = classNames({
        'consonant-filters-info--wrapper': true,
        'consonant-filters-info--wrapper_no-line': !sortEnabled || !sortOptions.length,
    });

    const totalResultsText = renderTotalResults(showTotalResultsText, cardsQty);
    const mobileFilterBtnLabel = getConfig('filterPanel', 'i18n.leftPanel.mobile.filtersBtnLabel');

    const DESKTOP_MIN_WIDTH = 1200;
    const NOT_DESKTOP_SCREEN_SIZE = windowWidth < DESKTOP_MIN_WIDTH;

    const shouldRenderSortPopup = sortEnabled && sortOptions.length > 0;
    const shouldRenderSearch = searchEnabled && NOT_DESKTOP_SCREEN_SIZE;
    const shouldRenderMobileInfo = NOT_DESKTOP_SCREEN_SIZE && filtersQty > 0 && enabled;

    return (
        <aside
            data-testid="consonant-filters__info"
            className={containerClassName}>
            <div className="consonant-filters-info--search">
                {shouldRenderSearch && searchComponent}
            </div>
            {shouldRenderMobileInfo &&
                <MobileInfo
                    selectedFiltersQty={selectedFiltersQty}
                    mobileFilterBtnLabel={mobileFilterBtnLabel}
                    onMobileFiltersToggleClick={onMobileFiltersToggleClick} />
            }
            {shouldRenderSortPopup && sortComponent}
            <div className={wrapperClassName}>
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
                        {totalResultsText}
                    </div>
                }
            </div>
        </aside>
    );
};

/* eslint-disable-next-line import/prefer-default-export */
export { Info };

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
