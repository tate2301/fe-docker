import React from 'react';
import PropTypes from 'prop-types';

const Search = (props) => {
    const {
        value, onSearch, placeholderText, childrenKey,
    } = props;

    const handleSearch = (evt) => {
        onSearch(evt.target.value);
    };

    const clearSearch = () => {
        onSearch('');
    };

    return (
        <div data-testid={childrenKey} className="consonant-search">
            <label>
                <span className="consonant-search--input-title">Search</span>
                <span className="consonant-search--input-wrapper">
                    <input
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
    childrenKey: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholderText: PropTypes.string,
};

Search.defaultProps = {
    value: '',
    childrenKey: 'consonant-search',
    placeholderText: 'Search here...',
};
