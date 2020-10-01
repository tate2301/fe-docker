import React from 'react';
import PropTypes from 'prop-types';


export const Tooltip = (props) => {
    const { text } = props;

    return (
        <span className="consonant-tooltip">{text}</span>
    );
};


Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
};


const AspectRatio3to2Card = (props) => {
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
        allowBookmarking,
        isBookmarked,
        cardSavedIco,
        cardUnsavedIco,
        onClick,
        saveCardText,
        unsaveCardText,
        videoURL,
        disableBookmarkIco,
    } = props;

    const handleClick = (clickEvt) => {
        clickEvt.stopPropagation();
        onClick(id);
    };

    const defineBookMarkBtnClassName = () => {
        const res = ['consonant-aspect-ratio-3-2-card--footer-btn'];

        if (isBookmarked) res.push('consonant-aspect-ratio-3-2-card--footer-btn_active');
        if (disableBookmarkIco) res.push('consonant-aspect-ratio-3-2-card--footer-btn_disabled');

        return res.join(' ');
    };

    const renderIcon = () => {
        let src = '';

        if (isBookmarked && cardSavedIco) src = cardSavedIco;
        if (!isBookmarked && cardUnsavedIco) src = cardUnsavedIco;

        return src ?
            <span
                data-testid="bookmarks--ico"
                className="consonant-aspect-ratio-3-2-card--bookmark-ico"
                style={{ backgroundImage: `url(${src})` }} /> :
            <span data-testid="bookmarks--ico" className="consonant-aspect-ratio-3-2-card--bookmark-ico" />;
    };

    return (
        <div
            className="consonant-aspect-ratio-3-2-card"
            data-testid="consonant-card"
            id={id}>
            <div
                data-testid="consonant-card--img"
                className="consonant-aspect-ratio-3-2-card--img"
                style={{ backgroundImage: `url("${image}")` }}>
                {
                    bannerDescription &&
                    bannerFontColor &&
                    bannerBackgroundColor &&
                    <span
                        data-testid="consonant-card--banner"
                        className="consonant-aspect-ratio-3-2-card--banner"
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
                                className="consonant-aspect-ratio-3-2-card--banner-icon" />
                        }
                        {bannerDescription}
                    </span>
                }
                {videoURL &&
                    <a
                        href={videoURL}
                        target="_blank"
                        rel="noreferrer"
                        className="consonant-aspect-ratio-3-2-card--video-ico">Open video link
                    </a>}
            </div>
            <div className="consonant-aspect-ratio-3-2-card--inner">
                {
                    label &&
                    <span className="consonant-aspect-ratio-3-2-card--label">{label}</span>
                }
                <h2
                    className="consonant-aspect-ratio-3-2-card--title"
                    dangerouslySetInnerHTML={{ __html: title }} />
                <p
                    className="consonant-aspect-ratio-3-2-card--text"
                    dangerouslySetInnerHTML={{ __html: description }} />
                <div className="consonant-aspect-ratio-3-2-card--footer-wrapper">
                    <div className="consonant-aspect-ratio-3-2-card--footer-info">
                        {
                            allowBookmarking &&
                            <button
                                data-testid="consonant-card__bookmark-button"
                                data-tooltip-wrapper
                                type="button"
                                className={defineBookMarkBtnClassName()}
                                onClick={handleClick}>
                                {renderIcon()}
                                <Tooltip text={
                                    isBookmarked ? unsaveCardText : saveCardText
                                } />
                            </button>

                        }
                        {
                            secondaryLabelText &&
                            <span className="consonant-aspect-ratio-3-2-card--secondary-text">{secondaryLabelText}</span>
                        }
                    </div>
                    <a
                        href={ctaLink}
                        target="_blank"
                        rel="noreferrer"
                        className="consonant-aspect-ratio-3-2-card--btn">{ctaLabel}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AspectRatio3to2Card;

AspectRatio3to2Card.propTypes = {
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
    allowBookmarking: PropTypes.bool.isRequired,
    isBookmarked: PropTypes.bool.isRequired,
    cardSavedIco: PropTypes.string.isRequired,
    cardUnsavedIco: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    saveCardText: PropTypes.string,
    unsaveCardText: PropTypes.string,
    videoURL: PropTypes.string,
    disableBookmarkIco: PropTypes.bool,
};

AspectRatio3to2Card.defaultProps = {
    bannerIcon: '',
    bannerDescription: '',
    bannerFontColor: '',
    bannerBackgroundColor: '',
    secondaryLabelText: '',
    label: '',
    saveCardText: 'Save card',
    unsaveCardText: 'Unsave card',
    videoURL: '',
    disableBookmarkIco: false,
};
