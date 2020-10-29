import React from 'react';
import { string, shape } from 'prop-types';

import prettyFormatDate from '../Helpers/prettyFormat';

import { useConfig, useLazyLoading } from '../Helpers/hooks';
import { TStyles, TContentArea, TOverlays } from '../types/card';

const TAspectRatio1to1Card = {
    ctaLink: string,
    id: string.isRequired,
    styles: shape(TStyles),
    overlays: shape(TOverlays),
    contentArea: shape(TContentArea),
};

const defaultProps = {
    styles: {},
    ctaLink: '',
    overlays: {},
    contentArea: {},
};

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

    const i18nFormat = getConfig('collection', 'i18n.prettyDateIntervalFormat');
    const locale = getConfig('language', '');
    const prettyDate = startTime ? prettyFormatDate(startTime, endTime, locale, i18nFormat) : null;

    const detailText = prettyDate || label || '';

    const imageRef = React.useRef();
    const [lazyLoadedImage] = useLazyLoading(imageRef, image);

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
                                <div className="consonant-aspect-ratio-1-1-card--banner-icon-wrapper">
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
                    <span className="consonant-aspect-ratio-1-1-card--badge">
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
                    <h2 className="consonant-aspect-ratio-1-1-card--title">
                        {title}
                    </h2>
                }
                {
                    description &&
                    <p className="consonant-aspect-ratio-1-1-card--text">
                        {description}
                    </p>
                }
            </a>
        </div>
    );
};

AspectRatio1to1Card.propTypes = TAspectRatio1to1Card;
AspectRatio1to1Card.defaultProps = defaultProps;

export default AspectRatio1to1Card;
