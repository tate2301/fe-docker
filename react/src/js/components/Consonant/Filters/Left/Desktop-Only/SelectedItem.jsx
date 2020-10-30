import React from 'react';
import PropTypes from 'prop-types';

/**
 * Badge displaying the quantity of the selected left filter options
 * on the desktop breakpoint
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
const SelectedItem = (props) => {
    const {
        numItemsSelected,
        handleClear,
    } = props;

    /**
     **** Constants ****
     */

    /**
     * Text - quantity of selected left filter options
     * @type {String}
     */
    const displayNumItemsSelected = numItemsSelected > 0 ? `${numItemsSelected}` : '';

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

SelectedItem.propTypes = {
    numItemsSelected: PropTypes.number,
    handleClear: PropTypes.func.isRequired,
};

SelectedItem.defaultProps = {
    numItemsSelected: 0,
};

/* eslint-disable-next-line import/prefer-default-export */
export { SelectedItem };
