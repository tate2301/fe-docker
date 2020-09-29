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
        videoURL,
    } = props;

    return (
        <div className="consonant-full-card" id={id}>
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
                            bannerIcon &&
                            <img
                                src={bannerIcon}
                                alt=""
                                loading="lazy"
                                width="8"
                                data-testid="consonant-card--banner-icon"
                                className="consonant-full-card--banner-icon" />
                        }
                        {bannerDescription}
                    </span>
                }
                {videoURL &&
                <a
                    href={videoURL}
                    target="_blank"
                    rel="noreferrer"
                    className="consonant-full-card--video-ico">Open video link
                </a>}
            </div>
            <a
                href={ctaLink}
                target="_blank"
                rel="noreferrer"
                title="Click to open in a new tab"
                className="consonant-full-card--inner">
                {label && <span className="consonant-full-card--label">{label}</span>}
                <h2 className="consonant-full-card--title" dangerouslySetInnerHTML={{ __html: title }} />
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
    ctaLink: PropTypes.string,
    videoURL: PropTypes.string,
};

FullCard.defaultProps = {
    bannerIcon: '',
    bannerDescription: '',
    bannerFontColor: '',
    bannerBackgroundColor: '',
    label: '',
    ctaLink: '',
    videoURL: '',
};
