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
const IconWithText = ({
    src,
    srcAltText,
    text,
}) => (
    <div
        className="consonant-icon-with-text-infobit">
        {src &&
        <img
            src={src}
            height="22"
            alt={srcAltText}
            loading="lazy" />
        }
        <span
            className="consonant-icon-with-text-infobit--text">
            {text}
        </span>
    </div>
);

IconWithText.propTypes = {
    src: PropTypes.string,
    srcAltText: PropTypes.string,
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};

IconWithText.defaultProps = {
    src: '',
    srcAltText: '',
    text: '',
};

export default IconWithText;
