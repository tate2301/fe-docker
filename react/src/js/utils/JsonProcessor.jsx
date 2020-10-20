import get from 'lodash/get';

import {
    removeDuplicatesByKey,
    truncateList,
    truncateString,
} from './general';

import { filterCardsByDateRange } from './cards';

/**
 *
 *
 * @export
 * @class JsonProcessor
 */
export default class JsonProcessor {
    /**
     * Creates an instance of JsonProcessor.
     * @param {*} cardsToProcess
     * @memberof JsonProcessor
     */
    constructor(cardsToProcess) {
        this.processedCards = cardsToProcess;
    }
    /**
     *
     *
     * @return {*}
     * @memberof JsonProcessor
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
     * @memberof JsonProcessor
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
     * @memberof JsonProcessor
     */
    truncateList(totalCardLimit) {
        this.processedCards = truncateList(totalCardLimit, this.processedCards);
        return this;
    }

    /**
     *
     *
     * @return {*}
     * @memberof JsonProcessor
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
     * @memberof JsonProcessor
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
