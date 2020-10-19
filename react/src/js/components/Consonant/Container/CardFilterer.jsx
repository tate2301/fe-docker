import includes from 'lodash/includes';
import {
    getFilteredCards,
    getCardsMatchingSearch,
    highlightCard,
    getDateAscSort,
    getDateDescSort,
    getFeaturedSort,
    getTitleAscSort,
    getTitleDescSort,
} from './Helpers';
import { filterCardsByDateRange } from '../../../utils/cards';
import { truncateList } from '../../../utils/general';

/**
 *
 *
 * @export
 * @class CardFilterer
 */
export default class CardFilterer {
    /**
     * Creates an instance of CardFilterer.
     * @param {*} cardsToFilter
     * @memberof CardFilterer
     */
    constructor(cardsToFilter) {
        this.someFilteredCards = cardsToFilter;
    }

    /**
     *
     *
     * @param {*} activeFilters
     * @param {*} filterType
     * @param {*} filterTypes
     * @return {*} Chainable
     * @memberof CardFilterer
     */
    filterCards(activeFilters, filterType, filterTypes) {
        this.someFilteredCards = getFilteredCards(
            this.someFilteredCards,
            activeFilters,
            filterType,
            filterTypes,
        );
        return this;
    }

    /**
     *
     *
     * @param {*} searchQuery
     * @param {*} searchFields
     * @return {*} Chainable
     * @memberof CardFilterer
     */
    searchCards(searchQuery, searchFields) {
        const query = searchQuery.trim().toLowerCase();
        const cardsMatchingSearch = getCardsMatchingSearch(
            searchQuery,
            this.someFilteredCards,
            searchFields,
        );

        this.someFilteredCards = cardsMatchingSearch
            .map(card => searchFields.reduce((baseCard, searchField) => highlightCard(
                baseCard,
                searchField,
                query,
            ), card));

        return this;
    }

    /**
     *
     *
     * @param {*} sortOption
     * @return {*} Chainable
     * @memberof CardFilterer
     */
    sortCards(sortOption) {
        const sortType = sortOption ? sortOption.sort.toLowerCase() : null;

        switch (sortType) {
            case 'dateasc':
                this.someFilteredCards = getDateAscSort(this.someFilteredCards);
                break;
            case 'datedesc':
                this.someFilteredCards = getDateDescSort(this.someFilteredCards);
                break;
            case 'featured':
                this.someFilteredCards = getFeaturedSort(this.someFilteredCards);
                break;
            case 'titleasc':
                this.someFilteredCards = getTitleAscSort(this.someFilteredCards);
                break;
            case 'titledesc':
                this.someFilteredCards = getTitleDescSort(this.someFilteredCards);
                break;
            default:
                return this;
        }

        return this;
    }

    /**
     *
     *
     * @return {*} Chainable
     * @memberof CardFilterer
     */
    keepCardsWithinDateRange() {
        this.someFilteredCards = filterCardsByDateRange(this.someFilteredCards);
        return this;
    }
    /**
     *
     *
     * @param {*} onlyShowBookmarks
     * @param {*} bookmarkedCardIds
     * @param {*} showBookmarks
     * @return {*} Chainable
     * @memberof CardFilterer
     */
    keepBookmarkedCardsOnly(onlyShowBookmarks, bookmarkedCardIds, showBookmarks) {
        if (onlyShowBookmarks || showBookmarks) {
            this.someFilteredCards = this.someFilteredCards.filter(card => includes(
                bookmarkedCardIds,
                card.id,
            ));
        }
        return this;
    }

    /**
     *
     *
     * @param {*} totalCardLimit
     * @return {*} Chainable
     * @memberof CardFilterer
     */
    truncateList(totalCardLimit) {
        this.someFilteredCards = truncateList(totalCardLimit, this.someFilteredCards);
        return this;
    }
}
