import React from 'react';
import PropTypes from 'prop-types';
import ChosenFilter from './ChosenItem';

const DESKTOP_MIN_WIDTH = 1200;
const FilterInfo = (props) => {
    const {
        enabled,
        title,
        filters,
        cardsQty,
        showTotalResults,
        showTotalResultsText,
        selectedFiltersQty,
        windowWidth,
        onSelectedFilterClick,
        onMobileFiltersToggleClick,
        searchComponent,
        searchEnabled,
        sortComponent,
        sortEnabled,
        sortOptions,
    } = props;


    return (
        <aside data-testid="consonant-filters__info" className="consonant-filters-info">
            {windowWidth >= DESKTOP_MIN_WIDTH &&
                <div className={
                    (sortEnabled && sortOptions.length) ?
                        'consonant-filters-info--wrapper' :
                        'consonant-filters-info--wrapper consonant-filters-info--wrapper_no-line'
                }>
                    {title && <h2 data-testid="title" className="consonant-filters-info--title">{title}</h2>}
                    {showTotalResults && <span data-testid="results" className="consonant-filters-info--results">{showTotalResultsText.replace('{}', cardsQty)}</span>}
                </div>
            }
            <div className="consonant-filters-info--search">
                {searchEnabled && windowWidth <= DESKTOP_MIN_WIDTH && searchComponent}
            </div>
            {windowWidth < DESKTOP_MIN_WIDTH && filters.length > 0 && enabled &&
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
                        <span className="consonant-filters-info--btn-text">filters</span>
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
            {sortEnabled && sortOptions.length && sortComponent}
            {windowWidth >= DESKTOP_MIN_WIDTH && selectedFiltersQty > 0 &&
                <div
                    data-testid="selected-filters"
                    className="consonant-filters-info--selected-filters">
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
        </aside>
    );
};

export default FilterInfo;

FilterInfo.propTypes = {
    enabled: PropTypes.bool.isRequired,
    title: PropTypes.string,
    filters: PropTypes.arrayOf(PropTypes.object),
    cardsQty: PropTypes.number,
    showTotalResults: PropTypes.bool,
    showTotalResultsText: PropTypes.string,
    selectedFiltersQty: PropTypes.number,
    windowWidth: PropTypes.number,
    onMobileFiltersToggleClick: PropTypes.func.isRequired,
    onSelectedFilterClick: PropTypes.func.isRequired,
    searchComponent: PropTypes.node.isRequired,
    searchEnabled: PropTypes.bool.isRequired,
    sortComponent: PropTypes.node.isRequired,
    sortEnabled: PropTypes.bool.isRequired,
    sortOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FilterInfo.defaultProps = {
    title: '',
    filters: [],
    cardsQty: 0,
    selectedFiltersQty: 0,
    windowWidth: window.innerWidth,
    children: [],
    showTotalResults: true,
    showTotalResultsText: '{} results',
};
