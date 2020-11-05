import React from 'react';

import { If } from '../../../Common';
import { IconWithTextType } from './types';

const defaultProps = {
    src: '',
    text: '',
    srcAltText: '',
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
const IconWithText = ({
    src,
    text,
    srcAltText,
}) => (
    <div
        className="consonant-icon-with-text-infobit">
        <If condition={Boolean(src)}>
            <img
                src={src}
                height="22"
                alt={srcAltText}
                loading="lazy" />

        </If>
        <span
            className="consonant-icon-with-text-infobit--text">
            {text}
        </span>
    </div>
);

IconWithText.propTypes = IconWithTextType;
IconWithText.defaultProps = defaultProps;

export default IconWithText;
