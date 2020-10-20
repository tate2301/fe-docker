import React from 'react';
import PropTypes from 'prop-types';

const SearchIcon = (props) => {
    const { onClick } = props;

    return (
        <button
            type="button"
            className="search-ico"
            onClick={onClick}
            tabIndex="0">
            <span />
            Click to search
        </button>
    );
};

export default SearchIcon;

SearchIcon.propTypes = {
    onClick: PropTypes.func.isRequired,
};
