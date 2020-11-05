import React, { useMemo } from 'react';

import { If } from '../../Common';
import { FullCardType } from '../types';
import { FullCardDefaultProps } from '../constants';
import { useLazyLoading } from '../../Helpers/hooks';

/**
 * Full card
 *
 * @component
 * @example
 * const props= {
    id: Number,
    title: String,
    label: String,
    ctaLink: String,
    logoAlt: String,
    logoSrc: String,
    videoURL: String,
    badgeText: String,
    cardImage: String,
    bannerIcon: String,
    logoBorderColor: String,
    bannerFontColor: String,
    bannerDescription: String,
    logoBackgroundColor: String,
    bannerBackgroundColor: String,
 * }
 * return (
 *   <FullCard {...props}/>
 * )
 */
const FullCard = ({
    id,
    title,
    label,
    ctaLink,
    logoAlt,
    logoSrc,
    videoURL,
    badgeText,
    cardImage,
    bannerIcon,
    logoBorderColor,
    bannerFontColor,
    bannerDescription,
    logoBackgroundColor,
    bannerBackgroundColor,
}) => {
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
    const [lazyLoadedImage] = useLazyLoading(imageRef, cardImage);

    const cardStyles = useMemo(
        () => ({
            backgroundImage: `url("${lazyLoadedImage}")`,
        }),
        [lazyLoadedImage],
    );

    const bannerStyle = useMemo(
        () => ({
            color: bannerFontColor,
            backgroundColor: bannerBackgroundColor,
        }),
        [bannerFontColor, bannerBackgroundColor],
    );

    const logoStyle = useMemo(
        () => ({
            borderColor: logoBorderColor,
            backgroundColor: logoBackgroundColor,
        }),
        [logoBackgroundColor, logoBorderColor],
    );

    const shouldRenderBanner = bannerDescription
        && bannerFontColor
        && bannerBackgroundColor;

    return (
        <div
            className="consonant-full-card"
            data-testid="consonant-full-card"
            id={id}>
            <div
                ref={imageRef}
                style={cardStyles}
                data-testid="consonant-card--img"
                className="consonant-full-card--img">
                <If condition={Boolean(shouldRenderBanner)}>
                    <span
                        style={bannerStyle}
                        data-testid="consonant-card--banner"
                        className="consonant-full-card--banner">
                        <If condition={Boolean(bannerIcon)}>
                            <div className="consonant-full-card--banner-icon-wrapper">
                                <img
                                    alt=""
                                    loading="lazy"
                                    src={bannerIcon}
                                    data-testid="consonant-card--banner-icon" />
                            </div>
                        </If>
                        <span>{bannerDescription}</span>
                    </span>
                </If>
                <If condition={Boolean(badgeText)}>
                    <span className="consonant-full-card--badge">{badgeText}</span>
                </If>
                <If condition={Boolean(videoURL)}>
                    <a
                        tabIndex="0"
                        href={videoURL}
                        target="_blank"
                        rel="noreferrer"
                        className="consonant-full-card--video-ico">
                        {videoURL}
                    </a>
                </If>
                <If condition={Boolean(logoSrc)}>
                    <div style={logoStyle} className="consonant-full-card--logo">
                        <img width="32" src={logoSrc} alt={logoAlt} loading="lazy" />
                    </div>
                </If>
            </div>
            <a
                title=""
                tabIndex="0"
                href={ctaLink}
                target="_blank"
                rel="noreferrer"
                className="consonant-full-card--inner">
                <If condition={Boolean(label)}>
                    <span className="consonant-full-card--label">{label}</span>
                </If>
                <h2 className="consonant-full-card--title">{title}</h2>
            </a>
        </div>
    );
};

FullCard.propTypes = FullCardType;
FullCard.defaultProps = FullCardDefaultProps;

export default FullCard;
