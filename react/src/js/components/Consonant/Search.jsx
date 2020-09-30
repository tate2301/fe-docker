import React from 'react';
import PropTypes from 'prop-types';

const searchId = 'consonant-search';
const Search = (props) => {
    const {
        value, onSearch, placeholderText,
    } = props;

    const handleSearch = (evt) => {
        onSearch(evt.target.value);
    };

    const clearSearch = () => {
        onSearch('');
    };

    return (
        <div className="consonant-search">
            <label htmlFor={searchId}>
                <span className="consonant-search--input-title">Search</span>
                <span className="consonant-search--input-wrapper">
                    <input
                        id={searchId}
                        data-testid="search-input"
                        type="search"
                        placeholder={placeholderText}
                        value={value}
                        onChange={handleSearch}
                        className="consonant-search--input"
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
    onSearch: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholderText: PropTypes.string,
};

Search.defaultProps = {
    value: '',
    placeholderText: 'Search here...',
};
