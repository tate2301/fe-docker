import { string, oneOfType, arrayOf, shape, number, bool, array } from 'prop-types';

const TAppliesTo = {
    id: string,
};

const TShowCard = {
    from: string,
    until: string,
};

const TTags = {
    id: oneOfType([string, number]),
};
const TSearch = {};

export const TFooterLeft = {
    src: string,
    type: string,
    term: string,
    text: string,
    label: string,
    price: string,
    color: string,
    linkHint: string,
    percentage: string,
    openInNewTab: bool,
    srcAltText: string,
    totalStars: number,
    starsFilled: number,
    saveCardIcon: string,
    cardSaveText: string,
    unsaveCardIcon: string,
    cardUnsaveText: string,
    completionText: string,
};

export const TFooterCenter = {
    src: string,
    type: string,
    href: string,
    text: oneOfType([string, number]),
};

export const TFooterRight = {
    src: string,
    type: string,
    style: string,
    endTime: string,
    startTime: string,
    text: oneOfType([string, number]),
};

const TOverlaysBanner = {
    icon: string,
    fontColor: string,
    description: string,
    backgroundColor: string,
};

const TOverlaysLogo = {
    src: string,
    alt: string,
    borderColor: string,
    backgroundColor: string,
};

const TOverlaysLabel = {
    description: string,
};

const TOverlaysVideoButton = {
    url: string,
};

export const TStyles = {
    typeOverride: string,
    backgroundImage: string,
};

export const TContentArea = {
    detailText: string,
    title: oneOfType([string, array]),
    description: oneOfType([string, array]),
    dateDetailText: shape({
        endTime: string,
        startTime: string,
    }),
};

export const TOverlays = {
    logo: shape(TOverlaysLogo),
    label: shape(TOverlaysLabel),
    banner: shape(TOverlaysBanner),
    videoButton: shape(TOverlaysVideoButton),
};

export const TFooter = {
    divider: bool,
    isFluid: bool,
    left: arrayOf(shape(TFooterLeft)),
    right: arrayOf(shape(TFooterRight)),
    center: arrayOf(shape(TFooterCenter)),
};

export const TCard = {
    id: string,
    title: string,
    cardDate: string,
    styles: shape(TStyles),
    search: shape(TSearch),
    showCard: shape(TShowCard),
    overlays: shape(TOverlays),
    tags: arrayOf(shape(TTags)),
    footer: arrayOf(shape(TFooter)),
    contentArea: shape(TContentArea),
    appliesTo: arrayOf(shape(TAppliesTo)),
};
