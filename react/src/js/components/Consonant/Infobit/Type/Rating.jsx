import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const defaultFilledStars = 0;
const maxAllowedStars = 5;

/**
* Will calculate the rating (percentage) that is shown
* @param {Int} id - How many stars should be filled
* @param {Int} id - Total amount of stars to display
* @returns {Int} - Rating Percentage
*/
const getRating = (starsFilled, totalStars) => {
    const starsFilledNotValid = starsFilled < 0 || starsFilled > totalStars;
    const totalStarsNotValid = totalStars <= 0 || totalStars > maxAllowedStars;

    if (starsFilledNotValid) {
        /* eslint-disable-next-line no-param-reassign */
        starsFilled = defaultFilledStars;
    }

    if (totalStarsNotValid) {
        /* eslint-disable-next-line no-param-reassign */
        totalStars = Number.MAX_SAFE_INTEGER;
    }

    const scalingFactor = 100;
    const ratingPercentage = starsFilled / totalStars;
    const rating = Math.round(ratingPercentage * scalingFactor);
    return rating;
};

/**
 * Rating Infobit (shown in 3:2 Card Footer)
 *
 * Displays how many stars should be shown for a giving rating
 *
 * @component
 * @example
 * const props= {
    totalStars: Int,
    starsFilled: Int,
    label: String,
 * }
 * return (
 *   <Rating {...props}/>
 * )
 */
const Rating = ({
    totalStars,
    starsFilled,
    label,
}) => {
    const className = classNames({
        'consonant-rating-infobit': true,
        'consonant-rating-infobit_neg-margin': !label,
    });

    const ratingToDisplay = getRating(starsFilled, totalStars);

    return (
        <div
            className={className}
            data-stars={totalStars}>
            <span
                data-testid="rating-star"
                className="consonant-rating-infobit--stars"
                data-rating={ratingToDisplay} />
            {label &&
                <span
                    className="consonant-rating-infobit--text">
                    {label}
                </span>
            }
        </div>
    );
};

Rating.propTypes = {
    totalStars: PropTypes.number,
    starsFilled: PropTypes.number,
    label: PropTypes.string,
};

Rating.defaultProps = {
    totalStars: maxAllowedStars,
    starsFilled: defaultFilledStars,
    label: '',
};

export default Rating;
