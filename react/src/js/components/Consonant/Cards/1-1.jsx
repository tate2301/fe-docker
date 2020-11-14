import React from 'react';
import {
    string,
    shape,
} from 'prop-types';

import prettyFormatDate from '../Helpers/prettyFormat';
import {
    useConfig,
    useLazyLoading,
} from '../Helpers/hooks';
import {
    StylesType,
    ContentAreaType,
    OverlaysType,
} from '../types/card';

const AspectRatio1to1CardType = {
    ctaLink: string,
    id: string.isRequired,
    lh: string,
    styles: shape(StylesType),
    overlays: shape(OverlaysType),
    contentArea: shape(ContentAreaType),
};

const defaultProps = {
    styles: {},
    ctaLink: '',
    overlays: {},
    contentArea: {},
    lh: '',
};

/**
 * 1:1 aspect ratio card
 *
 * @component
 * @example
 * const props= {
    id: String,
    ctaLink: String,
    styles: Object,
    contentArea: Object,
    overlays: Object,
 * }
 * return (
 *   <AspectRatio1to1Card {...props}/>
 * )
 */
const AspectRatio1to1Card = (props) => {
    const {
        id,
        ctaLink,
        lh,
        styles: {
            backgroundImage: image,
        },
        contentArea: {
            title,
            description,
            detailText: label,
            dateDetailText: {
                startTime,
                endTime,
            },
        },
        overlays: {
            banner: {
                description: bannerDescription,
                fontColor: bannerFontColor,
                backgroundColor: bannerBackgroundColor,
                icon: bannerIcon,
            },
            videoButton: {
                url: videoURL,
            },
            logo: {
                src: logoSrc,
                alt: logoAlt,
                backgroundColor: logoBg,
                borderColor: logoBorderBg,
            },
            label: {
                description: badgeText,
            },
        },
    } = props;

    const getConfig = useConfig();

    /**
     **** Authored Configs ****
     */
    const i18nFormat = getConfig('collection', 'i18n.prettyDateIntervalFormat');
    const locale = getConfig('language', '');

    /**
     * Creates a card image DOM reference
     * @returns {Object} - card image DOM reference
     */
    const imageRef = React.useRef();

    /**
     * @typedef {Image} LazyLoadedImageState
     * @description — Has image as state after image is lazy loaded
     *
     * @typedef {Function} LazyLoadedImageStateSetter
     * @description - Sets state once image is lazy loaded
     *
     * @type {[Image]} lazyLoadedImage
     */
    const [lazyLoadedImage] = useLazyLoading(imageRef, image);

    /**
     * Formatted date string
     * @type {String}
     */
    const prettyDate = startTime ? prettyFormatDate(startTime, endTime, locale, i18nFormat) : '';

    /**
     * Detail text
     * @type {String}
     */
    const detailText = prettyDate || label;

    return (
        <div
            daa-lh={lh}
            className="consonant-aspect-ratio-1-1-card"
            data-testid="consonant-1-1-card"
            id={id}>
            <div
                data-testid="consonant-card--img"
                className="consonant-aspect-ratio-1-1-card--img"
                ref={imageRef}
                style={{ backgroundImage: `url("${lazyLoadedImage}")` }}>
                {bannerDescription && bannerFontColor && bannerBackgroundColor &&
                    <span
                        data-testid="consonant-card--banner"
                        className="consonant-aspect-ratio-1-1-card--banner"
                        style={({
                            backgroundColor: bannerBackgroundColor,
                            color: bannerFontColor,
                        })}>
                        {bannerIcon &&
                            <div
                                className="consonant-aspect-ratio-1-1-card--banner-icon-wrapper">
                                <img
                                    alt=""
                                    loading="lazy"
                                    src={bannerIcon}
                                    data-testid="consonant-card--banner-icon" />
                            </div>
                        }
                        <span>{bannerDescription}</span>
                    </span>
                }
                {badgeText &&
                    <span
                        className="consonant-aspect-ratio-1-1-card--badge">
                        {badgeText}
                    </span>
                }
                {videoURL &&
                    <a
                        href={videoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="consonant-aspect-ratio-1-1-card--video-ico"
                        tabIndex="0">
                        {videoURL}
                    </a>
                }
                {logoSrc &&
                    <div
                        style={({
                            backgroundColor: logoBg,
                            borderColor: logoBorderBg,
                        })}
                        className="consonant-aspect-ratio-1-1-card--logo">
                        <img
                            src={logoSrc}
                            alt={logoAlt}
                            loading="lazy"
                            width="32" />
                    </div>
                }
            </div>
            <a
                href={ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                title="Click to open in a new tab"
                className="consonant-aspect-ratio-1-1-card--inner"
                tabIndex="0">
                {detailText &&
                    <span
                        data-testid="1-1-card--label"
                        className="consonant-aspect-ratio-1-1-card--label">
                        {detailText}
                    </span>
                }
                {
                    title &&
                    <h2
                        className="consonant-aspect-ratio-1-1-card--title">
                        {title}
                    </h2>
                }
                {
                    description &&
                    <p
                        className="consonant-aspect-ratio-1-1-card--text">
                        {description}
                    </p>
                }
            </a>
        </div>
    );
};

AspectRatio1to1Card.propTypes = AspectRatio1to1CardType;
AspectRatio1to1Card.defaultProps = defaultProps;

export default AspectRatio1to1Card;
