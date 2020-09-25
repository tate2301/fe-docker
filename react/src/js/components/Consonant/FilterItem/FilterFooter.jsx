import React from 'react';
import PropTypes from 'prop-types';

const FilterFooter = (props) => {
    const {
        id,
        results,
        itemsSelected,
        onClearAll,
        clearFilterText,
        onClick,
    } = props;
    const handleClear = () => {
        onClearAll(id);
    };
    const handleClick = (clickEvt) => {
        clickEvt.preventDefault();
        onClick(id);
    };

    return (
        <div className="consonant-filter-footer">
            <span className="consonant-filter-footer--res-qty">{results} results</span>
            {itemsSelected > 0 &&
            <button
                type="button"
                onClick={handleClear}
                className="consonant-filter-footer--clear-btn">{clearFilterText}
            </button>}
            <button
                type="button"
                onClick={handleClick}
                className="consonant-filter-footer--btn">
                {itemsSelected > 0 ? 'Apply' : 'Done'}
            </button>
        </div>
    );
};

export default FilterFooter;

FilterFooter.propTypes = {
    id: PropTypes.string.isRequired,
    results: PropTypes.number.isRequired,
    itemsSelected: PropTypes.number,
    onClearAll: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    clearFilterText: PropTypes.string,
};

FilterFooter.defaultProps = {
    itemsSelected: 0,
    clearFilterText: 'Clear',
};
