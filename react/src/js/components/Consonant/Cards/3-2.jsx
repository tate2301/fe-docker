import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';

import CardFooter from './CardFooter/CardFooter';

import prettyFormatDate from '../Helpers/prettyFormat';

import {
    useConfig,
    useLazyLoading,
} from '../Helpers/hooks';

import { INFOBIT_TYPE } from '../Helpers/constants';

/**
 * 3:2 aspect ratio card
 *
 * @component
 * @example
 * const props= {
    id: String,
    ctaLink: String,
    styles: Object,
    contentArea: Object,
    overlays: Object,
 * }
 * return (
 *   <AspectRatio3to2Card {...props}/>
 * )
 */
const AspectRatio3to2Card = (props) => {
    const {
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
            },
        },
    } = props;

    const getConfig = useConfig();

    /**
     **** Authored Configs ****
     */
    const i18nFormat = getConfig('collection', 'i18n.prettyDateIntervalFormat');
    const locale = getConfig('language', '');

    /**
     * Creates a card image DOM reference
     * @returns {Object} - card image DOM reference
     */
    const imageRef = React.useRef();

    /**
     * @typedef {Image} LazyLoadedImageState
     * @description — Has image as state after image is lazy loaded
     *
     * @typedef {Function} LazyLoadedImageStateSetter
     * @description - Sets state once image is lazy loaded
     *
     * @type {[Image]} lazyLoadedImage
     */
    const [lazyLoadedImage] = useLazyLoading(imageRef, image);

    /**
     * Formatted date string
     * @type {String|null}
     */
    const prettyDate = startTime ? prettyFormatDate(startTime, endTime, locale, i18nFormat) : null;

    /**
     * Detail text
     * @type {String}
     */
    const detailText = prettyDate || label || '';

    /**
     * Extends infobits with the configuration data
     * @param {Array} data - Array of the infobits
     * @return {Array} - Array of the infobits with the configuration data added
     */
    function extendFooterData(data) {
        if (!data) return [];

        return data.map((infobit) => {
            if (infobit.type === INFOBIT_TYPE.BOOKMARK) {
                return {
                    ...infobit,
                    cardId: id,
                    disableBookmarkIco,
                    isBookmarked,
                    onClick,
                };
            } else if (infobit.type === INFOBIT_TYPE.DATE) {
                return {
                    ...infobit,
                    dateFormat,
                    locale,
                };
            }
            return infobit;
        });
    }

    return (
        <div
            className="consonant-aspect-ratio-3-2-card"
            data-testid="consonant-card-3-2"
            id={id}>
            <div
                data-testid="consonant-card--img"
                className="consonant-aspect-ratio-3-2-card--img"
                ref={imageRef}
                style={{ backgroundImage: `url("${lazyLoadedImage}")` }}>
                {bannerDescription && bannerFontColor && bannerBackgroundColor &&
                    <span
                        data-testid="consonant-card--banner"
                        className="consonant-aspect-ratio-3-2-card--banner"
                        style={({
                            backgroundColor: bannerBackgroundColor,
                            color: bannerFontColor,
                        })}>
                        {bannerIcon &&
                            <div
                                className="consonant-aspect-ratio-3-2-card--banner-icon-wrapper">
                                <img
                                    alt=""
                                    loading="lazy"
                                    src={bannerIcon}
                                    data-testid="consonant-card--banner-icon" />
                            </div>
                        }
                        <span>{bannerDescription}</span>
                    </span>
                }
                {badgeText &&
                    <span
                        className="consonant-aspect-ratio-3-2-card--badge">
                        {badgeText}
                    </span>
                }
                {videoURL &&
                    <a
                        href={videoURL}
                        target="_blank"
                        rel="noreferrer"
                        className="consonant-aspect-ratio-3-2-card--video-ico"
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
                        className="consonant-aspect-ratio-3-2-card--logo">
                        <img
                            src={logoSrc}
                            alt={logoAlt}
                            loading="lazy"
                            width="32" />
                    </div>
                }
            </div>
            <div
                className="consonant-aspect-ratio-3-2-card--inner">
                {detailText &&
                    <span
                        data-testid="3-2-card--label"
                        className="consonant-aspect-ratio-3-2-card--label">
                        {detailText}
                    </span>
                }
                <h2
                    className="consonant-aspect-ratio-3-2-card--title">
                    {title}
                </h2>
                {
                    description &&
                    <p
                        className="consonant-aspect-ratio-3-2-card--text">
                        {description}
                    </p>
                }
                {footer.map(footerItem => (
                    <CardFooter
                        divider={footerItem.divider}
                        isFluid={footerItem.isFluid}
                        key={uuid()}
                        left={extendFooterData(footerItem.left)}
                        center={extendFooterData(footerItem.center)}
                        right={extendFooterData(footerItem.right)} />
                ))}
            </div>
        </div>
    );
};

AspectRatio3to2Card.propTypes = {
    id: PropTypes.string.isRequired,
    disableBookmarkIco: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    footer: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    isBookmarked: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    dateFormat: PropTypes.string,
    styles: PropTypes.shape({
        backgroundImage: PropTypes.string,
    }),
    contentArea: PropTypes.shape({
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        description: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        detailText: PropTypes.string,
        dateDetailText: PropTypes.shape({
            startTime: PropTypes.string,
            endTime: PropTypes.string,
        }),
    }),
    overlays: PropTypes.shape({
        banner: PropTypes.shape({
            description: PropTypes.string,
            fontColor: PropTypes.string,
            backgroundColor: PropTypes.string,
            icon: PropTypes.string,
        }),
        videoButton: PropTypes.shape({
            url: PropTypes.string,
        }),
        logo: PropTypes.shape({
            src: PropTypes.string,
            alt: PropTypes.string,
            backgroundColor: PropTypes.string,
            borderColor: PropTypes.string,
        }),
        label: PropTypes.shape({
            description: PropTypes.string,
        }),
    }),
};

AspectRatio3to2Card.defaultProps = {
    disableBookmarkIco: false,
    footer: [],
    dateFormat: '',
    styles: {},
    contentArea: {},
    overlays: {},
    isBookmarked: false,
};

export default AspectRatio3to2Card;
