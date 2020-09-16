import React from 'react';
import PropTypes from 'prop-types';

const SearchIco = (props) => {
    const { onClick } = props;

    return (
        <button
            type="button"
            className="search-ico"
            onClick={onClick}>
                Click to search<span />
        </button>
    );
};

export default SearchIco;

SearchIco.propTypes = {
    onClick: PropTypes.func.isRequired,
};
