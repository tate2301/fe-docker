import {
    bool,
    string,
    oneOfType,
} from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const LinkType = {
    linkHint: string,
    href: string.isRequired,
    text: string.isRequired,
    openInNewTab: oneOfType([bool, string]),
};
