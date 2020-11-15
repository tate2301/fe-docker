import React from 'react';
import {
    string,
    shape,
} from 'prop-types';

import BaseCard from './Base';
import {
    stylesType,
    contentAreaType,
    overlaysType,
} from '../types/card';
import { CARD_STYLES } from '../Helpers/constants';

const fullCardType = {
    ctaLink: string,
    id: string.isRequired,
    lh: string,
    styles: shape(stylesType),
    overlays: shape(overlaysType),
    contentArea: shape(contentAreaType),
};

const defaultProps = {
    styles: {},
    lh: '',
    ctaLink: '',
    overlays: {},
    contentArea: {},
};

/**
 * Full card
 *
 * @component
 * @example
 * const props= {
    id: String,
    lh: String,
    ctaLink: String,
    styles: Object,
    contentArea: Object,
    overlays: Object,
 * }
 * return (
 *   <FullCard {...props}/>
 * )
 */
const FullCard = (props) => {
    const {
        id,
        lh,
        ctaLink,
        styles,
        contentArea,
        overlays,
    } = props;

    return (
        <BaseCard
            id={id}
            lh={lh}
            type={CARD_STYLES.FULL}
            styles={styles}
            overlays={overlays}
            ctaLink={ctaLink}
            contentArea={contentArea} />
    );
};

FullCard.propTypes = fullCardType;
FullCard.defaultProps = defaultProps;

export default FullCard;
