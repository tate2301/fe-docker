import React from 'react';

import { If } from '../../../Common';
import { LinkWithIconType } from './types';

const defaultProps = {
    src: '',
    href: '',
    text: '',
    linkHint: '',
    srcAltText: '',
    openInNewTab: true,
};

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
        rel="noopener noreferrer"
        tabIndex="0">
        <If condition={Boolean(src)}>
            <img src={src} alt={srcAltText} loading="lazy" height="18" />
        </If>
        <span>{text}</span>
    </a>
);

LinkWithIcon.propTypes = LinkWithIconType;
LinkWithIcon.defaultProps = defaultProps;

export default LinkWithIcon;
