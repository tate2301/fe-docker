import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useConfig } from '../../../../utils/hooks';
import { Info as DesktopInfo } from './Desktop-Only/Info';
import { Info as MobileInfo } from './Mobile-Only/Info';

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

    const totalResultsText = showTotalResultsText.replace('{}', cardsQty);

    const mobileFilterBtnLabel = getConfig('filterPanel', 'i18n.leftPanel.mobile.filtersBtnLabel');

    const DESKTOP_MIN_WIDTH = 1200;
    const DESKTOP_SCREEN_SIZE = windowWidth >= DESKTOP_MIN_WIDTH;
    const NOT_DESKTOP_SCREEN_SIZE = windowWidth < DESKTOP_MIN_WIDTH;

    return (
        <aside
            data-testid="consonant-filters__info"
            className={containerClassName}>
            {DESKTOP_SCREEN_SIZE &&
                <DesktopInfo
                    showTotalResults={showTotalResults}
                    sortOptions={sortOptions}
                    sortEnabled={sortEnabled}
                    title={title}
                    totalResultsText={totalResultsText} />
            }
            <div className="consonant-filters-info--search">
                {searchEnabled && NOT_DESKTOP_SCREEN_SIZE && searchComponent}
            </div>
            {NOT_DESKTOP_SCREEN_SIZE && filtersQty > 0 && enabled &&
                <MobileInfo
                    selectedFiltersQty={selectedFiltersQty}
                    mobileFilterBtnLabel={mobileFilterBtnLabel}
                    onMobileFiltersToggleClick={onMobileFiltersToggleClick} />
            }
            {sortEnabled && sortOptions.length > 0 && sortComponent}
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
