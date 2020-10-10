import React from 'react';
import PropTypes from 'prop-types';
import { maxAllowedStars, maxPercantage, defaultFilledStars } from './const';

function Rating({ totalStars, starsFilled, label }) {
    let total = totalStars;
    let filled = starsFilled;

    if (totalStars <= 0 || totalStars > maxAllowedStars) {
        total = maxAllowedStars;
        filled = totalStars > 0 && starsFilled >= 0 ?
            Math.round((starsFilled * maxAllowedStars) / totalStars) :
            defaultFilledStars;
    }

    if (starsFilled < 0 || starsFilled > total) filled = defaultFilledStars;

    const starsFilledMultiplier = Math.round(maxPercantage / total);

    return (
        <div className="consonant-rating-infobit">
            <span
                className="consonant-rating-infobit--stars"
                data-stars={total}
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
