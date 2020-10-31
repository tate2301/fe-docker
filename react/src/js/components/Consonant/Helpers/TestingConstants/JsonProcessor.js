const removeDuplicateCards = [
    {
        cards: [{ id: 1 }, { id: 1 }, { id: 2 }],
        expectedValue: [{ id: 1 }, { id: 2 }],
    },
];

const addFeaturedCards = [
    {
        cards: [{ id: 1 }, { id: 2 }],
        featuredCards: [{ id: 3 }, { id: 4 }],
        expectedValue: [
            { id: 3, isFeatured: true },
            { id: 4, isFeatured: true },
            { id: 1 },
            { id: 2 },
        ],
    },
];

const addCardMetaData = [
    {
        cards: [
            {
                id: 1,
                overlays: { banner: { description: 'overlays.description 1' } },
                contentArea: {
                    title: 'title 1',
                    description: '12345',
                    detailText: 'detailText 1',
                    dateDetailText: '',
                },
            },
            {
                id: 2,
                overlays: { banner: { description: undefined } },
                contentArea: {
                    title: undefined,
                    description: undefined,
                    detailText: undefined,
                    dateDetailText: undefined,
                },
            },
            {
                id: 3,
                overlays: { banner: { description: 'overlays.description 2' } },
                contentArea: {
                    title: 'title 2',
                    description: '123456',
                    detailText: 'detailText 2',
                    dateDetailText: '',
                },
            },
        ],
        truncateTextQty: 5,
        onlyShowBookmarks: false,
        bookmarkedCardIds: [1],
        expectedValue: [
            {
                id: 1,
                overlays: { banner: { description: 'overlays.description 1' } },
                contentArea: {
                    title: 'title 1',
                    description: '12345',
                    detailText: 'detailText 1',
                    dateDetailText: '',
                },
                description: '12345',
                isBookmarked: true,
                disableBookmarkIco: false,
                initial: {
                    title: 'title 1',
                    description: '12345',
                    bannerText: 'overlays.description 1',
                    dateDetailText: '',
                    detailText: 'detailText 1',
                },
            },
            {
                id: 2,
                overlays: { banner: { description: undefined } },
                contentArea: {
                    title: undefined,
                    description: undefined,
                    detailText: undefined,
                    dateDetailText: undefined,
                },
                description: '',
                isBookmarked: false,
                disableBookmarkIco: false,
                initial: {
                    title: '',
                    description: '',
                    bannerText: '',
                    dateDetailText: '',
                    detailText: '',
                },
            },
            {
                id: 3,
                overlays: { banner: { description: 'overlays.description 2' } },
                contentArea: {
                    title: 'title 2',
                    description: '123456',
                    detailText: 'detailText 2',
                    dateDetailText: '',
                },
                description: '12345...',
                isBookmarked: false,
                disableBookmarkIco: false,
                initial: {
                    title: 'title 2',
                    description: '123456',
                    bannerText: 'overlays.description 2',
                    dateDetailText: '',
                    detailText: 'detailText 2',
                },
            },
        ],
    },
];

export default {
    addCardMetaData,
    addFeaturedCards,
    removeDuplicateCards,
};
