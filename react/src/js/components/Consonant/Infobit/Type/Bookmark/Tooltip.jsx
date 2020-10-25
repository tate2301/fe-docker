import React from 'react';
import PropTypes from 'prop-types';

/**
 * Tooltip (shown in 3:2 Card Footer -- primarily used with bookmark infobit)
 * Used on hover to indicate to users that they do or not do an actino
 *
 * @component
 * @example
 * const props= {
    text: String,
 * }
 * return (
 *   <Tooltip {...props}/>
 * )
 */
const Tooltip = ({ text }) => (
    <span
        className="consonant-tooltip">
        {text}
    </span>
);

Tooltip.propTypes = {
    text: PropTypes.string,
};

Tooltip.defaultProps = {
    text: '',
};

export default Tooltip;
