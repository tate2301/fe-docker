import React from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
import Select from './Select';
import SelectedFilter from './SelectedFilter';
import Loader from './Loader';

const DESKTOP_MIN_WIDTH = 1200;

const FiltersInfo = (props) => {
    const {
        filters,
        cardsQty,
        selectedFiltersQty,
        windowWidth,
        selelectedFilterBy,
        selectValues,
        onSelect,
        onSearch,
        onSelectedFilterClick,
        onMobileFiltersToggleClick,
    } = props;
    const mobileAsideInfoSearch = (windowWidth < DESKTOP_MIN_WIDTH &&
    <div className="consonant-filters-info--search">
        <Search
            itemsQty={cardsQty}
            onSearch={onSearch} />
    </div>
    );
    const mobileAsideInfoFilterBtn = (windowWidth < DESKTOP_MIN_WIDTH &&
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
    );
    const desktopSelectedFilters = (
        windowWidth >= DESKTOP_MIN_WIDTH &&
        selectedFiltersQty > 0 &&
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
    );
    const desktopFiltersAsideInfo = (windowWidth >= DESKTOP_MIN_WIDTH &&
    <div className="consonant-filters-info--wrapper">
        <h2 className="consonant-filters-info--title">Lorem ipsum dolor sit amet.</h2>
        {filters.length > 0 &&
            <span className="consonant-filters-info--results">{cardsQty} results</span>
        }
    </div>
    );

    return (
        <aside className="consonant-filters-info">
            {desktopFiltersAsideInfo}
            {mobileAsideInfoSearch}
            {mobileAsideInfoFilterBtn}
            {filters.length ?
                <Select
                    val={selelectedFilterBy}
                    values={selectValues}
                    onSelect={onSelect} /> :
                <Loader />
            }
            {desktopSelectedFilters}
        </aside>
    );
};

export default FiltersInfo;

FiltersInfo.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.object),
    cardsQty: PropTypes.number,
    selectedFiltersQty: PropTypes.number,
    windowWidth: PropTypes.number,
    selectValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    selelectedFilterBy: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onMobileFiltersToggleClick: PropTypes.func.isRequired,
    onSelectedFilterClick: PropTypes.func.isRequired,
};

FiltersInfo.defaultProps = {
    filters: [],
    cardsQty: 0,
    selectedFiltersQty: 0,
    windowWidth: window.innerWidth,
    selelectedFilterBy: '',
};
