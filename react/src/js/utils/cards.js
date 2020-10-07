export const parseCardDate = dateString => dateString.split(' - ').map(d => new Date(d).getTime());

export const filterCardsByDateRange = (_cards) => {
    const currentDate = new Date().getTime();

    return _cards.filter((card) => {
        if (!card.showCardFrom) return true;
        const dates = parseCardDate(_cards);
        if (!dates.every(Number.isInteger)) return false;
        return currentDate >= dates[0] && currentDate <= dates[1];
    });
};
