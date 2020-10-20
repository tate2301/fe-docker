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
} from '../../../utils/general';

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
        // const highlightedSearchFieldValue = highlightSearchField(searchFieldValue, query); 
        // set(draftCard, searchField, highlightedSearchFieldValue);
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

export const getTitleAscSort = (cards) => {
    return cards.sort((cardOne, cardTwo) => {
        const cardOneTitle = get(cardOne, 'contentArea.title');
        const cardTwoTitle = get(cardTwo, 'contentArea.title');
        return cardOneTitle.localeCompare(cardTwoTitle);
    });
};

export const getTitleDescSort = (cards) => {
    return getTitleAscSort(cards).reverse();
};

export const getFeaturedSort = (cards) => {
    return getTitleAscSort(cards).sort((a, b) => {
        if (a.isFeatured && b.isFeatured) {
            return a.initialTitle < b.initialTitle ? -1 : 0;
        } else if (a.isFeatured) {
            return -1;
        } else if (b.isFeatured) {
            return 1;
        }
        return 0;
    });
};

export const getDateAscSort = (cards) => {
    return cards.sort((cardOne, cardTwo) => {
        const cardOneDate = get(cardOne, 'cardDate');
        const cardTwoDate = get(cardTwo, 'cardDate');
        return cardOneDate.localeCompare(cardTwoDate);
    });
};

export const getDateDescSort = (cards) => {
    return getDateAscSort(cards).reverse();
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

export const getUpdatedCardBookmarkData = (cards, bookmarkedCardIds) => {
   return cards.map(card => ({
        ...card,
        isBookmarked: bookmarkedCardIds.some(i => i === card.id),
    }));
}