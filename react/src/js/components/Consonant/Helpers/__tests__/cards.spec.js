import PROPS from './constants/cards';

import {
    getCardDate,
    filterCardsByDateRange,
} from '../cards';

describe('utils/cards', () => {
    describe('getCardDate', () => {
        PROPS.getCardDate.forEach(({ date, expectedValue }) => {
            test(`shouldn return ${expectedValue} value`, () => {
                const value = getCardDate(date);

                expect(value).toEqual(expectedValue);
            });
        });
    });
    describe('filterCardsByDateRange', () => {
        PROPS.filterCardsByDateRange.forEach(({ cards, expectedValue }) => {
            test('should return filtered cards list', () => {
                const value = filterCardsByDateRange(cards);

                expect(value).toEqual(expectedValue);
            });
        });
    });
});
