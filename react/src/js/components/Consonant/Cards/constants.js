
const defaultProps = {
    id: '',
    title: '',
    label: '',
    footer: '',
    ctaLink: '',
    endTime: '',
    logoAlt: '',
    logoSrc: '',
    videoURL: '',
    badgeText: '',
    startTime: '',
    cardImage: '',
    bannerIcon: '',
    description: '',
    logoBorderColor: '',
    bannerFontColor: '',
    isBookmarked: false,
    bannerDescription: '',
    disableBookmarkIco: '',
    logoBackgroundColor: '',
    bannerBackgroundColor: '',
};

export const SquareCardDefaultProps = {
    ...defaultProps,
    ctaLink: '',
};

export const FullCardDefaultProps = {
    ...defaultProps,
    ctaLink: '',
};

export const WideCardDefaultProps = {
    ...defaultProps,
    footer: [],
    isBookmarked: false,
    disableBookmarkIco: false,
};
