import React from 'react';

import { SearchIconType } from './types';

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
const SearchIcon = ({ onClick }) => (
    <button
        tabIndex="0"
        type="button"
        onClick={onClick}
        className="search-ico"
        data-testid="search-icon">
        <span />
    </button>
);

SearchIcon.propTypes = SearchIconType;

export default SearchIcon;
