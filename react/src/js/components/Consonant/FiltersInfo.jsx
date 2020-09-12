import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
import Select from './Select';
import SelectedFilter from './SelectedFilter';

const DESKTOP_MIN_WIDTH = 1200;
const TABLET_MIN_WIDTH = 768;

const FiltersInfo = (props) => {
    const {
        enabled,
        title,
        filters,
        cardsQty,
        showSelect,
        showTotalResults,
        selectedFiltersQty,
        windowWidth,
        selelectedFilterBy,
        selectValues,
        selectOpened,
        onSelectOpen,
        onSelect,
        searchEnabled,
        searchPlaceholder,
        onSearch,
        searchQuery,
        onSelectedFilterClick,
        onMobileFiltersToggleClick,
        children,
    } = props;

    const mobileAsideInfoSearch = (
        windowWidth < DESKTOP_MIN_WIDTH &&
        searchEnabled &&
        (!children || (children && windowWidth < TABLET_MIN_WIDTH)) &&
        <div className="consonant-filters-info--search">
            <Search
                placeholderText={searchPlaceholder}
                value={searchQuery}
                onSearch={onSearch} />
        </div>
    );
    const mobileAsideInfoFilterBtn = (
        windowWidth < DESKTOP_MIN_WIDTH &&
        filters.length > 0 &&
        enabled &&
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
        {
            title &&
            <h2 className="consonant-filters-info--title">{title}</h2>
        }
        {!children && showTotalResults &&
            <span className="consonant-filters-info--results">{cardsQty} results</span>
        }
    </div>
    );

    return (
        <aside className={
            children ?
                'consonant-filters-info consonant-filters-info-top-filter' :
                'consonant-filters-info'
        }>
            {desktopFiltersAsideInfo}
            {mobileAsideInfoSearch}
            {!children && mobileAsideInfoFilterBtn}
            {
                selectValues.length &&
                showSelect &&
                (!children || (children && windowWidth < TABLET_MIN_WIDTH)) &&
                <Select
                    opened={selectOpened}
                    val={selelectedFilterBy}
                    values={selectValues}
                    onOpen={onSelectOpen}
                    onSelect={onSelect}
                    smallOnMobile={!!children} />
            }
            {
                children &&
                    <div className="consonant-filters-info--top-filters-wrapper">
                        <div className="consonant-filters-info--top-filters-wrapper-inner">
                            {props.children}
                            {
                                windowWidth >= TABLET_MIN_WIDTH &&
                                <Fragment>
                                    {
                                        showTotalResults &&
                                        <span className="consonant-filters-info--results">
                                            {cardsQty} results
                                        </span>
                                    }
                                    {
                                        searchEnabled &&
                                        <Search
                                            placeholderText={searchPlaceholder}
                                            value={searchQuery}
                                            onSearch={onSearch} />
                                    }
                                </Fragment>
                            }
                        </div>
                        {
                            windowWidth >= TABLET_MIN_WIDTH &&
                            selectValues.length &&
                            showSelect &&
                            <Select
                                opened={selectOpened}
                                val={selelectedFilterBy}
                                values={selectValues}
                                onOpen={onSelectOpen}
                                onSelect={onSelect} />
                        }
                    </div>
            }
            {desktopSelectedFilters}
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
    showSelect: PropTypes.bool.isRequired,
    selectedFiltersQty: PropTypes.number,
    windowWidth: PropTypes.number,
    selectValues: PropTypes.arrayOf(PropTypes.object).isRequired,
    selelectedFilterBy: PropTypes.shape({
        label: PropTypes.string,
        sort: PropTypes.string,
    }).isRequired,
    searchQuery: PropTypes.string,
    searchEnabled: PropTypes.bool.isRequired,
    searchPlaceholder: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    selectOpened: PropTypes.bool,
    onSelectOpen: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onMobileFiltersToggleClick: PropTypes.func.isRequired,
    onSelectedFilterClick: PropTypes.func.isRequired,
    children: PropTypes.element,
};

FiltersInfo.defaultProps = {
    title: '',
    filters: [],
    cardsQty: 0,
    searchQuery: '',
    selectedFiltersQty: 0,
    selectOpened: false,
    windowWidth: window.innerWidth,
    children: '',
};
