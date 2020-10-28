import PROPS from './constants/general';
import jestMocks from '../../Testing/Utils/JestMocks';

import {
    chain,
    isObject,
    sortByKey,
    mapObject,
    isNullish,
    isSuperset,
    intersection,
    sanitizeText,
    truncateList,
    truncateString,
    generateRange,
    getPageStartEnd,
    getStartNumber,
    getEndNumber,
    stopPropagation,
    parseToPrimitive,
    chainFromIterable,
    removeDuplicatesByKey,
    isAtleastOneFilterSelected,
    saveBookmarksToLocalStorage,
    readBookmarksFromLocalStorage,
} from '../general';

describe('utils/general', () => {
    jestMocks.localStorage();

    describe('localStorage', () => {
        afterEach(() => {
            window.localStorage.clear();
        });

        describe('saveBookmarksToLocalStorage', () => {
            test('should save item to localStorage', () => {
                const list = [1, 2, 3];
                const stringifyList = JSON.stringify(list, null, 2);

                saveBookmarksToLocalStorage(list);

                const bookmarksValue = window.localStorage.getItem('bookmarks');

                expect(bookmarksValue).toEqual(stringifyList);
            });
        });
        describe('readBookmarksFromLocalStorage', () => {
            PROPS.readBookmarksFromLocalStorage.forEach(({ value, expectedValue }) => {
                test(`shouldn return ${expectedValue}`, () => {
                    window.localStorage.setItem('bookmarks', value);

                    const bookmarksValue = readBookmarksFromLocalStorage();

                    expect(bookmarksValue).toEqual(expectedValue);
                });
            });
        });
    });

    describe('truncateString', () => {
        PROPS.truncateString.forEach(({ str, num, expectedValue }) => {
            test(`shouldn return ${expectedValue} value`, () => {
                const value = truncateString(str, num);

                expect(value).toEqual(expectedValue);
            });
        });
    });
    describe('truncateList', () => {
        PROPS.truncateList.forEach(({ limit, list, expectedValue }) => {
            test(`shouldn return array length === ${expectedValue}`, () => {
                const value = truncateList(limit, list);

                expect(value).toHaveLength(expectedValue);
            });
        });
    });
    describe('removeDuplicatesByKey', () => {
        PROPS.removeDuplicatesByKey.forEach(({ list, key, expectedValue }) => {
            test(`shouldn return array length === ${expectedValue}`, () => {
                const value = removeDuplicatesByKey(list, key);

                expect(value).toEqual(expectedValue);
            });
        });
    });
    describe('chain', () => {
        test('shouldn create new array from arguments', () => {
            const arrayFromArguments = chain(1, 'string', null, undefined);

            expect(arrayFromArguments).toEqual([1, 'string', null, undefined]);
        });
    });
    describe('chainFromIterable', () => {
        test('shouldn clone array', () => {
            const clonedArray = chainFromIterable([1, 'string', null, undefined]);

            expect(clonedArray).toEqual([1, 'string', null, undefined]);
        });
    });
    describe('isSuperset', () => {
        PROPS.isSuperset.forEach(({ superset, subset, expectedValue }) => {
            test('should return true if subset is a part of superset, else should return false', () => {
                const value = isSuperset(superset, subset);

                expect(value).toEqual(expectedValue);
            });
        });
    });
    describe('intersection', () => {
        PROPS.intersection.forEach(({ superset, subset, expectedValue }) => {
            test('should return a new set with the matched values', () => {
                const value = intersection(superset, subset);

                expect(value).toEqual(expectedValue);
            });
        });
    });
    describe('sortByKey', () => {
        PROPS.sortByKey.forEach(({ iterable, keyFunc, expectedValue }) => {
            test('should return sorted object', () => {
                const value = sortByKey(iterable, keyFunc);

                expect(value).toEqual(expectedValue);
            });
        });
    });
    describe('sanitizeText', () => {
        PROPS.sanitizeText.forEach(({ text, expectedValue }) => {
            test('should return sanitaized text', () => {
                const value = sanitizeText(text);

                expect(value).toEqual(expectedValue);
            });
        });
    });
    describe('mapObject', () => {
        PROPS.mapObject.forEach(({ object, func, expectedValue }) => {
            test('should return new object with mapped values', () => {
                const value = mapObject(object, func);

                expect(value).toEqual(expectedValue);
            });
        });
    });
    describe('isObject', () => {
        PROPS.isObject.forEach(({ val, expectedValue }) => {
            test('should return true if value is object, else return false', () => {
                const value = isObject(val);

                expect(value).toEqual(expectedValue);
            });
        });
    });
    describe('parseToPrimitive', () => {
        PROPS.parseToPrimitive.forEach(({ value, expectedValue }) => {
            test('should recursively parse to primitive', () => {
                const val = parseToPrimitive(value);

                expect(val).toEqual(expectedValue);
            });
        });
    });
    describe('isNullish', () => {
        PROPS.isNullish.forEach(({ val, expectedValue }) => {
            test('should return true if value is undefined/null/NaN, else return false', () => {
                const value = isNullish(val);

                expect(value).toEqual(expectedValue);
            });
        });
    });
    describe('isAtleastOneFilterSelected', () => {
        PROPS.isAtleastOneFilterSelected.forEach(({ filters, expectedValue }) => {
            test('should return true if at least one filter is selected', () => {
                const value = isAtleastOneFilterSelected(filters);

                expect(value).toEqual(expectedValue);
            });
        });
    });
    describe('stopPropagation', () => {
        test('should call stopPropaganation', () => {
            const handleStopPropaganation = jest.fn();

            stopPropagation({ stopPropagation: handleStopPropaganation });

            expect(handleStopPropaganation).toHaveBeenCalledTimes(1);
        });
    });
    describe('generateRange', () => {
        PROPS.generateRange.forEach(({ startVal, end, expectedValue }) => {
            test('should return generated range', () => {
                const value = generateRange(startVal, end);

                expect(value).toEqual(expectedValue);
            });
        });
    });
    describe('getPageStartEnd', () => {
        PROPS.getPageStartEnd.forEach(({
            currentPageNumber, pageCount, totalPages, expectedValue,
        }) => {
            test('should return array with start and end', () => {
                const value = getPageStartEnd(
                    currentPageNumber,
                    pageCount,
                    totalPages,
                );

                expect(value).toEqual(expectedValue);
            });
        });
    });
    describe('getStartNumber', () => {
        PROPS.getStartNumber.forEach(({
            currentPageNumber, showItemsPerPage, expectedValue,
        }) => {
            test('should return start number', () => {
                const value = getStartNumber(
                    currentPageNumber,
                    showItemsPerPage,
                );

                expect(value).toEqual(expectedValue);
            });
        });
    });
    describe('getEndNumber', () => {
        PROPS.getEndNumber.forEach(({
            currentPageNumber, showItemsPerPage, totalResults, expectedValue,
        }) => {
            test('should return start number', () => {
                const value = getEndNumber(
                    currentPageNumber,
                    showItemsPerPage,
                    totalResults,
                );

                expect(value).toEqual(expectedValue);
            });
        });
    });
});
