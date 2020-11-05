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
    getDefaultSortOption,
    getNumSelectedFilterItems,
};
