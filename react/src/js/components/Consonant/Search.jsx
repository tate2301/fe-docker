import React from 'react';
import PropTypes from 'prop-types';

const Search = (props) => {
    const { itemsQty, value, onSearch } = props;
    const handleSearch = (evt) => {
        onSearch(evt.target.value);
    };

    const clearSearch = () => {
        onSearch('');
    };

    return (
        <div className="consonant-search">
            <label>
                <span className="consonant-search--input-title">Search</span>
                <span className="consonant-search--input-wrapper">
                    <input
                        type="search"
                        placeholder={onSearch ? `Search within ${itemsQty} items` : 'Search'}
                        value={value}
                        onChange={handleSearch}
                        required />
                    <button
                        type="button"
                        title="Click to clear search query"
                        className="consonant-search--input-clear"
                        onClick={clearSearch}>clear
                    </button>
                </span>
            </label>
        </div>
    );
};

export default Search;

Search.propTypes = {
    itemsQty: PropTypes.number,
    onSearch: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

Search.defaultProps = {
    itemsQty: 0,
};
