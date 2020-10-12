import React from 'react';
import PropTypes from 'prop-types';

const FullCard = (props) => {
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
            className="consonant-full-card"
            data-testid="consonant-card"
            id={id}>
            <div
                data-testid="consonant-card--img"
                className="consonant-full-card--img"
                style={{ backgroundImage: `url("${image}")` }}>
                {bannerDescription && bannerFontColor && bannerBackgroundColor &&
                    <span
                        data-testid="consonant-card--banner"
                        className="consonant-full-card--banner"
                        style={({
                            backgroundColor: bannerBackgroundColor,
                            color: bannerFontColor,
                        })}>
                        {
                            bannerIcon && (
                                <div className="consonant-full-card--banner-icon-wrapper">
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
                {badgeText && <span className="consonant-full-card--badge">{badgeText}</span>}
                {videoURL &&
                <a
                    href={videoURL}
                    target="_blank"
                    rel="noreferrer"
                    className="consonant-full-card--video-ico"
                    tabIndex="0">Open video link
                </a>}
            </div>
            <a
                href={ctaLink}
                target="_blank"
                rel="noreferrer"
                title="Click to open in a new tab"
                className="consonant-full-card--inner"
                tabIndex="0">
                {label && <span className="consonant-full-card--label">{label}</span>}
                <h2 className="consonant-full-card--title" >
                    {title}
                </h2>
            </a>
        </div>
    );
};

export default FullCard;

FullCard.propTypes = {
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

FullCard.defaultProps = {
    bannerIcon: '',
    bannerDescription: '',
    bannerFontColor: '',
    bannerBackgroundColor: '',
    badgeText: '',
    label: '',
    ctaLink: '',
    videoURL: '',
};
