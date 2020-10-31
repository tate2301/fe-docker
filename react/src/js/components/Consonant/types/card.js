import {
    string,
    oneOfType,
    arrayOf,
    shape,
    number,
    bool,
    array,
} from 'prop-types';

const AppliesToType = {
    id: string,
};

const ShowCardType = {
    from: string,
    until: string,
};

const TagsType = {
    id: oneOfType([string, number]),
};
const SearchType = {};

export const FooterLeftType = {
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

export const FooterCenterType = {
    src: string,
    type: string,
    href: string,
    text: oneOfType([string, number]),
};

export const FooterRightType = {
    src: string,
    type: string,
    style: string,
    endTime: string,
    startTime: string,
    text: oneOfType([string, number]),
};

const OverlaysBannerType = {
    icon: string,
    fontColor: string,
    description: string,
    backgroundColor: string,
};

const OverlaysLogoType = {
    src: string,
    alt: string,
    borderColor: string,
    backgroundColor: string,
};

const OverlaysLabelType = {
    description: string,
};

const OverlaysVideoButtonType = {
    url: string,
};

export const StylesType = {
    typeOverride: string,
    backgroundImage: string,
};

export const ContentAreaType = {
    detailText: string,
    title: oneOfType([string, array]),
    description: oneOfType([string, array]),
    dateDetailText: shape({
        endTime: string,
        startTime: string,
    }),
};

export const OverlaysType = {
    logo: shape(OverlaysLogoType),
    label: shape(OverlaysLabelType),
    banner: shape(OverlaysBannerType),
    videoButton: shape(OverlaysVideoButtonType),
};

export const FooterType = {
    divider: bool,
    isFluid: bool,
    left: arrayOf(shape(FooterLeftType)),
    right: arrayOf(shape(FooterRightType)),
    center: arrayOf(shape(FooterCenterType)),
};

export const CardType = {
    id: string,
    title: string,
    cardDate: string,
    styles: shape(StylesType),
    search: shape(SearchType),
    showCard: shape(ShowCardType),
    overlays: shape(OverlaysType),
    tags: arrayOf(shape(TagsType)),
    footer: arrayOf(shape(FooterType)),
    contentArea: shape(ContentAreaType),
    appliesTo: arrayOf(shape(AppliesToType)),
};
