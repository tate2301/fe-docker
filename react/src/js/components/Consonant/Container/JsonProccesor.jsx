import get from 'lodash/get';
import includes from 'lodash/includes';
import {
    removeDuplicatesByKey,
    truncateList,
    truncateString,
} from '../../../utils/general';
import { filterCardsByDateRange } from '../../../utils/cards';
/**
 *
 *
 * @export
 * @class JsonProccesor
 */
export default class JsonProccesor {
    /**
     * Creates an instance of JsonProccesor.
     * @param {*} cardsToProcess
     * @memberof JsonProccesor
     */
    constructor(cardsToProcess) {
        this.processedCards = cardsToProcess;
    }
    /**
     *
     *
     * @return {*}
     * @memberof JsonProccesor
     */
    removeDuplicateCards() {
        this.processedCards = removeDuplicatesByKey(this.processedCards, 'id');
        return this;
    }
    /**
     *
     *
     * @param {*} featuredCards
     * @return {*}
     * @memberof JsonProccesor
     */
    addFeaturedCards(featuredCards) {
        const someFeaturedCards = featuredCards.map(card => ({
            ...card,
            isFeatured: true,
        }));
        this.processedCards = someFeaturedCards.concat(this.processedCards);
        return this;
    }
    /**
     *
     *
     * @param {*} totalCardLimit
     * @return {*}
     * @memberof JsonProccesor
     */
    truncateList(totalCardLimit) {
        this.processedCards = truncateList(totalCardLimit, this.processedCards);
        return this;
    }
    /**
     *
     *
     * @param {*} onlyShowBookmarks
     * @param {*} bookmarkedCardIds
     * @return {*}
     * @memberof JsonProccesor
     */
    keepBookmarkedCardsOnly(onlyShowBookmarks, bookmarkedCardIds) {
        if (onlyShowBookmarks) {
            this.processedCards = this.processedCards.filter(card => includes(
                bookmarkedCardIds,
                card.id,
            ));
        }
        return this;
    }
    /**
     *
     *
     * @return {*}
     * @memberof JsonProccesor
     */
    keepCardsWithinDateRange() {
        this.processedCards = filterCardsByDateRange(this.processedCards);
        return this;
    }
    /**
     *
     *
     * @param {*} truncateTextQty
     * @param {*} onlyShowBookmarks
     * @param {*} bookmarkedCardIds
     * @return {*}
     * @memberof JsonProccesor
     */
    addCardMetaData(truncateTextQty, onlyShowBookmarks, bookmarkedCardIds) {
        this.processedCards = this.processedCards.map(card => ({
            ...card,
            initialTitle: get(card, 'contentArea.title', ''),
            description: truncateString(get(card, 'contentArea.description', ''), truncateTextQty),
            initialText: get(card, 'contentArea.description', ''),
            isBookmarked: bookmarkedCardIds.some(i => i === card.id),
            disableBookmarkIco: onlyShowBookmarks,
        }));
        return this;
    }
}
