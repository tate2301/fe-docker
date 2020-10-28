const readBookmarksFromLocalStorage = [
    {
        value: JSON.stringify([1, 2, 3]),
        expectedValue: [1, 2, 3],
    },
    {
        value: JSON.stringify(123),
        expectedValue: [],
    },
];

const truncateString = [
    {
        str: '123456789',
        num: 10,
        expectedValue: '123456789',
    },
    {
        str: '123456789',
        num: 1,
        expectedValue: '1...',
    },
];

const truncateList = [
    {
        limit: -1,
        list: [1, 2, 3],
        // returned array length
        expectedValue: 3,
    },
    {
        limit: 0,
        list: [1, 2, 3],
        // returned array length
        expectedValue: 0,
    },
    {
        limit: 1,
        list: [1, 2, 3],
        // returned array length
        expectedValue: 1,
    },
];

const removeDuplicatesByKey = [
    {
        key: 'id',
        list: [{ id: 1 }, { id: 1 }],
        expectedValue: [{ id: 1 }],
    },
    {
        key: 'id',
        list: [{ id: 1 }, { id: 1 }, { id: 2 }],
        expectedValue: [{ id: 1 }, { id: 2 }],
    },
    {
        key: 'id',
        list: [{ id: 1 }, { id: 2 }],
        expectedValue: [{ id: 1 }, { id: 2 }],
    },
    {
        key: 'randomKey',
        list: [{ randomKey: 1 }, { randomKey: 1 }, { randomKey: 1 }],
        expectedValue: [{ randomKey: 1 }],
    },
];

const isSuperset = [
    {
        superset: new Set([1, 2, 3]),
        subset: new Set([1]),
        expectedValue: true,
    },
    {
        superset: new Set([1, 2, 3]),
        subset: new Set([2, 3]),
        expectedValue: true,
    },
    {
        superset: new Set([1, 2, 3]),
        subset: new Set([2, 3, 4]),
        expectedValue: false,
    },
    {
        superset: new Set([1, 2, 3]),
        subset: new Set([4]),
        expectedValue: false,
    },
];

const intersection = [
    {
        superset: new Set([1, 2, 3]),
        subset: new Set([1]),
        expectedValue: new Set([1]),
    },
    {
        superset: new Set([1, 2, 3]),
        subset: new Set([2, 3]),
        expectedValue: new Set([2, 3]),
    },
    {
        superset: new Set([1, 2, 3]),
        subset: new Set([4]),
        expectedValue: new Set(),
    },
];

const sortByKey = [
    {
        iterable: [{ id: 1 }, { id: 2 }, { id: 1 }],
        keyFunc: ({ id }) => id,
        expectedValue: [{ id: 1 }, { id: 1 }, { id: 2 }],
    },
    {
        iterable: [{ id: 3 }, { id: 1 }, { id: 2 }, { id: 5 }, { id: 4 }],
        keyFunc: ({ id }) => id,
        expectedValue: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    },
    {
        iterable: [{ id: 3 }, { id: 1 }, { id: 2 }, { id: 5 }, { id: 4 }],
        keyFunc: ({ id }) => -id,
        expectedValue: [{ id: 5 }, { id: 4 }, { id: 3 }, { id: 2 }, { id: 1 }],
    },
];

const sanitizeText = [
    {
        text: 'text text',
        expectedValue: 'text text',
    },
    {
        text: ' teXT TExt ',
        expectedValue: 'text text',
    },
];

const mapObject = [
    {
        object: { id: 1, name: 'Some Name', surname: 'Some Surname' },
        func: value => value,
        expectedValue: { id: 1, name: 'Some Name', surname: 'Some Surname' },
    },
    {
        object: { id: 1, name: 'Some Name', surname: 'Some Surname' },
        func: value => `${typeof value} ${value}`,
        expectedValue: {
            id: 'number 1',
            name: 'string Some Name',
            surname: 'string Some Surname',
        },
    },
];

const isObject = [
    {
        val: {},
        expectedValue: true,
    },
    {
        val: 1,
        expectedValue: false,
    },
    {
        val: 'string',
        expectedValue: false,
    },
    {
        val: null,
        expectedValue: false,
    },
    {
        val: NaN,
        expectedValue: false,
    },
    {
        val: undefined,
        expectedValue: false,
    },
    {
        val: [],
        expectedValue: false,
    },
    {
        val: () => {},
        expectedValue: false,
    },
    {
        val: new Date(),
        expectedValue: false,
    },
    {
        val: new Set(),
        expectedValue: false,
    },
    {
        val: new Map(),
        expectedValue: false,
    },
];

