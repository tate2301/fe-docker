import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useConfig } from '../../../utils/hooks';

/**
 * Used as unique id for accessibility labels/attributes
 * @type {Int}
 */
const searchId = 'consonant-search';

/**
 * Search Component (Used in both Top And Left Filter Views)
 *
 * @component
 * @example
 * const props= {
    value: Function,
    onSearch: String,
    name: String,
    autofocus: Boolean,
    placeholderText: String,
 * }
 * return (
 *   <Search {...props}/>
 * )
 */
const Search = ({
    value,
    onSearch,
    name,
    autofocus,
    placeholderText,
}) => {
    const getConfig = useConfig();

    /**
     * Authored Search Title
     * @type {String}
     */
    const leftPanelTitle = getConfig('search', 'i18n.leftFilterPanel.searchTitle');

    /**
     * Refernce to input element
     * @type {HTMLElement}
     */
    const textInput = useRef(null);

    /**
     * Handles search box input changes
     * is clicked
     *
     * @param {InputChangeEvent} e
     * @listens InputChangeEvent
     */
    const handleSearch = (e) => {
        onSearch(e.target.value);
    };

    /**
     * Handles focus events for text input
     *
     * @param {ClickEvent} e
     * @listens ClickEvent
     */
    const focusTextInput = () => {
        textInput.current.focus();
    };

    /**
     * Handles clearing user's search query
     *
     * @param {ClickEvent} e
     * @listens ClickEvent
     */
    const clearSearch = () => {
        onSearch('');
        focusTextInput();
    };

    /**
    * Handles focus for search box
    * @returns {Void} - an updated state
    */
    useEffect(() => {
        if (autofocus && textInput.current) {
            textInput.current.focus();
        }
    }, [autofocus, textInput]);

    return (
        <div
            data-testid={name}
            className="consonant-search">
            <label
                htmlFor={searchId}>
                <span
                    className="consonant-search--input-title">
                    {leftPanelTitle}
                </span>
                <span
                    className="consonant-search--input-wrapper">
                    <input
                        id={searchId}
                        data-testid="search-input"
                        type="search"
                        placeholder={placeholderText}
                        onClick={e => e.stopPropagation()}
                        value={value}
                        onChange={handleSearch}
                        ref={textInput}
                        className="consonant-search--input"
                        required />
                    <button
                        data-testid="clear-search-button"
                        type="button"
                        title=""
                        className="consonant-search--input-clear"
                        onClick={clearSearch}
                        tabIndex="0" />
                </span>
            </label>
        </div>
    );
};

export default Search;

Search.propTypes = {
    name: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    value: PropTypes.string,
    autofocus: PropTypes.bool,
    placeholderText: PropTypes.string,
};

Search.defaultProps = {
    value: '',
    name: '',
    autofocus: true,
    placeholderText: '',
};
