import get from 'lodash/get';
export const getCardDate = date => new Date(date).getTime();

export const filterCardsByDateRange = (_cards) => {
    const currentDate = new Date().getTime();

    return _cards.filter((card) => {
        let showCardFromField = get(card, 'showCard.from', '');
        let showCardUntilField = get(card, 'showCard.until', '');

        if (!showCardFromField || !showCardUntilField) return true;

        let showCardFromDate = getCardDate(showCardFromField);
        let showCardUntilDate = getCardDate(showCardUntilField);

        return currentDate >= showCardFromDate && currentDate <= showCardUntilDate;
    });
};
