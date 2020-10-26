import React from 'react';
import PropTypes from 'prop-types';
import { renderDisplayMsg } from '../Helpers/rendering';

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

export default View;

View.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    replaceValue: PropTypes.string,
};

View.defaultProps = {
    description: '',
    replaceValue: '',
};
