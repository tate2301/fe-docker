import React from 'react';
import {
    string,
    func,
} from 'prop-types';

const ChosenFilterItemType = {
    id: string.isRequired,
    name: string.isRequired,
    onClick: func.isRequired,
    parentId: string.isRequired,
};

const ChosenFilterItem = (props) => {
    const {
        name,
        id,
        parentId,
        onClick,
    } = props;

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

ChosenFilterItem.propTypes = ChosenFilterItemType;

export default ChosenFilterItem;
