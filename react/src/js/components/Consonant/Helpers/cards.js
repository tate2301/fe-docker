import get from 'lodash/get';

export const getCardDate = date => new Date(date).getTime();

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