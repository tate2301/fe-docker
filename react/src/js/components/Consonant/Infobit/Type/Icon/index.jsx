import React from 'react';

import { IconType } from './types';

const defaultProps = {
    alt: '',
};

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
        src={src}
        alt={alt}
        width="28"
        loading="lazy"
        className="consonant-icon-infobit" />);

Icon.propTypes = IconType;
Icon.defaultProps = defaultProps;

export default Icon;
