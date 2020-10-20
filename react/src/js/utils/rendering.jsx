import React from 'react';

/* eslint-disable import/prefer-default-export */
export const highlightSearchField = (text, value) => {
    const parts = text.split(new RegExp(`(${value})`, 'gi'));
    return parts.map((part, i) => (
        // eslint-disable-next-line react/no-array-index-key
        part.toLowerCase() === value ? (
            <span data-testid="consonant-search-result" className="consonant-search-result" key={i}>
                {part}
            </span>
        ) : part
    ));
};
