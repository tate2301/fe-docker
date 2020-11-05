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

// const makeConfigGetter = [
//     {
//         config: { user: { name: 'Some Name' } },
//         object: 'user',
//         key: 'name',
//         expectedValue: 'Some Name',
//     },
//     {
//         config: { user: { name: 'Some Name' } },
//         object: 'user',
//         key: null,
//         expectedValue: { name: 'Some Name' },
//     },
//     {
//         config: { user: { } },
//         object: 'language',
//         key: null,
//         expectedValue: 'en',
//     },
// ];

const getDefaultSortOption = [
    {
        options: [{ sort: 'date' }],
        defaultSort: 'date',
        expectedValue: { sort: 'date' },
    },
    {
        options: [{ sort: 'date' }],
        defaultSort: 'random',
        expectedValue: { label: 'Featured', sort: 'featured' },
    },
];

export default {
    // makeConfigGetter,
    getDefaultSortOption,
    getNumSelectedFilterItems,
};
