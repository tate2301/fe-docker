import React from 'react';
import PropTypes from 'prop-types';

function LinkWithIcon({
    href, openInNewTab, linkHint, text, src, srcAltText,
}) {
    return (
        <a
            href={href}
            target={openInNewTab ? '__blank' : '_self'}
            className="consonant-link-widh-ico-infobit"
            title={linkHint}
            rel="noreferrer"
            tabIndex="0">
            {src && <img src={src} alt={srcAltText} loading="lazy" height="18" />}
            <span>{text}</span>
        </a>
    );
}

LinkWithIcon.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    src: PropTypes.string,
    openInNewTab: PropTypes.bool,
    linkHint: PropTypes.string,
    srcAltText: PropTypes.string,
};

LinkWithIcon.defaultProps = {
    src: '',
    openInNewTab: true,
    linkHint: '',
    srcAltText: '',
};

export default LinkWithIcon;
