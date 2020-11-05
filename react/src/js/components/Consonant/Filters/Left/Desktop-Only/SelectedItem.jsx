import React from 'react';
import {
    number,
    func,
} from 'prop-types';

const SelectedItemType = {
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
            type="button"
            tabIndex="0"
            data-testid="item-badge"
            onClick={handleClear}
            className="consonant-left-filter--item-badge">
            {displayNumItemsSelected}
        </button>
    );
};

SelectedItem.propTypes = SelectedItemType;
SelectedItem.defaultProps = defaultProps;

/* eslint-disable-next-line import/prefer-default-export */
export { SelectedItem };
