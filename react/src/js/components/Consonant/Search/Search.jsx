import React from 'react';
import PropTypes from 'prop-types';

const searchId = 'consonant-search';
const Search = (props) => {
    const {
        value,
        onSearch,
        placeholderText,
        leftPanelTitle,
        childrenKey,
        autofocus,
    } = props;
    let textInput = null;
    const handleSearch = (evt) => {
        onSearch(evt.target.value);
    };
    const setAutofocus = () => {
        textInput.focus();
    };
    const clearSearch = () => {
        onSearch('');
        setAutofocus();
    };
    return (
        <div data-testid={childrenKey} className="consonant-search">
            <label htmlFor={searchId}>
                <span className="consonant-search--input-title">{leftPanelTitle}</span>
                <span className="consonant-search--input-wrapper">
                    <input
                        id={searchId}
                        data-testid="search-input"
                        type="search"
                        placeholder={placeholderText}
                        value={value}
                        onChange={handleSearch}
                        ref={(input) => {
                            if (autofocus && input) input.focus();
                            textInput = input;
                        }}
                        className="consonant-search--input"
                        required />
                    <button
                        type="button"
                        title="Click to clear search query"
                        className="consonant-search--input-clear"
                        onClick={clearSearch}
                        tabIndex="0">clear
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
    leftPanelTitle: PropTypes.string,
    autofocus: PropTypes.bool,
};

Search.defaultProps = {
    value: '',
    childrenKey: 'consonant-search',
    placeholderText: 'Search here...',
    leftPanelTitle: 'Search',
    autofocus: true,
};
