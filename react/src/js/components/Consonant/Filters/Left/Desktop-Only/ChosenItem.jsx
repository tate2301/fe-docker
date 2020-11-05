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

const ChosenFilterItem = ({
    id,
    name,
    onClick,
    parentId,
}) => {
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
