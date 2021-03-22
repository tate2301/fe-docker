import React from 'react';
import { string } from 'prop-types';

import { RenderDisplayMsg } from '../Helpers/rendering';

const viewType = {
    description: string,
    replaceValue: string,
    title: string.isRequired,
};

const defaultProps = {
    description: '',
    replaceValue: '',
};

/**
 * No results message that is shown when search returned 0 results;
 *
 * @component
 * @example
 * const props= {
    title: String
    description: String,
    replaceValue: String,
 * }
 * return (
 *   <NoResultsView {...props}/>
 * )
 */
const View = (props) => {
    const {
        title,
        description,
        replaceValue,
    } = props;

    const displayMsg = RenderDisplayMsg(description, replaceValue);

    return (
        <div
            data-testid="no-results-view"
            className="consonant-NoResultsView">
            <strong
                className="consonant-NoResultsView-title">
                {title}
            </strong>
            {description &&
                <div
                    className="consonant-NoResultsView-description">
                    {displayMsg}
                </div>
            }
        </div>
    );
};

View.propTypes = viewType;
View.defaultProps = defaultProps;

export default View;