const parseToPrimitive = [
    {
        value: 1,
        expectedValue: 1,
    },
    {
        value: '1',
        expectedValue: 1,
    },
    {
        value: 'string',
        expectedValue: 'string',
    },
    {
        value: '[]',
        expectedValue: [],
    },
    {
        value: '{}',
        expectedValue: {},
    },
    {
        value: [
            1,
            '1',
            'string',
            { id: 1 },
            { id: '1' },
            [1, 2, 3],
            ['1', '2', '3'],
            '["1", "2", "3"]',
        ],
        expectedValue: [
            1,
            1,
            'string',
            { id: 1 },
            { id: 1 },
            [1, 2, 3],
            [1, 2, 3],
            ['1', '2', '3'],
        ],
    },
    {
        value: {
            key1: 1,
            key2: '1',
            key3: 'string',
            key4: { id: 1 },
            key5: { id: '1' },
            key6: [1, 2, 3],
            key7: ['1', '2', '3'],
            key8: '["1", "2", "3"]',
        },
        expectedValue: {
            key1: 1,
            key2: 1,
            key3: 'string',
            key4: { id: 1 },
            key5: { id: 1 },
            key6: [1, 2, 3],
            key7: [1, 2, 3],
            key8: ['1', '2', '3'],
        },
    },
];

const isNullish = [
    {
        val: undefined,
        expectedValue: true,
    },
    {
        val: null,
        expectedValue: true,
    },
    {
        val: NaN,
        expectedValue: true,
    },
    {
        val: {},
        expectedValue: false,
    },
    {
        val: 1,
        expectedValue: false,
    },
    {
        val: 'string',
        expectedValue: false,
    },
    {
        val: [],
        expectedValue: false,
    },
    {
        val: () => {},
        expectedValue: false,
    },
    {
        val: new Date(),
        expectedValue: false,
    },
    {
        val: new Set(),
        expectedValue: false,
    },
    {
        val: new Map(),
        expectedValue: false,
    },
];

const isAtleastOneFilterSelected = [
    {
        filters: [{ items: { selected: false } }],
        expectedValue: false,
    },
    {
        filters: [{ items: { selected: false } }, { items: { selected: true } }],
        expectedValue: true,
    },
];

const generateRange = [
    {
        startVal: 0,
        end: 5,
        expectedValue: [0, 1, 2, 3, 4, 5],
    },
    {
        startVal: 5,
        end: 0,
        expectedValue: [5, 4, 3, 2, 1, 0],
    },
];

const getPageStartEnd = [
    {
        currentPageNumber: 0,
        pageCount: 0,
        totalPages: 0,
        expectedValue: [1, 0],
    },
    {
        currentPageNumber: 0,
        pageCount: 4,
        totalPages: 4,
        expectedValue: [1, 4],
    },
    {
        currentPageNumber: 4,
        pageCount: 0,
        totalPages: 4,
        expectedValue: [4, 4],
    },
    {
        currentPageNumber: 4,
        pageCount: 4,
        totalPages: 0,
        expectedValue: [1, 0],
    },
    {
        currentPageNumber: -1,
        pageCount: 4,
        totalPages: 4,
        expectedValue: [1, 4],
    },
    {
        currentPageNumber: 4,
        pageCount: -1,
        totalPages: 4,
        expectedValue: [5, 3],
    },
    {
        currentPageNumber: 4,
        pageCount: 4,
        totalPages: -1,
        expectedValue: [1, -1],
    },
];

const getStartNumber = [
    {
        currentPageNumber: 1,
        showItemsPerPage: 0,
        expectedValue: 1,
    },
    {
        currentPageNumber: 2,
        showItemsPerPage: 2,
        expectedValue: 3,
    },
    {
        currentPageNumber: 2,
        showItemsPerPage: 0,
        expectedValue: 1,
    },
];

const getEndNumber = [
    {
        currentPageNumber: 1,
        showItemsPerPage: 1,
        totalResults: 2,
        expectedValue: 1,
    },
    {
        currentPageNumber: 2,
        showItemsPerPage: 2,
        totalResults: 3,
        expectedValue: 3,
    },
];

export default {
    isObject,
    generateRange,
    getPageStartEnd,
    getStartNumber,
    getEndNumber,
    sortByKey,
    mapObject,
    isNullish,
    isSuperset,
    intersection,
    sanitizeText,
    truncateList,
    truncateString,
    parseToPrimitive,
    removeDuplicatesByKey,
    isAtleastOneFilterSelected,
    readBookmarksFromLocalStorage,
};
