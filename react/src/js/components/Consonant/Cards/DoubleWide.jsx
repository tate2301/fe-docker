import React from 'react';
import {
    string,
    shape,
} from 'prop-types';

import { useLazyLoading } from '../Helpers/hooks';
import {
    stylesType,
    contentAreaType,
} from '../types/card';

const doubleWideCardType = {
    ctaLink: string,
    id: string.isRequired,
    lh: string,
    styles: shape(stylesType),
    contentArea: shape(contentAreaType),
};

const defaultProps = {
    styles: {},
    lh: '',
    ctaLink: '',
    contentArea: {},
};

/**
 * Double wide card
 *
 * @component
 * @example
 * const props= {
    id: String,
    ctaLink: String,
    styles: Object,
    contentArea: Object,
 * }
 * return (
 *   <DoubleWideCard {...props}/>
 * )
 */
const DoubleWideCard = (props) => {
    const {
        id,
        lh,
        ctaLink,
        styles: {
            backgroundImage: image,
        },
        contentArea: {
            title,
            description,
            detailText: label,
        },
    } = props;

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

    return (
        <div
            className="consonant-DoubleWideCard"
            daa-lh={lh}
            id={id}>
            <div
                className="consonant-DoubleWideCard-img"
                ref={imageRef}
                style={{ backgroundImage: `url("${lazyLoadedImage}")` }} />
            <a
                href={ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex="0"
                className="consonant-DoubleWideCard-inner">
                {label &&
                    <span className="consonant-DoubleWideCard-label">{label}</span>
                }
                {title &&
                    <h2 className="consonant-DoubleWideCard-title">{title}</h2>
                }
                {description &&
                    <p className="consonant-DoubleWideCard-text">{description}</p>
                }
            </a>
        </div>
    );
};

DoubleWideCard.propTypes = doubleWideCardType;
DoubleWideCard.defaultProps = defaultProps;

export default DoubleWideCard;
