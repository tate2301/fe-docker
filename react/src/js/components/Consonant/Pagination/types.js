import {
    func,
    number,
} from 'prop-types';

export const PaginatorType = {
    onClick: func.isRequired,
    pageCount: number.isRequired,
    totalPages: number.isRequired,
    totalResults: number.isRequired,
    showItemsPerPage: number.isRequired,
    currentPageNumber: number.isRequired,
};

export const LoadMoreType = {
    show: number.isRequired,
    total: number.isRequired,
    onClick: func.isRequired,
};

export const RangeItemType = {
    item: number.isRequired,
    onClick: func.isRequired,
    currentPage: number.isRequired,
};
