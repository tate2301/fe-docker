/* eslint-disable */
import get from 'lodash/get';
import set from 'lodash/set';
import includes from 'lodash/includes';
import produce from 'immer';
import { highlightSearchField } from '../../../utils/rendering';
import {
    chainFromIterable,
    intersection,
    isSuperset,
    sanitizeText,
    removeDuplicatesByKey,
    truncateList,
    truncateString,
} from '../../../utils/general';

import { filterCardsByDateRange } from '../../../utils/cards';

export const shouldDisplayPaginator = (enabled, resultsPerPage, totalResults) => {
    const resultsPerPageNotZero = resultsPerPage > 0;
    const cardLengthExceedsDisplayLimit = totalResults > resultsPerPage;

    return enabled &&
        resultsPerPageNotZero &&
        cardLengthExceedsDisplayLimit;
};


export const getNumCardsToShow = (resultsPerPage, currentPage, totalResults) =>
    Math.min(resultsPerPage * currentPage, totalResults);

export const getTotalPages = (resultsPerPage, totalResults) => {
    if (resultsPerPage === 0) return 0;
    return Math.ceil(totalResults / resultsPerPage);
};

export const getCollectionCards = (showBookmarksOnly, bookmarkedCards, collectionCards) => (
    showBookmarksOnly ? bookmarkedCards : collectionCards
);

export const getBookmarkedCards = (collectionCards) => collectionCards.filter(card => card.isBookmarked);

export const getActiveFilterIds = filters => chainFromIterable(filters.map(f => f.items))
    .filter(item => item.selected)
    .map(item => item.id);

const getUsingXorAndFilter = (filterType, filterTypes) => (
    filterType === filterTypes.XOR || filterType === filterTypes.AND
);

const getUsingOrFilter = (filterType, filterTypes) => (
    filterType === filterTypes.OR
);

export const getFilteredCards = (cards, activeFilters, filterType, filterTypes) => {
    const activeFiltersSet = new Set(activeFilters);

    const usingXorAndFilter = getUsingXorAndFilter(filterType, filterTypes);
    const usingOrFilter = getUsingOrFilter(filterType, filterTypes);

    if (activeFiltersSet.size === 0) return cards;

    return cards.filter((card) => {
        if (!card.tags) {
            return false;
        }

        const tagIds = new Set(card.tags.map(tag => tag.id));

        if (usingXorAndFilter) {
            return isSuperset(tagIds, activeFiltersSet);
        } else if (usingOrFilter) {
            return intersection(tagIds, activeFiltersSet).size;
        }
        throw new Error(`Unrecognized filter type: ${filterType}`);
    });
};

export const highlightCard = (baseCard, searchField, query) => {
    return produce(baseCard, (draftCard) => {
        const searchFieldValue = get(draftCard, searchField, null);
        if (searchFieldValue === null) return;
        const highlightedSearchFieldValue = highlightSearchField(searchFieldValue, query); 
        set(draftCard, searchField, highlightedSearchFieldValue);
    })
}

const cardMatchesQuery = (searchField, card, searchQuery) => {
    const searchFieldValue = get(card, searchField, '');
    const cleanSearchFieldValue = sanitizeText(searchFieldValue);
    return includes(cleanSearchFieldValue, searchQuery);
};

export const getCardsMatchingQuery = (cards, searchFields, query) => {
    const cardsMatchingQuerySet = new Set([]);
    cards.forEach((card) => {
        searchFields.forEach((searchField) => {
            if (cardMatchesQuery(searchField, card, query)) {
                cardsMatchingQuerySet.add(card);
            }
        });
    });
    return Array.from(cardsMatchingQuerySet);
};

export const getAlphabetSortCards = (cards) => {
    return cards.sort((cardOne, cardTwo) => {
        const cardOneTitle = get(cardOne, 'contentArea.title');
        const cardTwoTitle = get(cardTwo, 'contentArea.title');
        return cardOneTitle > cardTwoTitle;
    });
};

export const getReverseAlphabetSortCards = (cards) => {
    return getTitleSortedCards(cards).reverse();
};

export const getFeatureSortCards = (cards, featuredCards) => {
    return featuredCards.concat(cards);
};

export const getDateSortCards = (cards) => {
    return cards.sort((cardOne, cardTwo) => {
        const cardOneTitle = get(cardOne, 'cardDate');
        const cardTwoTitle = get(cardTwo, 'cardDate');
        return cardOneTitle > cardTwoTitle;
    });
};

export const getReverseDateSortCards = (cards) => {
    return getDateSortCards(cards).reverse();
};

export const getCardsMatchingSearch = (query, cards, searchFields) => {
    if (!query) {
        return cards;
    }
    const searchQuery = sanitizeText(query);
    const cardsMatchingQuery = getCardsMatchingQuery(cards, searchFields, searchQuery);
    return cardsMatchingQuery;
};

const joinCardSets = (cardSetOne, cardSetTwo) => {
    return cardSetOne.concat(cardSetTwo);
}

export const processCards = (featuredCards, rawCards) => {
    return removeDuplicatesByKey(joinCardSets(featuredCards, rawCards), 'id');
}

export class CardProccesor {
    constructor(allCards){
        this.allCards = allCards;
    }

    removeDuplicates(){
        this.allCards = removeDuplicatesByKey(this.allCards, 'id');
        return this;
    }

    addFeaturedCards(featuredCards){
        this.allCards = featuredCards.concat(this.allCards);
        return this;
    }

    truncateList(totalCardLimit){
        this.allCards = truncateList(totalCardLimit, this.allCards);
        return this;
    }

    keepBookmarkedCardsOnly(onlyShowBookmarks, bookmarkedCardIds){
        if(onlyShowBookmarks){
            this.allCards = this.allCards.filter(card => includes(bookmarkedCardIds, card.id));
        }
        return this;
    }

    keepCardsWithinDateRange(){
        this.allCards = filterCardsByDateRange(this.allCards);
        return this;
    }

    populateCardMetaData(truncateTextQty, onlyShowBookmarks){
        this.allCards = this.allCards.map(card => ({
            ...card,
            initialTitle: get(card, 'contentArea.title', ''),
            description: truncateString(get(card, 'contentArea.description', ''), truncateTextQty),
            initialText: get(card, 'contentArea.description', ''),
            isBookmarked: false,
            disableBookmarkIco: onlyShowBookmarks,
        }));
        return this;
    }
    
}