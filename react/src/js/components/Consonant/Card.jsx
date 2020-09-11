import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';

const CARD_STYLE = {
    WIDE: '3:2',
    SQUARE: '1:1',
    FULL: 'full-card',
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
        allowBookmarking,
        isBookmarked,
        cardSavedIco,
        cardUnsavedIco,
        onClick,
        saveBookmarkText,
        unsaveBookmarkText,
        cardStyle,
        videoURL,
    } = props;

    const handleClick = (clickEvt) => {
        clickEvt.stopPropagation();
        onClick(id);
    };

    const setClassName = () => {
        const res = ['consonant-card'];
        const style = cardStyle.toLowerCase().trim();

        if (style === CARD_STYLE.FULL) res.push('consonant-card_full');
        if (style === CARD_STYLE.SQUARE) res.push('consonant-card_square');

        return res.join(' ');
    };

    return (
        <div className={setClassName()} id={id}>
            <div
                className="consonant-card--img"
                style={{ backgroundImage: `url("${image}")` }}>
                {
                    bannerDescription &&
                    bannerFontColor &&
                    bannerBackgroundColor &&
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
                                width="8"
                                className="consonant-card--banner-icon" />
                        }
                        {bannerDescription}
                    </span>
                }
                { videoURL && <span className="consonant-card--video-ico" />}
            </div>
            <div className="consonant-card--inner">
                {
                    label &&
                    <span className="consonant-card--label">{label}</span>
                }
                <h2
                    className="consonant-card--title"
                    dangerouslySetInnerHTML={{ __html: title }} />
                {
                    ![CARD_STYLE.SQUARE, CARD_STYLE.FULL]
                        .some(el => el === cardStyle.toLowerCase().trim()) &&
                        <Fragment>
                            <p
                                className="consonant-card--text"
                                dangerouslySetInnerHTML={{ __html: description }} />
                            <div className="consonant-card--footer-wrapper">
                                <div className="consonant-card--footer-info">
                                    {
                                        allowBookmarking &&
                                        <button
                                            data-tooltip-wrapper
                                            type="button"
                                            className={
                                                isBookmarked ?
                                                    'consonant-card--footer-btn consonant-card--footer-btn_active' :
                                                    'consonant-card--footer-btn'
                                            }
                                            onClick={handleClick}>
                                            {(cardSavedIco && cardUnsavedIco) ?
                                                <img
                                                    src={
                                                        isBookmarked ?
                                                            cardSavedIco :
                                                            cardUnsavedIco
                                                    }
                                                    width="16"
                                                    alt=""
                                                    loading="lazy" /> :
                                                <span className="consonant-card--bookmark-ico" />
                                            }
                                            <Tooltip text={
                                                isBookmarked ? unsaveBookmarkText : saveBookmarkText
                                            } />
                                        </button>

                                    }
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
                        </Fragment>
                }
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
    allowBookmarking: PropTypes.bool.isRequired,
    isBookmarked: PropTypes.bool.isRequired,
    cardSavedIco: PropTypes.string.isRequired,
    cardUnsavedIco: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    saveBookmarkText: PropTypes.string,
    unsaveBookmarkText: PropTypes.string,
    cardStyle: PropTypes.string,
    videoURL: PropTypes.string,
};

Card.defaultProps = {
    bannerIcon: '',
    bannerDescription: '',
    bannerFontColor: '',
    bannerBackgroundColor: '',
    secondaryLabelText: '',
    label: '',
    saveBookmarkText: 'Save card',
    unsaveBookmarkText: 'Unsave card',
    cardStyle: '',
    videoURL: '',
};
