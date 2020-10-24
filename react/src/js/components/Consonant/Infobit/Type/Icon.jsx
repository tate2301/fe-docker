import React from 'react';
import PropTypes from 'prop-types';

/**
 * Icon With Text Infobit (shown in 3:2 Card Footer)
 *
 * @component
 * @example
 * const props= {
    src: String,
    srcAltText: String,
    text: String,
 * }
 * return (
 *   <IconWithText {...props}/>
 * )
 */
const Icon = ({
    src,
    alt,
}) => (
    <img
        className="consonant-icon-infobit"
        width="28"
        src={src}
        alt={alt}
        loading="lazy" />);

Icon.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
};

Icon.defaultProps = {
    alt: '',
};

export default Icon;
