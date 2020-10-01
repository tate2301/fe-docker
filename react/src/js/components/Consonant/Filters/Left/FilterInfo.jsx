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
        children,
    } = props;

    let updatedChildren = [];
    const renderChildren = (key) => {
        const res = updatedChildren.filter(el => el.props && el.props.childrenKey === key);

        return res.length > 0 ? res : null;
    };

    if (!Array.isArray(children)) updatedChildren.push(children);
    else updatedChildren = children;

    return (
        <aside data-testid="consonant-filters__info" className="consonant-filters-info">
            {windowWidth >= DESKTOP_MIN_WIDTH &&
                <div className={
                    renderChildren('selectFiltersInfo') ?
                        'consonant-filters-info--wrapper' :
                        'consonant-filters-info--wrapper consonant-filters-info--wrapper_no-line'
                }>
                    {title && <h2 data-testid="title" className="consonant-filters-info--title">{title}</h2>}
                    {showTotalResults && <span data-testid="results" className="consonant-filters-info--results">{showTotalResultsText.replace('{}', cardsQty)}</span>}
                </div>
            }
            <div className="consonant-filters-info--search">
                {renderChildren('searchFiltersInfo')}
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
            {renderChildren('selectFiltersInfo')}
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
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.element])),
        PropTypes.element,
        PropTypes.bool,
    ]),
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
