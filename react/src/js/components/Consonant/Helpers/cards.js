import get from 'lodash/get';

/**
 * Converts date to the number of milliseconds
 * @param {String} date - date as a string
 * @returns {Number} - a number representing the milliseconds elapsed between
 * 1 January 1970 00:00:00 UTC and the given date
 */
export const getCardDate = date => new Date(date).getTime();

/**
 * Filters cards by the date range set in the card
 * @param {Array} _cards - cards array
 * @returns {Array} - filtered cards array:
 * - cards with no date range set
 * - cards with date range that contains current date
 */
export const filterCardsByDateRange = (_cards) => {
    const currentDate = new Date().getTime();

    return _cards.filter((card) => {
        const showCardFromField = get(card, 'showCard.from', '');
        const showCardUntilField = get(card, 'showCard.until', '');

        if (!showCardFromField || !showCardUntilField) return true;

        const showCardFromDate = getCardDate(showCardFromField);
        const showCardUntilDate = getCardDate(showCardUntilField);

        return currentDate >= showCardFromDate && currentDate <= showCardUntilDate;
    });
};
