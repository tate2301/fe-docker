import React from 'react';
import PropTypes from 'prop-types';

const ChosenFilter = (props) => {
    const {
        name, id, parentId, onClick,
    } = props;

    const handleClick = () => {
        onClick(parentId, id, false);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="consonant-chosen-filter">{name}
        </button>
    );
};

export default ChosenFilter;

ChosenFilter.propTypes = {
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};
