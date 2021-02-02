import React from 'react';
import {
    number,
    func,
} from 'prop-types';

import { useConfig } from '../Helpers/hooks';
import {
    getEndNumber,
    generateRange,
    getStartNumber,
    getPageStartEnd,
} from '../Helpers/general';
import { trackPageChange } from '../Analytics/Analytics';

const paginatorType = {
    onClick: func.isRequired,
    pageCount: number.isRequired,
    totalPages: number.isRequired,
    totalResults: number.isRequired,
    showItemsPerPage: number.isRequired,
    currentPageNumber: number.isRequired,
};

/**
 * Paginator - handles navigating between pages 1 to n for users
 *
 * @component
 * @example
 * const props= {
    pageCount: Int,
    currentPageNumber: Int,
    totalPages: Int,
    onClick: Function,
    showItemsPerPage: Boolean,
    totalResults: Int,
 * }
 * return (
 *   <Paginator {...props}/>
 * )
 */
const Paginator = (props) => {
    const {
        pageCount,
        currentPageNumber,
        totalPages,
        onClick,
        showItemsPerPage,
        totalResults,
    } = props;

    const getConfig = useConfig();

    /**
     * Authored Quantity Text
     * @type {String}
     */
    const quantityText = getConfig('pagination', 'i18n.paginator.resultsQuantityText');

    /**
     * Authored Previous Label
     * @type {String}
     */
    const prevLabel = getConfig('pagination', 'i18n.paginator.prevLabel');

    /**
     * Authored Next Label
     * @type {String}
     */
    const nextLabel = getConfig('pagination', 'i18n.paginator.nextLabel');

    /**
     * Start and end indexes of pages to build
     * @type {Int, Int}
     */
    const [pageStart, pageEnd] = getPageStartEnd(currentPageNumber, pageCount, totalPages);
    /**
     * Range of pages to build
     * @type {Array}
     */
    const pageRange = generateRange(pageStart, pageEnd);

    const BASE_10 = 10;
    const nextPageNotNegative = currentPageNumber - 1 > 0;
    const nextPageNotOutOfBounds = currentPageNumber + 1 < totalPages;

    /**
     * Handles click of prev, next or number button
     *
     * @param {ClickEvent} e
     * @listens ClickEvent
     */
    const handleClick = (clickEvt) => {
        const { target } = clickEvt;

        clickEvt.preventDefault();

        let nextPage = null;
        const previousButtonClicked = target.classList.contains('Pagination-btnPrev');
        const nextButtonClicked = target.classList.contains('Pagination-btnNext');

        if (previousButtonClicked) {
            nextPage = nextPageNotNegative ? currentPageNumber - 1 : 1;
        } else if (nextButtonClicked) {
            nextPage = nextPageNotOutOfBounds ? currentPageNumber + 1 : totalPages;
        } else {
            nextPage = parseInt(target.firstChild.nodeValue, BASE_10);
        }
        trackPageChange(nextPage);
        onClick(nextPage);
    };

    /**
     * Summary Of Pagination Results
     * @type {String}
     */
    const paginationSummary = quantityText
        .replace('{start}', getStartNumber(currentPageNumber, showItemsPerPage))
        .replace('{end}', getEndNumber(currentPageNumber, showItemsPerPage, totalResults))
        .replace('{total}', totalResults);

    return (
        <div
            className="Pagination">
            <div
                className="Pagination-paginator">
                <button
                    data-testid="Pagination-btnPrev"
                    onClick={handleClick}
                    type="button"
                    className="Pagination-btn Pagination-btnPrev"
                    tabIndex="0">
                    {prevLabel}
                </button>
                <ul
                    className="Pagination-items">
                    {pageRange.map(item => (
                        <li
                            key={item}
                            className={
                                currentPageNumber === item ?
                                    'Pagination-item is-active' :
                                    'Pagination-item'
                            }>
                            <button
                                data-testid="Pagination-itemBtn"
                                onClick={handleClick}
                                type="button"
                                className="Pagination-itemBtn"
                                tabIndex="0">
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    data-testid="Pagination-btnNext"
                    onClick={handleClick}
                    type="button"
                    className="Pagination-btn Pagination-btnNext"
                    tabIndex="0">
                    {nextLabel}
                </button>
            </div>
            <div
                data-testid="Pagination-summary"
                className="Pagination-summary">
                <strong>
                    {paginationSummary}
                </strong>
            </div>
        </div>
    );
};

Paginator.propTypes = paginatorType;

export default Paginator;
