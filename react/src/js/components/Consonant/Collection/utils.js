export const selector = ({
    pagination: { type },
    collection: { cardStyle },
}) => ({
    cardStyle,
    paginationType: type,
});

export const getFlatternProps = ({
    id,
    footer,
    ctaLink,
    isBookmarked,
    disableBookmarkIco,
    styles: {
        backgroundImage: cardImage,
    },
    contentArea: {
        title,
        description,
        detailText: label,
        dateDetailText: {
            endTime,
            startTime,
        },
    },
    overlays: {
        banner: {
            icon: bannerIcon,
            fontColor: bannerFontColor,
            description: bannerDescription,
            backgroundColor: bannerBackgroundColor,
        },
        videoButton: {
            url: videoURL,
        },
        logo: {
            src: logoSrc,
            alt: logoAlt,
            borderColor: logoBorderColor,
            backgroundColor: logoBackgroundColor,
        },
        label: {
            description: badgeText,
        },
    },
}) => ({
    id,
    title,
    label,
    footer,
    ctaLink,
    endTime,
    logoAlt,
    logoSrc,
    videoURL,
    badgeText,
    startTime,
    cardImage,
    bannerIcon,
    description,
    isBookmarked,
    logoBorderColor,
    bannerFontColor,
    bannerDescription,
    disableBookmarkIco,
    logoBackgroundColor,
    bannerBackgroundColor,
});
