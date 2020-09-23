export const PAGES_PROPS = [
    { pageCount: 0, totalPages: 1, currentPageNumber: 0 },
    { pageCount: 0, totalPages: 0, currentPageNumber: 1 },
    { pageCount: 1, totalPages: 0, currentPageNumber: 0 },
    { pageCount: 1, totalPages: 0, currentPageNumber: 1 },
    { pageCount: 0, totalPages: 1, currentPageNumber: 1 },
    { pageCount: 1, totalPages: 1, currentPageNumber: 0 },
];

export const DEFAULT_PROPS = {
    pageCount: 4,
    totalPages: 10,
    showItemsPerPage: 10,
    currentPageNumber: 1,
    totalResults: 100,

    onClick: jest.fn(),
};

export const PAGE_LIST = [1, 5, 10, 15];
