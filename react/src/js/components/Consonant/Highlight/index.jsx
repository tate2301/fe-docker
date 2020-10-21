import React, { Fragment, useMemo, memo } from 'react';
import { string } from 'prop-types';

import { findAll } from './utils';

const Highlighter = memo(({ text, searchString }) => {
    const chunks = useMemo(
        () =>
            findAll({
                text,
                searchString,
            }),
        [searchString, text],
    );

    return chunks.map(({ start, end, highlight }) => {
        const textChunk = text.substr(start, end - start);

        return (
            <Fragment key={`${start}_${end}`}>
                {!highlight ? textChunk : <span className="consonant-search-result">{textChunk}</span>}
            </Fragment>
        );
    });
});

Highlighter.propTypes = {
    searchString: string,
    text: string.isRequired,
};

Highlighter.defaultProps = {
    searchString: '',
};

export default (text, value) => <Highlighter text={text} searchString={value} />;
