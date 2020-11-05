import React from 'react';
import {
    string,
    shape,
} from 'prop-types';

import { useLazyLoading } from '../Helpers/hooks';
import {
    StylesType,
    ContentAreaType,
    OverlaysType,
} from '../types/card';

const FullCardType = {
    ctaLink: string,
    id: string.isRequired,
    lh: string,
    styles: shape(StylesType),
    overlays: shape(OverlaysType),
    contentArea: shape(ContentAreaType),
};

const defaultProps = {
    styles: {},
    lh: '',
    ctaLink: '',
    overlays: {},
    contentArea: {},
};

/**
 * Full card
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
 *   <FullCard {...props}/>
 * )
 */
const FullCard = (props) => {
    const {
        id,
        lh,
        ctaLink,
        styles: {
            backgroundImage: image,
        },
        contentArea: {
            title,
            detailText: label,

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

    return (
        <div
            daa-lh={lh}
            className="consonant-full-card"
            data-testid="consonant-full-card"
            id={id}>
            <div
                data-testid="consonant-card--img"
                className="consonant-full-card--img"
                ref={imageRef}
                style={{ backgroundImage: `url("${lazyLoadedImage}")` }}>
                {bannerDescription && bannerFontColor && bannerBackgroundColor &&
                    <span
                        data-testid="consonant-card--banner"
                        className="consonant-full-card--banner"
                        style={({
                            backgroundColor: bannerBackgroundColor,
                            color: bannerFontColor,
                        })}>
                        {bannerIcon &&
                            <div
                                className="consonant-full-card--banner-icon-wrapper">
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
                        className="consonant-full-card--badge">
                        {badgeText}
                    </span>
                }
                {videoURL &&
                    <a
                        href={videoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="consonant-full-card--video-ico"
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
                        className="consonant-full-card--logo">
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
                title=""
                className="consonant-full-card--inner"
                tabIndex="0">
                {label &&
                    <span
                        className="consonant-full-card--label">
                        {label}
                    </span>
                }
                <h2
                    className="consonant-full-card--title">
                    {title}
                </h2>
            </a>
        </div>
    );
};

FullCard.propTypes = FullCardType;
FullCard.defaultProps = defaultProps;

export default FullCard;
