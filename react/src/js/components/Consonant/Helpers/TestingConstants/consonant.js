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
    getDefaultSortOption,
    getNumSelectedFilterItems,
};
