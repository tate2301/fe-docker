import React from 'react';

import { If } from '../Common';
import { ViewType } from './types';
import { renderDisplayMsg } from '../Helpers/rendering';

const defaultProps = {
    title: '',
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
const View = ({
    title,
    description,
    replaceValue,
}) => {
    const displayMsg = renderDisplayMsg(description, replaceValue);

    return (
        <div
            data-testid="no-results-view"
            className="consonant-no-results-view">
            <strong
                className="consonant-no-results-view--title">
                {title}
            </strong>
            <If condition={Boolean(description)}>
                <div
                    className="consonant-no-results-view--description">
                    {displayMsg}
                </div>
            </If>
        </div>
    );
};

View.propTypes = ViewType;
View.defaultProps = defaultProps;

export default View;
