import React from 'react';
import PropTypes from 'prop-types';

/**
 * Link Infobit (shown in 3:2 Card Footer)
 *
 * @component
 * @example
 * const props= {
    href: String,
    openInNewTab: Boolean,
    linkHint: String,
    text: String,
 * }
 * return (
 *   <LinkWithIcon {...props}/>
 * )
 */
const Link = ({
    href,
    openInNewTab,
    linkHint,
    text,
}) => {
    const target = openInNewTab ? '_blank' : '_self';
    return (
        <a
            className="consonant-link-infobit"
            data-testid="link-infobit"
            href={href}
            target={target}
            title={linkHint}
            rel="noreferrer"
            tabIndex="0">
            {text}
        </a>
    );
};

Link.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    openInNewTab: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    linkHint: PropTypes.string,
};

Link.defaultProps = {
    openInNewTab: true,
    linkHint: '',
};

export default Link;
