import React from 'react';
import PropTypes from 'prop-types';
import CardFooter from './CardFooter/CardFooter';

export const Tooltip = (props) => {
    const { text } = props;

    return (
        <span className="consonant-tooltip">{text}</span>
    );
};

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
};

const AspectRatio3to2Card = ({
    id,
    title,
    label,
    description,
    image,
    bannerDescription,
    bannerFontColor,
    bannerBackgroundColor,
    bannerIcon,
    badgeText,
    videoURL,
    footer,
    disableBookmarkIco,
    isBookmarked,
    onClick,
}) => {
    const extendFooterData = (data) => {
        if (!data) return null;

        return data.map((el) => {
            if (el.type === 'bookmark') {
                return {
                    ...el,
                    cardId: id,
                    disableBookmarkIco,
                    isBookmarked,
                    onClick,
                };
            }
            return el;
        });
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
                            bannerIcon && (
                                <div className="consonant-aspect-ratio-3-2-card--banner-icon-wrapper">
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
                {badgeText && <span className="consonant-aspect-ratio-3-2-card--badge">{badgeText}</span>}
                {videoURL &&
                    <a
                        href={videoURL}
                        target="_blank"
                        rel="noreferrer"
                        className="consonant-aspect-ratio-3-2-card--video-ico"
                        tabIndex="0">Open video link
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
                <CardFooter
                    left={extendFooterData(footer.left)}
                    center={extendFooterData(footer.center)}
                    right={extendFooterData(footer.right)} />
            </div>
        </div>
    );
};

export default AspectRatio3to2Card;

AspectRatio3to2Card.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    label: PropTypes.string,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    bannerDescription: PropTypes.string,
    bannerFontColor: PropTypes.string,
    bannerBackgroundColor: PropTypes.string,
    bannerIcon: PropTypes.string,
    badgeText: PropTypes.string,
    videoURL: PropTypes.string,
    footer: PropTypes.shape({
        left: PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string })),
        center: PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string })),
        right: PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string })),
    }),
    disableBookmarkIco: PropTypes.bool,
    isBookmarked: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

AspectRatio3to2Card.defaultProps = {
    bannerIcon: '',
    bannerDescription: '',
    bannerFontColor: '',
    bannerBackgroundColor: '',
    badgeText: '',
    label: '',
    videoURL: '',
    footer: {},
    disableBookmarkIco: false,
};
