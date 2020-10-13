import React from 'react';
import PropTypes from 'prop-types';
import { useConfig } from '../../../utils/hooks';
import prettyFormatDate from '../../../utils/prettyFormat';

const AspectRatio1to1Card = (props) => {
    const {
        id,
        ctaLink,
        badgeText,

        styles: {
            backgroundImage: image,
        },
        contentArea: {
            title,
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
        },
    } = props;

    const getConfig = useConfig();

    const i18nFormat = getConfig('collection', 'i18n.prettyDateIntervalFormat');
    const locale = getConfig('language', '');

    const prettyDate = startTime ? prettyFormatDate(startTime, endTime, locale, i18nFormat) : null;
    const detailText = prettyDate || label || '';

    return (
        <div
            className="consonant-aspect-ratio-1-1-card"
            data-testid="consonant-card"
            id={id}>
            <div
                data-testid="consonant-card--img"
                className="consonant-aspect-ratio-1-1-card--img"
                style={{ backgroundImage: `url("${image}")` }}>
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
                        {bannerDescription}
                    </span>
                }
                {badgeText && <span className="consonant-aspect-ratio-1-1-card--badge">{badgeText}</span>}
                {videoURL &&
                <a
                    href={videoURL}
                    target="_blank"
                    rel="noreferrer"
                    className="consonant-aspect-ratio-1-1-card--video-ico"
                    tabIndex="0">Open video link
                </a>}
            </div>
            <a
                href={ctaLink}
                target="_blank"
                rel="noreferrer"
                title="Click to open in a new tab"
                className="consonant-aspect-ratio-1-1-card--inner"
                tabIndex="0">
                {detailText && <span className="consonant-aspect-ratio-1-1-card--label">{detailText}</span>}
                <h2 className="consonant-aspect-ratio-1-1-card--title">
                    {title}
                </h2>
            </a>
        </div>
    );
};

export default AspectRatio1to1Card;

AspectRatio1to1Card.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    label: PropTypes.string,
    image: PropTypes.string.isRequired,
    bannerDescription: PropTypes.string,
    bannerFontColor: PropTypes.string,
    bannerBackgroundColor: PropTypes.string,
    bannerIcon: PropTypes.string,
    badgeText: PropTypes.string,
    ctaLink: PropTypes.string,
    videoURL: PropTypes.string,
};

AspectRatio1to1Card.defaultProps = {
    bannerIcon: '',
    bannerDescription: '',
    bannerFontColor: '',
    bannerBackgroundColor: '',
    badgeText: '',
    label: '',
    ctaLink: '',
    videoURL: '',
};
