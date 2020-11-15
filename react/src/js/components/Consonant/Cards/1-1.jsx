import React from 'react';
import {
    string,
    shape,
} from 'prop-types';

import BaseCard from './Base';
import prettyFormatDate from '../Helpers/prettyFormat';
import { useConfig } from '../Helpers/hooks';
import {
    stylesType,
    contentAreaType,
    overlaysType,
} from '../types/card';
import { CARD_STYLES } from '../Helpers/constants';

const aspectRatio1to1CardType = {
    ctaLink: string,
    id: string.isRequired,
    lh: string,
    styles: shape(stylesType),
    overlays: shape(overlaysType),
    contentArea: shape(contentAreaType),
};

const defaultProps = {
    styles: {},
    ctaLink: '',
    overlays: {},
    contentArea: {},
    lh: '',
};

/**
 * 1:1 aspect ratio card
 *
 * @component
 * @example
 * const props= {
    id: String,
    ctaLink: String,
    lh: String,
    styles: Object,
    contentArea: Object,
    overlays: Object,
 * }
 * return (
 *   <AspectRatio1to1Card {...props}/>
 * )
 */
const AspectRatio1to1Card = (props) => {
    const {
        id,
        ctaLink,
        lh,
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

    return (
        <BaseCard
            id={id}
            lh={lh}
            type={CARD_STYLES.SQUARE}
            styles={styles}
            overlays={overlays}
            ctaLink={ctaLink}
            contentArea={{ ...contentArea, detailText }}>
            {
                description &&
                <p
                    className="consonant-aspect-ratio-1-1-card--text">
                    {description}
                </p>
            }
        </BaseCard>
    );
};

AspectRatio1to1Card.propTypes = aspectRatio1to1CardType;
AspectRatio1to1Card.defaultProps = defaultProps;

export default AspectRatio1to1Card;
