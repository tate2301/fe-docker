import React from 'react';
import className from 'classnames';

import { If } from '../../../Common';
import { ButtonType } from './types';
import { defaultProps, BUTTON_STYLE } from './constants';

/**
 * Button Infobit (shown in 3:2 Card Footer)
 *
 * @component
 * @example
 * const props= {
    style: String,
    href: String,
    text: String,
 * }
 * return (
 *   <Button {...props}/>
 * )
 */
const Button = ({
    text,
    href,
    style,
    iconSrc,
    iconAlt,
    iconPos,
}) => {
    const buttonClass = className({
        'consonant-btn-infobit': true,
        'consonant-btn-infobit_cta': style === BUTTON_STYLE.CTA,
    });
    const iconClass = className({
        'consonant-btn-infobit--ico': true,
        'consonant-btn-infobit--ico_last': iconPos.toLowerCase() === 'aftertext',
    });

    return (
        <a
            href={href}
            tabIndex="0"
            target="_blank"
            className={buttonClass}
            rel="noopener noreferrer"
            data-testid="consonant-btn-infobit">
            <If condition={Boolean(iconSrc)}>
                <img
                    width="20"
                    height="20"
                    alt={iconAlt}
                    src={iconSrc}
                    loading="lazy"
                    className={iconClass}
                    data-testid="img-for-button-infobit" />
            </If>
            <span>{text}</span>
        </a>
    );
};

Button.propTypes = ButtonType;
Button.defaultProps = defaultProps;

export default Button;
