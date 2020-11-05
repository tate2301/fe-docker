import React from 'react';
import {
    func,
    number,
} from 'prop-types';

const SelectedItemType = {
    numItemsSelected: number,
    handleClear: func.isRequired,
};

const defaultProps = {
    numItemsSelected: 0,
};

/**
 * Badge displaying how many filter options were selected
 * (Only for Left Filter Panel - on desktop breakpoint)
 *
 * @component
 * @example
 * const props= {
    numItemsSelected: Number,
    handleClear: Function,
 * }
 * return (
 *   <SelectedItem {...props}/>
 * )
 */
const SelectedItem = ({
    handleClear,
    numItemsSelected,
}) => {
    /**
     * Text - quantity of selected left filter options
     * @type {String}
     */
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
