import React from 'react';
import PropTypes from 'prop-types';

const AspectRatio1to1Card = (props) => {
    const {
        id,
        title,
        label,
        ctaLink,
        image,
        bannerDescription,
        bannerFontColor,
        bannerBackgroundColor,
        bannerIcon,
        badgeText,
        videoURL,
    } = props;

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
                            bannerIcon &&
                            <img
                                src={bannerIcon}
                                alt=""
                                loading="lazy"
                                width="8"
                                data-testid="consonant-card--banner-icon"
                                className="consonant-aspect-ratio-1-1-card--banner-icon" />
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
                {label && <span className="consonant-aspect-ratio-1-1-card--label">{label}</span>}
                <h2 className="consonant-aspect-ratio-1-1-card--title" dangerouslySetInnerHTML={{ __html: title }} />
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
