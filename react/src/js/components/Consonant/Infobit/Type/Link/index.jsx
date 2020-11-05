import React from 'react';

import { LinkType } from './types';

const defaultProps = {
    linkHint: '',
    openInNewTab: true,
};

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
            rel="noopener noreferrer"
            tabIndex="0">
            {text}
        </a>
    );
};

Link.propTypes = LinkType;
Link.defaultProps = defaultProps;

export default Link;
