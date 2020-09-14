import React from 'react';
import PropTypes from 'prop-types';
import SelectedFilter from './SelectedFilter';

const DESKTOP_MIN_WIDTH = 1200;
const FiltersInfo = (props) => {
    const {
        enabled,
        title,
        filters,
        cardsQty,
        showTotalResults,
        selectedFiltersQty,
        windowWidth,
        onSelectedFilterClick,
        onMobileFiltersToggleClick,
        children,
    } = props;

    const renderChildren = (idx, key) => {
        if (children[idx]) return children[idx];
        return children.key === key ? children : null;
    };

    return (
        <aside className="consonant-filters-info">
            {windowWidth >= DESKTOP_MIN_WIDTH &&
                <div className="consonant-filters-info--wrapper">
                    {title && <h2 className="consonant-filters-info--title">{title}</h2>}
                    {showTotalResults && <span className="consonant-filters-info--results">{cardsQty} results</span>}
                </div>
            }
            <div className="consonant-filters-info--search">
                {renderChildren(0, 'searchFilterPanel')}
            </div>
            {windowWidth < DESKTOP_MIN_WIDTH && filters.length > 0 && enabled &&
                <div className="consonant-filters-info--btn-wrapper">
                    <button
                        type="button"
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
                            <span className="consonant-filters-info--btn-selected">
                                {selectedFiltersQty}
                            </span>
                        }
                    </button>
                </div>
            }
            {renderChildren(1, 'select')}
            {windowWidth >= DESKTOP_MIN_WIDTH && selectedFiltersQty > 0 &&
                <div
                    className="consonant-filters--selected-filters">
                    {filters.map(el => (
                        el.items.map(filter => (
                            filter.selected &&
                            <SelectedFilter
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

export default FiltersInfo;

FiltersInfo.propTypes = {
    enabled: PropTypes.bool.isRequired,
    title: PropTypes.string,
    filters: PropTypes.arrayOf(PropTypes.object),
    cardsQty: PropTypes.number,
    showTotalResults: PropTypes.bool.isRequired,
    selectedFiltersQty: PropTypes.number,
    windowWidth: PropTypes.number,
    onMobileFiltersToggleClick: PropTypes.func.isRequired,
    onSelectedFilterClick: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.arrayOf(PropTypes.bool),
        PropTypes.element,
        PropTypes.bool,
    ]),
};

FiltersInfo.defaultProps = {
    title: '',
    filters: [],
    cardsQty: 0,
    selectedFiltersQty: 0,
    windowWidth: window.innerWidth,
    children: [],
};
