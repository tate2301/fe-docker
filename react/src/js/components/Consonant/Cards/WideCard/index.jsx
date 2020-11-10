import uuid from 'react-uuid';
import React, {
    useMemo,
    useCallback,
} from 'react';

import { If } from '../../Common';
import { selector } from '../utils';
import CardFooter from '../CardFooter';
import { WideCardType } from '../types';
import { WideCardDefaultProps } from '../constants';
import { INFOBIT_TYPE } from '../../Helpers/constants';
import prettyFormatDate from '../../Helpers/prettyFormat';
import {
    useLazyLoading,
    useConfigSelector,
} from '../../Helpers/hooks';

/**
 * 3:2 aspect ratio card
 *
 * @component
 * @example
 * const props= {
    id: Number,
    title: String,
    label: String,
    footer: Array,
    onClick: Function,
    endTime: : String,
    logoAlt: String,
    logoSrc: String,
    videoURL: String,
    badgeText: String,
    startTime: String,
    cardImage: String,
    bannerIcon: String,
    description: String,
    isBookmarked: Boolean,
    logoBorderColor: String,
    bannerFontColor: String,
    bannerDescription: String,
    disableBookmarkIco: String,
    logoBackgroundColor: String,
    bannerBackgroundColor: String,
 * }
 * return (
 *   <WideCard {...props}/>
 * )
 */
const WideCard = ({
    id,
    lh,
    title,
    label,
    footer,
    onClick,
    endTime,
    logoAlt,
    logoSrc,
    videoURL,
    badgeText,
    startTime,
    cardImage,
    bannerIcon,
    description,
    isBookmarked,
    logoBorderColor,
    bannerFontColor,
    bannerDescription,
    disableBookmarkIco,
    logoBackgroundColor,
    bannerBackgroundColor,
}) => {
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
    const [lazyLoadedImage] = useLazyLoading(imageRef, cardImage);

    const { locale, dateTemlate } = useConfigSelector(selector);

    const cardStyles = useMemo(() => ({
        backgroundImage: `url("${lazyLoadedImage}")`,
    }), [lazyLoadedImage]);

    const bannerStyle = useMemo(() => ({
        color: bannerFontColor,
        backgroundColor: bannerBackgroundColor,
    }), [bannerFontColor, bannerBackgroundColor]);

    const logoStyle = useMemo(() => ({
        borderColor: logoBorderColor,
        backgroundColor: logoBackgroundColor,
    }), [logoBackgroundColor, logoBorderColor]);

    /**
     * Formatted detail text
     * @type {String|null}
     */
    const detailText = useMemo(
        () => (!startTime ? label : prettyFormatDate(startTime, endTime, locale, dateTemlate))
        , [label, startTime, endTime],
    );

    const extendedData = useMemo(() => ({
        [INFOBIT_TYPE.BOOKMARK]: {
            locale,
            dateFormat: dateTemlate,
        },
        [INFOBIT_TYPE.BOOKMARK]: {
            onClick,
            cardId: id,
            isBookmarked,
            disableBookmarkIco,
        },
    }), [locale, dateTemlate, onClick, id, isBookmarked, disableBookmarkIco]);

    const extendFooterData = useCallback(
        data => (data || []).map(item => ({ ...item, ...extendedData[item.type] }))
        , [extendedData],
    );

    const shouldRenderBanner = bannerDescription
        && bannerFontColor
        && bannerBackgroundColor;

    return (
        <div
            id={id}
            daa-lh={lh}
            data-testid="consonant-card-3-2"
            className="consonant-aspect-ratio-3-2-card">
            <div
                ref={imageRef}
                style={cardStyles}
                data-testid="consonant-card--img"
                className="consonant-aspect-ratio-3-2-card--img">
                <If condition={Boolean(shouldRenderBanner)}>
                    <span
                        style={bannerStyle}
                        data-testid="consonant-card--banner"
                        className="consonant-aspect-ratio-3-2-card--banner">
                        <If condition={Boolean(bannerIcon)}>
                            <div className="consonant-aspect-ratio-3-2-card--banner-icon-wrapper">
                                <img
                                    alt=""
                                    loading="lazy"
                                    src={bannerIcon}
                                    data-testid="consonant-card--banner-icon" />
                            </div>
                        </If>
                        <span>{bannerDescription}</span>
                    </span>
                </If>
                <If condition={Boolean(badgeText)}>
                    <span className="consonant-aspect-ratio-3-2-card--badge">
                        {badgeText}
                    </span>
                </If>
                <If condition={Boolean(videoURL)}>
                    <a
                        tabIndex="0"
                        href={videoURL}
                        target="_blank"
                        rel="noreferrer"
                        className="consonant-aspect-ratio-3-2-card--video-ico">
                        {videoURL}
                    </a>
                </If>
                <If condition={Boolean(logoSrc)}>
                    <div
                        style={logoStyle}
                        className="consonant-aspect-ratio-3-2-card--logo">
                        <img width="32" src={logoSrc} alt={logoAlt} loading="lazy" />
                    </div>
                </If>
            </div>
            <div className="consonant-aspect-ratio-3-2-card--inner">
                <If condition={Boolean(detailText)}>
                    <span
                        data-testid="3-2-card--label"
                        className="consonant-aspect-ratio-3-2-card--label">
                        {detailText}
                    </span>
                </If>
                <h2 className="consonant-aspect-ratio-3-2-card--title">{title}</h2>
                <If condition={Boolean(description)}>
                    <p className="consonant-aspect-ratio-3-2-card--text">{description}</p>
                </If>
                {footer.map(({
                    divider, isFluid, left, center, right,
                }) => (
                    <CardFooter
                        key={uuid()}
                        divider={divider}
                        isFluid={isFluid}
                        left={extendFooterData(left)}
                        right={extendFooterData(right)}
                        center={extendFooterData(center)} />
                ))}
            </div>
        </div>
    );
};

WideCard.propTypes = WideCardType;
WideCard.defaultProps = WideCardDefaultProps;

export default WideCard;
