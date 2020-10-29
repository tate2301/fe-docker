import React from 'react';
import PropTypes from 'prop-types';

/**
 * LinkWithIcon Infobit (shown in 3:2 Card Footer)
 *
 * @component
 * @example
 * const props= {
    href: String,
    openInNewTab: Boolean,
    linkHint: String,
    text: String,
    src: String,
    srcAltText: String,
 * }
 * return (
 *   <LinkWithIcon {...props}/>
 * )
 */
const LinkWithIcon = ({
    href,
    openInNewTab,
    linkHint,
    text,
    src,
    srcAltText,
}) => (
    <a
        href={href}
        data-testid="link-with-icon"
        target={openInNewTab ? '_blank' : '_self'}
        className="consonant-link-with-ico-infobit"
        title={linkHint}
        rel="noreferrer"
        tabIndex="0">
        {src &&
        <img src={src} alt={srcAltText} loading="lazy" height="18" />
        }
        <span>{text}</span>
    </a>
);

LinkWithIcon.propTypes = {
    href: PropTypes.string,
    text: PropTypes.string,
    src: PropTypes.string,
    openInNewTab: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    linkHint: PropTypes.string,
    srcAltText: PropTypes.string,
};

LinkWithIcon.defaultProps = {
    href: '',
    text: '',
    src: '',
    openInNewTab: true,
    linkHint: '',
    srcAltText: '',
};

export default LinkWithIcon;
