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
            className="error-message">
            <strong
                className="error-message--title">
                {title}
            </strong>
            {description &&
                <div
                    className="error-message--description">
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
