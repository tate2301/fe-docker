import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useConfig } from '../../../../utils/hooks';

const DESKTOP_MIN_WIDTH = 1200;
const FilterInfo = (props) => {
    const {
        enabled,
        filtersQty,
        cardsQty,
        selectedFiltersQty,
        windowWidth,
        onMobileFiltersToggleClick,
        searchComponent,
        sortComponent,
        sortOptions,
    } = props;

    const getConfig = useConfig();
    const title = getConfig('collection', 'i18n.title');
    const enableFilterPanel = getConfig('filterPanel', 'enabled');
    const showTotalResults = getConfig('collection', 'showTotalResults');
    const showTotalResultsText = getConfig('collection', 'i18n.totalResultsText');
    const searchEnabled = getConfig('search', 'enabled');
    const sortEnabled = getConfig('sort', 'enabled');

    const wrapperClassName = classNames(
        'consonant-filters-info--wrapper',
        {
            'consonant-filters-info--wrapper_no-line': !sortEnabled || !sortOptions.length,
        },
    );
    const containerClassName = classNames(
        'consonant-filters-info',
        {
            'consonant-filters-info_no-filter-panel': !enableFilterPanel,
        },
    );

    return (
        <aside data-testid="consonant-filters__info" className={containerClassName}>
            {windowWidth >= DESKTOP_MIN_WIDTH &&
                <div className={wrapperClassName}>
                    {title && <h2 data-testid="title" className="consonant-filters-info--title">{title}</h2>}
                    {showTotalResults && <span data-testid="results" className="consonant-filters-info--results">{showTotalResultsText.replace('{}', cardsQty)}</span>}
                </div>
            }
            <div className="consonant-filters-info--search">
                {searchEnabled && windowWidth <= DESKTOP_MIN_WIDTH && searchComponent}
            </div>
            {windowWidth < DESKTOP_MIN_WIDTH && filtersQty > 0 && enabled &&
                <div
                    data-testid="btn-wrapper"
                    className="consonant-filters-info--btn-wrapper">
                    <button
                        type="button"
                        data-testid="info-btn"
                        className={
                            selectedFiltersQty > 0 ?
                                'consonant-filters-info--btn consonant-filters-info--btn_with-filters' :
                                'consonant-filters-info--btn'
                        }
                        onClick={onMobileFiltersToggleClick}>
                        <span className="consonant-filters-info--btn-ico" />
                        <span className="consonant-filters-info--btn-text">{getConfig('filterPanel', 'i18n.leftPanel.mobile.filtersBtnLabel')}</span>
                        {
                            selectedFiltersQty > 0 &&
                            <span
                                data-testid="btn-selected"
                                className="consonant-filters-info--btn-selected">
                                {selectedFiltersQty}
                            </span>
                        }
                    </button>
                </div>
            }
            {sortEnabled && sortOptions.length > 0 && sortComponent}
        </aside>
    );
};

export default FilterInfo;

FilterInfo.propTypes = {
    enabled: PropTypes.bool.isRequired,
    filtersQty: PropTypes.number,
    cardsQty: PropTypes.number,
    selectedFiltersQty: PropTypes.number,
    windowWidth: PropTypes.number,
    onMobileFiltersToggleClick: PropTypes.func.isRequired,
    searchComponent: PropTypes.node.isRequired,
    sortComponent: PropTypes.node.isRequired,
    sortOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FilterInfo.defaultProps = {
    filtersQty: 0,
    cardsQty: 0,
    selectedFiltersQty: 0,
    windowWidth: window.innerWidth,
};
