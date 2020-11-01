import React from 'react';
import { string } from 'prop-types';

import { renderDisplayMsg } from '../Helpers/rendering';

const ViewType = {
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

    const displayMsg = renderDisplayMsg(description, replaceValue);

    return (
        <div
            data-testid="no-results-view"
            className="consonant-no-results-view">
            <strong
                className="consonant-no-results-view--title">
                {title}
            </strong>
            {description &&
                <div
                    className="consonant-no-results-view--description">
                    {displayMsg}
                </div>
            }
        </div>
    );
};

View.propTypes = ViewType;
View.defaultProps = defaultProps;

export default View;
