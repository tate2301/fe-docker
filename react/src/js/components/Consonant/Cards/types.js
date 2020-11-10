import {
    bool,
    func,
    array,
    shape,
    string,
    arrayOf,
    oneOfType,
} from 'prop-types';

import { FooterType } from '../types/card';

const DefaultType = {
    id: string,
    lh: string,
    label: string,
    logoSrc: string,
    logoAlt: string,
    videoURL: string,
    cardImage: string,
    badgeText: string,
    bannerIcon: string,
    logoBorderColor: string,
    bannerFontColor: string,
    bannerDescription: string,
    logoBackgroundColor: string,
    bannerBackgroundColor: string,
    title: oneOfType([
        string,
        array,
    ]),
};

export const FullCardType = {
    ...DefaultType,
    ctaLink: string,
};

export const SquareCardType = {
    ...DefaultType,
    ctaLink: string,
    endTime: string,
    startTime: string,
    description: oneOfType([
        string,
        array,
    ]),
};

export const WideCardType = {
    ...DefaultType,
    onClick: func,
    endTime: string,
    startTime: string,
    isBookmarked: bool,
    dateDetailText: string,
    disableBookmarkIco: bool,
    footer: arrayOf(shape(FooterType)),
    description: oneOfType([
        string,
        array,
    ]),
};
