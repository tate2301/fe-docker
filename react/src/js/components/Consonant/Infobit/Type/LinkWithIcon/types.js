import {
    bool,
    string,
    oneOfType,
} from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const LinkWithIconType = {
    src: string,
    href: string,
    text: string,
    linkHint: string,
    srcAltText: string,
    openInNewTab: oneOfType([string, bool]),
};
