import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

const BUTTON_STYLE = {
    CTA: 'call-to-action',
    PRIMARY: 'primary',
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
        'consonant-btn-infobit': true,
        'consonant-btn-infobit_cta': isCtaButton,
    });
    const iconClass = className({
        'consonant-btn-infobit--ico': true,
        'consonant-btn-infobit--ico_last': iconPos.toLowerCase() === 'aftertext',
    });

    return (
        <a
            className={buttonClass}
            data-testid="consonant-btn-infobit"
            tabIndex="0"
            rel="noreferrer"
            target="_blank"
            href={href}>
            {iconSrc &&
            <img
                src={iconSrc}
                width="20"
                height="20"
                className={iconClass}
                alt={iconAlt}
                loading="lazy"
            />
            }
            <span>{text}</span>
        </a>
    );
};

Button.propTypes = {
    style: PropTypes.string,
    text: PropTypes.string,
    href: PropTypes.string,
    iconSrc: PropTypes.string,
    iconAlt: PropTypes.string,
    iconPos: PropTypes.string,
};

Button.defaultProps = {
    style: BUTTON_STYLE.CTA,
    href: '',
    text: '',
    iconSrc: '',
    iconAlt: '',
    iconPos: '',
};

export default Button;
