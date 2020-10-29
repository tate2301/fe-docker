import React from 'react';
import { func } from 'prop-types';

const TSearchIcon = {
    onClick: func.isRequired,
};

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

SearchIcon.propTypes = TSearchIcon;

export default SearchIcon;
