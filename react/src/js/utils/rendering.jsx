import React from 'react';


export const getHighlightedTextComponent = (text, value) => {
    const parts = text.split(new RegExp(`(${value})`, 'gi'));
    return parts.map((part, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={i}>
            {part.toLowerCase() === value ? (
                <span data-testid="consonant-search-result" className="consonant-search-result">
                    {part}
                </span>
            ) : part}
        </span>
    ));
};
