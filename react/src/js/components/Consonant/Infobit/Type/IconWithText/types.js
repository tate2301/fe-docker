import {
    string,
    number,
    oneOfType,
} from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const IconWithTextType = {
    src: string,
    srcAltText: string,
    text: oneOfType([
        string,
        number,
    ]),
};

