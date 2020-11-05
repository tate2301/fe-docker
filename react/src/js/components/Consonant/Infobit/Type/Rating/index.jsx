import React, { useMemo } from 'react';
import classNames from 'classnames';

import { getRating } from './utils';
import { RatingType } from './types';
import { If } from '../../../Common';
import { defaultProps } from './constants';
import { parseToPrimitive } from '../../../Helpers/general';

/**
 * Rating Infobit (shown in 3:2 Card Footer)
 *
 * Displays how many stars should be shown for a giving rating
 *
 * @component
 * @example
 * const props= {
    totalStars: Number,
    starsFilled: Number,
    label: String,
 * }
 * return (
 *   <Rating {...props} />
 * )
 */
const Rating = ({
    label,
    totalStars,
    starsFilled,
}) => {
    const className = classNames({
        'consonant-rating-infobit': true,
        'consonant-rating-infobit_neg-margin': !label,
    });

    const ratingToDisplay = useMemo(() => {
        const total = parseToPrimitive(totalStars);
        const filled = parseToPrimitive(starsFilled);

        return getRating(filled, total);
    }, [starsFilled, totalStars]);

    return (
        <div
            className={className}
            data-stars={totalStars}>
            <span
                data-testid="rating-star"
                data-rating={ratingToDisplay}
                className="consonant-rating-infobit--stars" />
            <If condition={Boolean(label)}>
                <span
                    className="consonant-rating-infobit--text">
                    {label}
                </span>
            </If>
        </div>
    );
};

Rating.propTypes = RatingType;
Rating.defaultProps = defaultProps;

export default Rating;
