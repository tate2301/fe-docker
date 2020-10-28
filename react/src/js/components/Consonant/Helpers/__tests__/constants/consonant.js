const getNumSelectedFilterItems = [
    {
        filters: [
            { items: [{ selected: true }, { selected: true }] },
            { items: [{ selected: false }, { selected: true }] },
            { items: [{ selected: true }, { selected: false }] },
            { items: [{ selected: false }, { selected: false }] },
        ],
        expectedValue: 4,
    },
];

const makeConfigGetter = [
    {
        config: { user: { name: 'John' } },
        object: 'user',
        key: 'name',
        expectedValue: 'John',
    },
    {
        config: { user: { name: 'John' } },
        object: 'user',
        key: null,
        expectedValue: { name: 'John' },
    },
    {
        config: { user: { } },
        object: 'language',
        key: null,
        expectedValue: 'en',
    },
];

const getDefaultSortOption = [
    {
        config: { sort: { options: [{ sort: 'date' }] } },
        query: 'date',
        expectedValue: { sort: 'date' },
    },
    {
        config: { sort: { options: [{ sort: 'date' }] } },
        query: 'random',
        expectedValue: { label: 'Featured', sort: 'featured' },
    },
];

export default {
    makeConfigGetter,
    getDefaultSortOption,
    getNumSelectedFilterItems,
};
