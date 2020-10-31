import React from 'react';
import PropTypes from 'prop-types';

import {
    useConfig,
    useLazyLoading 
} from '../Helpers/hooks';

import prettyFormatDate from '../Helpers/prettyFormat';

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
     **** Hooks ****
     */

    /**
     * Creates card image DOM reference 
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
     **** Constants ****
     */

    /**
     * Formatted date string
     * @type {String|null}
     */
    const prettyDate = startTime ? prettyFormatDate(startTime, endTime, locale, i18nFormat) : null;

    /**
     * Detail text
     * @type {String}
     */
    const detailText = prettyDate || label || '';

    return (
        <div
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
                        {
                            bannerIcon && (
                                <div
                                    className="consonant-aspect-ratio-1-1-card--banner-icon-wrapper">
                                    <img
                                        alt=""
                                        loading="lazy"
                                        src={bannerIcon}
                                        data-testid="consonant-card--banner-icon" />
                                </div>
                            )
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
                        rel="noreferrer"
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
                    </div>}
            </div>
            <a
                href={ctaLink}
                target="_blank"
                rel="noreferrer"
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

AspectRatio1to1Card.propTypes = {
    id: PropTypes.string.isRequired,
    ctaLink: PropTypes.string,
    styles: PropTypes.shape({
        backgroundImage: PropTypes.string,
    }),
    contentArea: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        detailText: PropTypes.string,
        dateDetailText: PropTypes.shape({
            startTime: PropTypes.string,
            endTime: PropTypes.string,
        }),
    }),
    overlays: PropTypes.shape({
        banner: PropTypes.shape({
            description: PropTypes.string,
            fontColor: PropTypes.string,
            backgroundColor: PropTypes.string,
            icon: PropTypes.string,
        }),
        videoButton: PropTypes.shape({
            url: PropTypes.string,
        }),
        logo: PropTypes.shape({
            src: PropTypes.string,
            alt: PropTypes.string,
            backgroundColor: PropTypes.string,
            borderColor: PropTypes.string,
        }),
        label: PropTypes.shape({
            description: PropTypes.string,
        }),
    }),
};

AspectRatio1to1Card.defaultProps = {
    ctaLink: '',
    styles: {},
    contentArea: {},
    overlays: {},
};

export default AspectRatio1to1Card;
