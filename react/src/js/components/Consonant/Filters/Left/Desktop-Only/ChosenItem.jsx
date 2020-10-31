import React from 'react';
import PropTypes from 'prop-types';

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
const ChosenFilterItem = (props) => {
    const {
        name,
        id,
        parentId,
        onClick,
    } = props;

    /**
     * Unselects the chosen filter option when the filter is clicked
     * @param {ClickEvent} e
     * @listens ClickEvent
     */
    const handleClick = () => {
        onClick(parentId, id, false);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            data-testid="selected-filter"
            className="consonant-chosen-filter"
            tabIndex="0">
            {name}
        </button>
    );
};

ChosenFilterItem.propTypes = {
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ChosenFilterItem;
