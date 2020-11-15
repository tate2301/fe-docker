import React from 'react';
import classNames from 'classnames';
import {
    string,
    shape,
    node,
} from 'prop-types';

import { useLazyLoading } from '../Helpers/hooks';
import {
    stylesType,
    contentAreaType,
    overlaysType,
} from '../types/card';
import { CARD_STYLES } from '../Helpers/constants';

const BaseCardType = {
    id: string.isRequired,
    ctaLink: string,
    lh: string,
    type: string,
    styles: shape(stylesType),
    overlays: shape(overlaysType),
    contentArea: shape(contentAreaType),
    children: node,
};

const defaultProps = {
    ctaLink: '',
    styles: {},
    type: '',
    overlays: {},
    contentArea: {},
    lh: '',
    children: [],
};

/**
 * Base card
 *
 * @component
 * @example
 * const props= {
    id: String,
    ctaLink: string,
    lh: String,
    type: String,
    styles: Object,
    overlays: Object,
    contentArea: Object,
    children: Node,
 * }
 * return (
 *   <BaseCard {...props}/>
 * )
 */
const BaseCard = (props) => {
    const {
        id,
        lh,
        type,
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
        children,
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

    /**
     * Class name for the card:
     * whether the card should keep 3:2 aspect ratio;
     * whether the card should keep 1:1 aspect ratio;
     * whether the card should be fully overlaid with the background image;
     * @type {String}
     */
    const cardClassName = classNames({
        'consonant-card': true,
        'consonant-aspect-ratio-3-2-card': type === CARD_STYLES.WIDE,
        'consonant-aspect-ratio-1-1-card': type === CARD_STYLES.SQUARE,
        'consonant-full-card': type === CARD_STYLES.FULL,
    });

    return (
        <div
            daa-lh={lh}
            className={cardClassName}
            data-testid="consonant-card-3-2"
            id={id}>
            <div
                data-testid="consonant-card--img"
                className="consonant-card--img"
                ref={imageRef}
                style={{ backgroundImage: `url("${lazyLoadedImage}")` }}>
                {bannerDescription && bannerFontColor && bannerBackgroundColor &&
                    <span
                        data-testid="consonant-card--banner"
                        className="consonant-card--banner"
                        style={({
                            backgroundColor: bannerBackgroundColor,
                            color: bannerFontColor,
                        })}>
                        {bannerIcon &&
                            <div
                                className="consonant-card--banner-icon-wrapper">
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
                        className="consonant-card--badge">
                        {badgeText}
                    </span>
                }
                {videoURL &&
                    <a
                        href={videoURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="consonant-card--video-ico"
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
                        className="consonant-card--logo">
                        <img
                            src={logoSrc}
                            alt={logoAlt}
                            loading="lazy"
                            width="32" />
                    </div>
                }
            </div>
            <div
                className="consonant-card--inner">
                {label &&
                    <span
                        data-testid="card--label"
                        className="consonant-card--label">
                        {label}
                    </span>
                }
                <h2
                    className="consonant-card--title">
                    <a
                        href={ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Click to open"
                        tabIndex="0">
                        {title}
                    </a>
                </h2>
                {children}
            </div>
        </div>
    );
};

BaseCard.propTypes = BaseCardType;
BaseCard.defaultProps = defaultProps;

export default BaseCard;
