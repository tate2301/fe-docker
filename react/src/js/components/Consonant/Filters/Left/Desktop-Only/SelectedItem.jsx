import React from 'react';
import { number, func } from 'prop-types';

const TSelectedItem = {
    numItemsSelected: number,
    handleClear: func.isRequired,
};

const defaultProps = {
    numItemsSelected: 0,
};

const SelectedItem = ({
    handleClear,
    numItemsSelected,
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

SelectedItem.propTypes = TSelectedItem;
SelectedItem.defaultProps = defaultProps;

/* eslint-disable-next-line import/prefer-default-export */
export { SelectedItem };
