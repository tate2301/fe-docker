import React from 'react';
import PropTypes from 'prop-types';

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
const SelectedItem = (props) => {
    const {
        numItemsSelected,
        handleClear,
    } = props;

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
