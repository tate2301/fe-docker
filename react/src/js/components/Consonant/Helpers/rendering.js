import React from 'react';
import uuid from 'react-uuid';

/**
* Handles highlighting search results on search
* @param {String} text - Search Text
* @param {String} value - Values to highlight
* @returns {String []} - HTML with text highlighting
*/
export const highlightSearchField = (text, value) => {
    const parts = text.split(new RegExp(`(${value})`, 'gi'));
    return parts.map(part => (
        part.toLowerCase() === value ?
            (
                <span
                    data-testid="consonant-search-result"
                    className="consonant-search-result"
                    key={uuid()}>
                    {part}
                </span>
            ) : part
    ));
};

/**
* Handles generating HTML for errors
* @param {String} text - Error Text
* @param {String} value - Values to modify
* @returns {String []} - HTML to render users on page error
*/
export const renderErrorMsg = (text, value) => {
    const arr = text.split(new RegExp('({query}|{break})', 'gi')).filter(item => item);
    return arr.map((item) => {
        switch (item.toLowerCase()) {
            case '{query}':
                return (
                    <strong
                        key={uuid()}>
                        {value}
                    </strong>
                );
            case '{break}':
                return (
                    <br
                        key={uuid()} />
                );
            default: return (
                <span
                    key={uuid()}>
                    {item}
                </span>
            );
        }
    });
};

/**
* Handles generating HTML for total results text
* @param {String} text - Text
* @param {String} value - Values to modify
* @returns {String []} - HTML to render total results text
*/
export const renderTotalResults = (text, value) => {
    const arr = text.split(new RegExp('({total})', 'gi')).filter(item => item);
    return arr.map(item => (item.toLowerCase() === '{total}' ? <strong key={uuid()}>{value}</strong> : <span key={uuid()}>{item}</span>));
};
