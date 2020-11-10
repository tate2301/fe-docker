import React, {
    useRef,
    useEffect,
    useCallback,
} from 'react';

import { selector } from './utils';
import { SearchType } from './types';
import { useConfigSelector } from '../Helpers/hooks';
import { trackClearSearchInput } from '../Analytics/Analytics';
import {
    searchInputId,
    SearchInputDefaultProps,
} from './constants';


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
    name,
    value,
    onSearch,
    autofocus,
    placeholderText,
}) => {
    /**
     * Authored Search Title
     * @type {String}
     */
    const { leftPanelTitle } = useConfigSelector(selector);

    /**
     * Refernce to input element
     * @type {HTMLElement}
     */
    const textInput = useRef(null);

    /**
     * Handles search box input changes
     * is clicked
     *
     * @param {InputChangeEvent} event
     * @listens InputChangeEvent
     */
    const handleSearch = useCallback(({ target: { value: searchValue } }) => {
        onSearch(searchValue);
    }, [onSearch]);

    /**
     * Halder for click on input
     * only call stopPropagation
     *
     * @param {InputClickEvent} event
     * @listens InputClickEvent
     */
    const handleClick = useCallback((event) => {
        event.stopPropagation();
    }, []);

    /**
     * Handles focus events for text input
     */
    const focusTextInput = useCallback(() => {
        textInput.current.focus();
    }, [textInput]);

    /**
     * Handles clearing user's search query
     */
    const clearSearch = useCallback(() => {
        onSearch('');
        focusTextInput();
        trackClearSearchInput();
    }, [onSearch, focusTextInput]);

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
                htmlFor={searchInputId}>
                <span
                    className="consonant-search--input-title">
                    {leftPanelTitle}
                </span>
                <span
                    className="consonant-search--input-wrapper">
                    <input
                        required
                        type="search"
                        value={value}
                        ref={textInput}
                        id={searchInputId}
                        onClick={handleClick}
                        onChange={handleSearch}
                        data-testid="search-input"
                        placeholder={placeholderText}
                        className="consonant-search--input" />
                    <button
                        title=""
                        tabIndex="0"
                        type="button"
                        onClick={clearSearch}
                        data-testid="clear-search-button"
                        className="consonant-search--input-clear" />
                </span>
            </label>
        </div>
    );
};

Search.propTypes = SearchType;
Search.defaultProps = SearchInputDefaultProps;

export default Search;
