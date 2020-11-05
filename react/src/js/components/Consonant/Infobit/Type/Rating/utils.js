import {
    scalingFactor,
    maxAllowedStars,
    defaultTotalStars,
    defaultFilledStars,
} from './constants';

/**
* Will calculate the rating (percentage) that is shown
* @param {Number} starsFilled - How many stars should be filled
* @param {Number} totalStars - Total amount of stars to display
* @returns {Number} - Rating Percentage
*/
// eslint-disable-next-line import/prefer-default-export
export const getRating = (starsFilled, totalStars) => {
    const starsFilledNotValid = starsFilled < 0 || starsFilled > totalStars;
    const totalStarsNotValid = totalStars <= 0 || totalStars > maxAllowedStars;

    const filled = starsFilledNotValid
        ? defaultFilledStars
        : starsFilled;

    const total = totalStarsNotValid
        ? defaultTotalStars
        : totalStars;

    const ratingPercentage = filled / total;
    const rating = Math.round(ratingPercentage * scalingFactor);

    return rating;
};
