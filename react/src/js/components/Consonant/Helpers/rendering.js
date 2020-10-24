import React from 'react';
import uuid from 'react-uuid';

export const highlightSearchField = (text, value) => {
    const parts = text.split(new RegExp(`(${value})`, 'gi'));
    return parts.map(part => (
        part.toLowerCase() === value ? (
            <span data-testid="consonant-search-result" className="consonant-search-result" key={uuid()}>
                {part}
            </span>
        ) : part
    ));
};

export const renderErrorMsg = (text, value) => {
    const arr = text.split(new RegExp('({query}|{break})', 'gi')).filter(el => el);
    return arr.map((el) => {
        switch (el.toLowerCase()) {
            case '{query}':
                return <strong key={uuid()}>{value}</strong>;
            case '{break}':
                return <br key={uuid()} />;
            default: return <span key={uuid()}>{el}</span>;
        }
    });
};

export const renderTotalResults = (text, value) => {
    const arr = text.split(new RegExp('({total})', 'gi')).filter(el => el);
    return arr.map(el => (el.toLowerCase() === '{total}' ?
        <strong key={uuid()}>{value}</strong> :
        <span key={uuid()}>{el}</span>));
};
