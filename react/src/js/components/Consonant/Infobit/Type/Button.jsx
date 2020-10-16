import React from 'react';
import PropTypes from 'prop-types';

const BUTTON_STYLE = {
    CTA: 'call-to-action',
    PRIMARY: 'primary',
};

function Button({ style, text, href }) {
    return (
        <a
            className={style === BUTTON_STYLE.CTA ?
                'consonant-btn-infobit consonant-btn-infobit_cta' :
                'consonant-btn-infobit'}
            data-testid="consonant-btn-infobit"
            tabIndex="0"
            rel="noreferrer"
            target="_blank"
            href={href}>{text}
        </a>
    );
}

Button.propTypes = {
    style: PropTypes.string,
    text: PropTypes.string,
    href: PropTypes.string,
};

Button.defaultProps = {
    style: BUTTON_STYLE.CTA,
    href: '',
    text: '',
};

export default Button;
