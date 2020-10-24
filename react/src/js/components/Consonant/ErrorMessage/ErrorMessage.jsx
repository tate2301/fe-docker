import React from 'react';
import PropTypes from 'prop-types';
import { renderErrorMsg } from '../Helpers/rendering';

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
 *   <ErrorMessage {...props}/>
 * )
 */
const ErrorMessage = (props) => {
    const { title, description, replaceValue } = props;
    const html = renderErrorMsg(description, replaceValue);

    return (
        <div className="error-message">
            <strong className="error-message--title">{title}</strong>
            {description &&
                <div className="error-message--description">{html}</div>
            }
        </div>
    );
};

export default ErrorMessage;

ErrorMessage.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    replaceValue: PropTypes.string,
};

ErrorMessage.defaultProps = {
    description: '',
    replaceValue: '',
};
