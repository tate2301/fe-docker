import React from 'react';
import {
    number,
    func,
} from 'prop-types';

const selectedItemType = {
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
            data-testid="consonant-LeftFilter-itemBadge"
            type="button"
            className="consonant-LeftFilter-itemBadge"
            onClick={handleClear}
            tabIndex="0">
            {displayNumItemsSelected}
        </button>
    );
};

SelectedItem.propTypes = selectedItemType;
SelectedItem.defaultProps = defaultProps;

/* eslint-disable-next-line import/prefer-default-export */
export { SelectedItem };
