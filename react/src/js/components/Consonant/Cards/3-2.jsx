import React from 'react';
import cuid from 'cuid';
import {
    string,
    shape,
    bool,
    func,
    arrayOf,
} from 'prop-types';

import BaseCard from './Base';
import CardFooter from './CardFooter/CardFooter';
import prettyFormatDate from '../Helpers/prettyFormat';
import {
    CARD_STYLES,
    INFOBIT_TYPE,
} from '../Helpers/constants';
import { useConfig } from '../Helpers/hooks';
import {
    stylesType,
    contentAreaType,
    overlaysType,
    footerType,
} from '../types/card';

const aspectRatio3to2CardType = {
    isBookmarked: bool,
    dateFormat: string,
    id: string.isRequired,
    lh: string,
    styles: shape(stylesType),
    disableBookmarkIco: bool,
    onClick: func.isRequired,
    overlays: shape(overlaysType),
    footer: arrayOf(shape(footerType)),
    contentArea: shape(contentAreaType),
};

const defaultProps = {
    footer: [],
    styles: {},
    overlays: {},
    dateFormat: '',
    contentArea: {},
    lh: '',
    isBookmarked: false,
    disableBookmarkIco: false,
};

/**
 * 3:2 aspect ratio card
 *
 * @component
 * @example
 * const props= {
    isBookmarked: Boolean,
    dateFormat: String,
    id: String,
    lh: String,
    styles: Object,
    disableBookmarkIco: Boolean,
    onClick: Function,
    overlays: Object,
    footer: Array,
    contentArea: Object,
 * }
 * return (
 *   <AspectRatio3to2Card {...props}/>
 * )
 */
const AspectRatio3to2Card = (props) => {
    const {
        id,
        footer,
        lh,
        disableBookmarkIco,
        isBookmarked,
        onClick,
        dateFormat,
        styles,
        contentArea,
        overlays,
    } = props;

    const getConfig = useConfig();

    /**
     **** Authored Configs ****
     */
    const i18nFormat = getConfig('collection', 'i18n.prettyDateIntervalFormat');
    const locale = getConfig('language', '');

    /**
     * Start date and time
     * @type {String}
     */
    const { startTime } = contentArea.dateDetailText;

    /**
     * End date and time
     * @type {String}
     */
    const { endTime } = contentArea.dateDetailText;

    /**
     * Formatted date string
     * @type {String}
     */
    const prettyDate = startTime ? prettyFormatDate(startTime, endTime, locale, i18nFormat) : '';

    /**
     * Label of the card to be shown incase no card date provided
     * @type {String}
     */
    const label = contentArea.detailText;

    /**
     * Detail text
     * @type {String}
     */
    const detailText = prettyDate || label;

    /**
     * Card description
     * @type {String}
     */
    const { description } = contentArea;

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
        <BaseCard
            id={id}
            lh={lh}
            type={CARD_STYLES.WIDE}
            styles={styles}
            overlays={overlays}
            contentArea={{ ...contentArea, detailText }}>
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
                    key={cuid()}
                    left={extendFooterData(footerItem.left)}
                    center={extendFooterData(footerItem.center)}
                    right={extendFooterData(footerItem.right)} />
            ))}
        </BaseCard>
    );
};

AspectRatio3to2Card.propTypes = aspectRatio3to2CardType;
AspectRatio3to2Card.defaultProps = defaultProps;

export default AspectRatio3to2Card;
