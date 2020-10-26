import PropTypes from 'prop-types';
import React from 'react';

const SelectedItem = ({
    numItemsSelected,
    handleClear,
}) => {
    const displayNumItemsSelected = numItemsSelected > 0 ? numItemsSelected : '';
    return (
        <button
            data-testid="item-badge"
            type="button"
            className="consonant-left-filter--item-badge"
            onClick={handleClear}
            tabIndex="0">
            {displayNumItemsSelected}
        </button>
    );
};

/* eslint-disable-next-line import/prefer-default-export */
export { SelectedItem };

SelectedItem.propTypes = {
    numItemsSelected: PropTypes.number,
    handleClear: PropTypes.func.isRequired,
};

SelectedItem.defaultProps = {
    numItemsSelected: 0,
};
