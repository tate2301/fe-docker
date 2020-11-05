import React, { useCallback } from 'react';

import { ChosenFilterItemType } from './types';

/**
 * Component for what filter item was chosen
 * (Only shows up for the Left Filter Panel - on desktop breakpoint)
 *
 * @component
 * @example
 * const props= {
    name: String,
    id: String,
    parentId: String,
    onClick: Function,
 * }
 * return (
 *   <ChosenFilterItem {...props}/>
 * )
 */
const ChosenFilterItem = ({
    id,
    name,
    onClick,
    parentId,
}) => {
    /**
     * Unselects the chosen filter option when the filter is clicked
     */
    const handleClick = useCallback(() => {
        onClick(parentId, id, false);
    }, [id, parentId]);

    return (
        <button
            tabIndex="0"
            type="button"
            onClick={handleClick}
            data-testid="selected-filter"
            className="consonant-chosen-filter">
            {name}
        </button>
    );
};

ChosenFilterItem.propTypes = ChosenFilterItemType;

export default ChosenFilterItem;
