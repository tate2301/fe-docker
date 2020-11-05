import React, { useCallback } from 'react';
import {
    func,
    string,
} from 'prop-types';

const ChosenFilterItemType = {
    id: string.isRequired,
    name: string.isRequired,
    onClick: func.isRequired,
    parentId: string.isRequired,
};

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
     * @param {ClickEvent} e
     * @listens ClickEvent
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
