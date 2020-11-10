import React from 'react';

import { SelectedItemType } from './types';
import { selectedItemsDefaultProps } from './constants';

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
/* eslint-disable-next-line import/prefer-default-export */
export const SelectedItem = ({
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
SelectedItem.defaultProps = selectedItemsDefaultProps;
