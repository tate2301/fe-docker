import React from 'react';
import PropTypes from 'prop-types';

const bannerDefaults = {
    bg: '#1473E6',
    color: '#fff',
};

const Card = (props) => {
    const {
        id,
        title,
        label,
        description,
        ctaLink,
        ctaLabel,
        image,
        bannerDescription,
        bannerFontColor,
        bannerBackgroundColor,
        bannerIcon,
        secondaryLabelText,
        isBookmarked,
        onClick,
    } = props;

    const handleClick = (clickEvt) => {
        clickEvt.stopPropagation();
        onClick(id);
    };

    return (
        <div className="consonant-card" id={id}>
            <div
                className="consonant-card--img"
                style={{ backgroundImage: `url("${image}")` }}>
                {
                    bannerDescription && bannerFontColor &&
                    <span
                        className="consonant-card--banner"
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
                                width="16"
                                className="consonant-card--banner-icon" />
                        }
                        {bannerDescription}
                    </span>
                }
            </div>
            <div className="consonant-card--inner">
                <span className="consonant-card--label">{label}</span>
                <h2
                    className="consonant-card--title"
                    dangerouslySetInnerHTML={{ __html: title }} />
                <p
                    className="consonant-card--text"
                    dangerouslySetInnerHTML={{ __html: description }} />
                <div className="consonant-card--footer-wrapper">
                    <div className="consonant-card--footer-info">
                        <button
                            type="button"
                            className={
                                isBookmarked ?
                                    'consonant-card--footer-btn consonant-card--footer-btn_active' :
                                    'consonant-card--footer-btn'
                            }
                            title="Click to bookmark"
                            onClick={handleClick}>
                            <svg width="16" height="12">
                                <use href="#bookmark" />
                            </svg>
                        </button>
                        {
                            secondaryLabelText &&
                            <span className="consonant-card--secondary-text">{secondaryLabelText}</span>
                        }
                    </div>
                    <a
                        href={ctaLink}
                        target="_blank"
                        className="consonant-card--btn">{ctaLabel}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Card;

Card.propTypes = {
    id: PropTypes.string.isRequired,
    ctaLink: PropTypes.string.isRequired,
    ctaLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    label: PropTypes.string,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    bannerDescription: PropTypes.string,
    bannerFontColor: PropTypes.string,
    bannerBackgroundColor: PropTypes.string,
    bannerIcon: PropTypes.string,
    secondaryLabelText: PropTypes.string,
    isBookmarked: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

Card.defaultProps = {
    bannerFontColor: bannerDefaults.color,
    bannerBackgroundColor: bannerDefaults.bg,
    bannerIcon: '',
    bannerDescription: '',
    secondaryLabelText: '',
    label: '',
};
