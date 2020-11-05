
const defaultProps = {
    title: '',
    styles: {},
    overlays: {},
    contentArea: {},
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
