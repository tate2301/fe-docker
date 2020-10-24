import React from 'react';
import PropTypes from 'prop-types';

/**
 * Text infobit (shown in 3:2 Card Footer)
 *
 * @component
 * @example
 * const props= {
    text: String,
 * }
 * return (
 *   <Text {...props}/>
 * )
 */
const Text = ({ text }) => <p className="consonant-text-infobit">{text}</p>;

Text.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Text;
