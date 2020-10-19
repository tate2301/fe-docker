/*eslint-disable */
import React  from 'react';
import PropTypes from 'prop-types';
import { useConfig, useLazyLoading } from '../../../utils/hooks';
import prettyFormatDate from '../../../utils/prettyFormat';
import CardFooter from './CardFooter/CardFooter';
import { INFOBIT_TYPE } from '../../../constants';

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
    footer,
    disableBookmarkIco,
    isBookmarked,
    onClick,
    dateFormat,
    styles: {
        backgroundImage: image,
    },
    contentArea: {
        title,
        detailText: label,
        description,
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
        }
    },
}) => {
    const extendFooterData = (data) => {
        if (!data) return;

        return data.map((el) => {
            if (el.type === INFOBIT_TYPE.BOOKMARK) {
                return {
                    ...el,
                    cardId: id,
                    disableBookmarkIco,
                    isBookmarked,
                    onClick,
                };
            } else if (el.type === INFOBIT_TYPE.DATE) {
                return {
                    ...el,
                    dateFormat,
                    locale,
                };
            }
            return el;
        });
    };

    const imageRef = React.useRef();
    const [ lazyLoadedImage ] = useLazyLoading(imageRef, image);

    const getConfig = useConfig();

    const i18nFormat = getConfig('collection', 'i18n.prettyDateIntervalFormat');
    const locale = getConfig('language', '');

    const prettyDate = startTime ? prettyFormatDate(startTime, endTime, locale, i18nFormat) : null;
    const detailText = prettyDate || label || '';

    return (
        <div
            className="consonant-aspect-ratio-3-2-card"
            data-testid="consonant-card"
            id={id}>
            <div
                data-testid="consonant-card--img"
                className="consonant-aspect-ratio-3-2-card--img"
                ref={imageRef}
                style={{ backgroundImage: `url("${lazyLoadedImage}")` }}>
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
                        <span>{bannerDescription}</span>
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
                {logoSrc &&
                    <div style={({
                        backgroundColor: logoBg,
                        borderColor: logoBorderBg,
                    })}
                        className="consonant-aspect-ratio-3-2-card--logo">
                        <img
                            src={logoSrc}
                            alt={logoAlt}
                            loading="lazy"
                            width="32"
                        />
                    </div>}
            </div>
            <div className="consonant-aspect-ratio-3-2-card--inner">
                {detailText && (
                    <span data-testid="3-2-card--label" className="consonant-aspect-ratio-3-2-card--label">{detailText}</span>
                )}
                <h2
                    className="consonant-aspect-ratio-3-2-card--title">
                    {title}
                </h2>
                {
                    description &&
                    <p
                        className="consonant-aspect-ratio-3-2-card--text"
                    >{description}</p>
                }
                {footer.map((f, index) => (
                    <CardFooter
                        divider={f.divider}
                        key={index}
                        left={extendFooterData(f.left)}
                        center={extendFooterData(f.center)}
                        right={extendFooterData(f.right)} />
                ))}
            </div>
        </div>
    );
};

export default AspectRatio3to2Card;

const footerItemType = PropTypes.shape({
    divider: PropTypes.bool,
    left: PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string })),
    center: PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string })),
    right: PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string })),
});

AspectRatio3to2Card.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    bannerDescription: PropTypes.string,
    bannerFontColor: PropTypes.string,
    bannerBackgroundColor: PropTypes.string,
    bannerIcon: PropTypes.string,
    badgeText: PropTypes.string,
    videoURL: PropTypes.string,
    footer: PropTypes.arrayOf(footerItemType),
    disableBookmarkIco: PropTypes.bool,
    isBookmarked: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    dateFormat: PropTypes.string,
    locale: PropTypes.string,
    logoSrc: PropTypes.string,
    logoAlt: PropTypes.string,
    logoBg: PropTypes.string,
    logoBorderBg: PropTypes.string,
};

AspectRatio3to2Card.defaultProps = {
    bannerIcon: '',
    bannerDescription: '',
    bannerFontColor: '',
    bannerBackgroundColor: '',
    badgeText: '',
    label: '',
    videoURL: '',
    title: '',
    footer: {},
    disableBookmarkIco: false,
    logoSrc: '',
    logoAlt: '',
    logoBg: '',
    logoBorderBg: '',
};
