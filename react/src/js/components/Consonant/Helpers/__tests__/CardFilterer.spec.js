import { render, queryByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import PROPS from '../TestingConstants/CardFilterer';

import CardFilterer from '../CardFilterer';

describe('utils/CardFilterer', () => {
    describe('filterCards', () => {
        PROPS.filterCards.forEach(({
            cards, activeFilters, filterType, filterTypes, expectedValue,
        }) => {
            test('should return filtered cards', () => {
                const cardFilterer = new CardFilterer(cards);

                const { filteredCards } = cardFilterer.filterCards(
                    activeFilters,
                    filterType,
                    filterTypes,
                );

                expect(filteredCards).toEqual(expectedValue);
            });
        });
    });
    describe('sortCards', () => {
        PROPS.sortCards.forEach(({ cards, sortOption, expectedValue }) => {
            test('should return sorted cards', () => {
                const cardFilterer = new CardFilterer(cards);

                const { filteredCards } = cardFilterer.sortCards(sortOption);

                expect(filteredCards).toEqual(expectedValue);
            });
        });
    });
    describe('keepCardsWithinDateRange', () => {
        PROPS.keepCardsWithinDateRange.forEach(({ cards, expectedValue }) => {
            test(`shouldn't return ${expectedValue} value`, () => {
                const cardFilterer = new CardFilterer(cards);

                const { filteredCards } = cardFilterer.keepCardsWithinDateRange();

                expect(filteredCards).toEqual(expectedValue);
            });
        });
    });
    describe('keepBookmarkedCardsOnly', () => {
        PROPS.keepBookmarkedCardsOnly.forEach(({
            cards,
            onlyShowBookmarks,
            bookmarkedCardIds,
            showBookmarks,
            expectedValue,
        }) => {
            test('should return only bookmarked cards', () => {
                const cardFilterer = new CardFilterer(cards);

                const { filteredCards } = cardFilterer.keepBookmarkedCardsOnly(
                    onlyShowBookmarks,
                    bookmarkedCardIds,
                    showBookmarks,
                );

                expect(filteredCards).toEqual(expectedValue);
            });
        });
    });
    describe('truncateList', () => {
        PROPS.truncateList.forEach(({ cards, totalCardLimit, expectedValue }) => {
            test('should return truncated array', () => {
                const cardFilterer = new CardFilterer(cards);

                const { filteredCards } = cardFilterer.truncateList(totalCardLimit);

                expect(filteredCards).toEqual(expectedValue);
            });
        });
    });
    describe('searchCards', () => {
        test('should highlight searched field correctly', () => {
            const query = 'name';
            const searchFields = ['title'];
            const cards = [{ title: 'title name' }, { description: 'description' }, { title: 'some string' }];

            const cardFilterer = new CardFilterer(cards);

            const { filteredCards } = cardFilterer.searchCards(query, searchFields);

            const { container } = render(filteredCards.map(({ title }) => title || null));

            const highlightElement = queryByTestId(container, 'consonant-search-result');

            expect(highlightElement).not.toBeNull();
            expect(highlightElement).toHaveTextContent('name');
        });
        test('shouldn`t highlight searched field when query.length < 3', () => {
            const query = '12';
            const searchFields = ['title'];
            const cards = [{ title: 'title name' }, { description: 'description' }, { title: 'some string' }];

            const cardFilterer = new CardFilterer(cards);

            const { filteredCards } = cardFilterer.searchCards(query, searchFields);

            expect(filteredCards).toEqual([]);
        });
    });
});
