import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { maxAllowedStars, maxPercantage, defaultFilledStars } from './const';

function Rating({ totalStars, starsFilled, label }) {
    let total = totalStars;
    let filled = starsFilled;
    const className = classNames('consonant-rating-infobit', { 'consonant-rating-infobit_neg-margin': !label });

    if (totalStars <= 0 || totalStars > maxAllowedStars) {
        total = maxAllowedStars;
        filled = totalStars > 0 && starsFilled >= 0 ?
            Math.round((starsFilled * maxAllowedStars) / totalStars) :
            defaultFilledStars;
    }

    if (filled < 0 || filled > total) filled = defaultFilledStars;

    const starsFilledMultiplier = Math.round(maxPercantage / total);

    return (
        <div
            className={className}
            data-stars={total}>
            <span
                data-testid="rating-star"
                className="consonant-rating-infobit--stars"
                data-rating={Math.round(filled * starsFilledMultiplier)} />
            {label && <span className="consonant-rating-infobit--text">{label}</span>}
        </div>
    );
}

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
