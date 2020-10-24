import React from 'react';
import PropTypes from 'prop-types';

/**
 * Search Icon (Used in Top Filter View Only)
 *
 * Only function it has is to toggle Search Box
 *
 * @component
 * @example
 * const props= {
    onClick: Function,
 * }
 * return (
 *   <Select {...props}/>
 * )
 */
const SearchIcon = (props) => {
    const { onClick } = props;

    return (
        <button
            data-testid="search-icon"
            type="button"
            className="search-ico"
            onClick={onClick}
            tabIndex="0">
            <span />
        </button>
    );
};

export default SearchIcon;

SearchIcon.propTypes = {
    onClick: PropTypes.func.isRequired,
};
