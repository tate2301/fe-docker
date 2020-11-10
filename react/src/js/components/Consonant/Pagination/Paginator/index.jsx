import React, { useMemo } from 'react';

import RangeItem from './RangeItem';
import { PaginatorType } from '../types';
import { paginatorSelector } from '../utils';
import { useConfigSelector } from '../../Helpers/hooks';
import {
    template,
    getEndNumber,
    generateRange,
    getStartNumber,
    getPageStartEnd,
} from '../../Helpers/general';

/**
 * Paginator - handles navigating between pages 1 to n for users
 *
 * @component
 * @example
 * const props= {
    pageCount: Number,
    currentPageNumber: Number,
    totalPages: Number,
    onClick: Function,
    showItemsPerPage: Boolean,
    totalResults: Number,
 * }
 * return (
 *   <Paginator {...props}/>
 * )
 */
const Paginator = ({
    onClick,
    pageCount,
    totalPages,
    totalResults,
    showItemsPerPage,
    currentPageNumber,
}) => {
    const {
        prevLabel,
        nextLabel,
        quantityText,
    } = useConfigSelector(paginatorSelector);

    const pageRange = useMemo(() => {
        /**
         * Start and end indexes of pages to build
         * @type {Number, Number}
         */
        const [pageStart, pageEnd] = getPageStartEnd(currentPageNumber, pageCount, totalPages);

        /**
         * Range of pages to build
         * @type {Array}
         */
        return generateRange(pageStart, pageEnd);
    }, [currentPageNumber, pageCount, totalPages]);


    const handleClickNext = (event) => {
        // ??
        event.preventDefault();

        const nextPageNotOutOfBounds = currentPageNumber + 1 < totalPages;
        const nextPage = nextPageNotOutOfBounds ? currentPageNumber + 1 : totalPages;

        onClick(nextPage);
    };

    const handleClickPrev = (event) => {
        // ??
        event.preventDefault();

        const nextPageNotNegative = currentPageNumber - 1 > 0;
        const prevPage = nextPageNotNegative ? currentPageNumber - 1 : 1;

        onClick(prevPage);
    };

    const handleClick = (event, nextPage) => {
        // ??
        event.preventDefault();

        onClick(nextPage);
    };

    /**
     * Summary Of Pagination Results
     * @type {String}
     */
    const paginationSummary = template(quantityText, {
        total: totalResults,
        start: getStartNumber(currentPageNumber, showItemsPerPage),
        end: getEndNumber(currentPageNumber, showItemsPerPage, totalResults),
    });

    return (
        <div
            className="consonant-pagination">
            <div
                className="consonant-pagination--paginator">
                <button
                    tabIndex="0"
                    type="button"
                    data-testid="btn_prev"
                    onClick={handleClickPrev}
                    className="consonant-pagination--btn consonant-pagination--btn_prev">
                    {prevLabel}
                </button>
                <ul
                    className="consonant-pagination--items">
                    {pageRange.map(item => (
                        <RangeItem
                            key={item}
                            item={item}
                            onClick={handleClick}
                            currentPage={currentPageNumber} />
                    ))}
                </ul>
                <button
                    tabIndex="0"
                    type="button"
                    data-testid="btn_next"
                    onClick={handleClickNext}
                    className="consonant-pagination--btn consonant-pagination--btn_next">
                    {nextLabel}
                </button>
            </div>
            <div
                data-testid="pagination--summary"
                className="consonant-pagination--summary">
                <strong>
                    {paginationSummary}
                </strong>
            </div>
        </div>
    );
};

Paginator.propTypes = PaginatorType;

export default Paginator;
