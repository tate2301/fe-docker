import React from 'react';
import PropTypes from 'prop-types';

const SelectedFilter = (props) => {
    const {
        name, id, parentId, onClick,
    } = props;

    const handleClick = () => {
        onClick(parentId, id);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="consonant-filters--selected-filter">{name}
        </button>
    );
};

export default SelectedFilter;

SelectedFilter.propTypes = {
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};
