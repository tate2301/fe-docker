import React from 'react';
import className from 'classnames';
import { string } from 'prop-types';

const BUTTON_STYLE = {
    PRIMARY: 'primary',
    CTA: 'call-to-action',
};

const buttonType = {
    text: string,
    href: string,
    style: string,
    iconSrc: string,
    iconAlt: string,
    iconPos: string,
};

const defaultProps = {
    href: '',
    text: '',
    iconSrc: '',
    iconAlt: '',
    iconPos: '',
    style: BUTTON_STYLE.CTA,
};

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
    style,
    text,
    href,
    iconSrc,
    iconAlt,
    iconPos,
}) => {
    const isCtaButton = style === BUTTON_STYLE.CTA;
    const buttonClass = className({
        'consonant-BtnInfobit': true,
        'consonant-BtnInfobit--cta': isCtaButton,
    });
    const iconClass = className({
        'consonant-BtnInfobit-ico': true,
        'consonant-BtnInfobit-ico--last': iconPos.toLowerCase() === 'aftertext',
    });

    return (
        <a
            className={buttonClass}
            data-testid="consonant-btn-infobit"
            tabIndex="0"
            rel="noopener noreferrer"
            target="_blank"
            href={href}>
            {iconSrc &&
            <img
                data-testid="img-for-button-infobit"
                src={iconSrc}
                width="20"
                height="20"
                className={iconClass}
                alt={iconAlt}
                loading="lazy" />
            }
            <span>{text}</span>
        </a>
    );
};

Button.propTypes = buttonType;
Button.defaultProps = defaultProps;

export default Button;
