import React from 'react';
import PropTypes from 'prop-types';
import { useConfig } from '../../../utils/hooks';
import {
    getPageStartEnd,
    generateRange,
    getStartNumber,
    getEndNumber,
} from '../../../utils/general';

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

    const quantityText = getConfig('pagination', 'i18n.paginator.resultsQuantityText');
    const prevLabel = getConfig('pagination', 'i18n.paginator.prevLabel');
    const nextLabel = getConfig('pagination', 'i18n.paginator.nextLabel');

    const [pageStart, pageEnd] = getPageStartEnd(currentPageNumber, pageCount, totalPages);
    const pageRange = generateRange(pageStart, pageEnd);

    const BASE_10 = 10;
    const nextPageNotNegative = currentPageNumber - 1 > 0;
    const nextPageNotOutOfBounds = currentPageNumber + 1 < totalPages;

    const handleClick = (clickEvt) => {
        const { target } = clickEvt;

        clickEvt.preventDefault();

        let nextPage = null;
        const previousButtonClicked = target.classList.contains('consonant-pagination--btn_prev');
        const nextButtonClicked = target.classList.contains('consonant-pagination--btn_next');

        if (previousButtonClicked) {
            nextPage = nextPageNotNegative ? currentPageNumber - 1 : 1;
        } else if (nextButtonClicked) {
            nextPage = nextPageNotOutOfBounds ? currentPageNumber + 1 : totalPages;
        } else {
            /** numberButtonClicked was clicked * */
            nextPage = parseInt(target.firstChild.nodeValue, BASE_10);
        }
        onClick(nextPage);
    };

    const resultsCount = quantityText
        .replace('{start}', getStartNumber(currentPageNumber, showItemsPerPage))
        .replace('{end}', getEndNumber(currentPageNumber, showItemsPerPage, totalResults))
        .replace('{total}', totalResults);

    return (
        <div
            className="consonant-pagination">
            <div
                className="consonant-pagination--paginator">
                <button
                    data-testid="btn_prev"
                    onClick={handleClick}
                    type="button"
                    className="consonant-pagination--btn consonant-pagination--btn_prev"
                    tabIndex="0">
                    {prevLabel}
                </button>
                <ul
                    className="consonant-pagination--items">
                    {pageRange.map(item => (
                        <li
                            key={item}
                            className={
                                currentPageNumber === item ?
                                    'consonant-pagination--item consonant-pagination--item_active' :
                                    'consonant-pagination--item'
                            }>
                            <button
                                data-testid="btn_page"
                                onClick={handleClick}
                                type="button"
                                className="consonant-pagination--item-btn"
                                tabIndex="0">
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    data-testid="btn_next"
                    onClick={handleClick}
                    type="button"
                    className="consonant-pagination--btn consonant-pagination--btn_next"
                    tabIndex="0">
                    {nextLabel}
                </button>
            </div>
            <div
                data-testid="pagination--summary"
                className="consonant-pagination--summary">
                <strong>
                    {resultsCount}
                </strong>
            </div>
        </div>
    );
};

export default Paginator;

Paginator.propTypes = {
    pageCount: PropTypes.number.isRequired,
    currentPageNumber: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    showItemsPerPage: PropTypes.number.isRequired,
    totalResults: PropTypes.number.isRequired,
};
