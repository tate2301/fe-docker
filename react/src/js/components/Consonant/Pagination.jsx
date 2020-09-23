import React from 'react';
import PropTypes from 'prop-types';

const Pagination = (props) => {
    const {
        pageCount,
        currentPageNumber,
        totalPages,
        onClick,
        showItemsPerPage,
        totalResults,
    } = props;

    /**
     * @function generateRange
     * @param {number} startVal - Start value in the range array;
     * @param {number} end - End value in the range array;
     * @return {Array}
     * @description Return range array of pages;
     */
    const generateRange = (startVal, end) => {
        let start = startVal;
        let step = 1;
        const range = [];

        if (end < start) {
            step = -step;
        }

        while (step > 0 ? end >= start : end <= start) {
            range.push(start);
            start += step;
        }

        // @TODO refactor, wrong logic in pagination;
        if (startVal !== 1 && end === totalPages && totalPages > pageCount) range.shift();

        return range;
    };

    /**
     * @function generatePageList
     * @param {number} pageCount - Total pages to display
     * @param {number} currentPageNumber - Current page user is on
     * @param {number} totalPages - Total number of pages available
     * @return {Array}
     * @description Return array of pages up to a max length of pageCount
     */
    const generatePageList = () => {
        const halfPageCount = Math.floor(pageCount / 2);
        let start;
        let end;


        if (totalPages <= (pageCount + 1)) {
            // show all pages
            start = 1;
            end = totalPages;
        } else {
            start = Math.min(
                Math.max(1, currentPageNumber - halfPageCount),
                totalPages - pageCount,
            );
            end = Math.max(
                Math.min(currentPageNumber + halfPageCount, totalPages),
                pageCount + 1,
            );
        }

        return generateRange(start, end);
    };

    const handleClick = (clickEvt) => {
        clickEvt.preventDefault();

        const { target } = clickEvt;
        let page;

        if (target.classList.contains('consonant-pagination--btn_prev')) {
            page = currentPageNumber - 1 > 0 ? currentPageNumber - 1 : 1;
        }
        if (target.classList.contains('consonant-pagination--btn_next')) {
            page = currentPageNumber + 1 < totalPages ? currentPageNumber + 1 : totalPages;
        }
        if (typeof page !== 'number') page = parseInt(target.firstChild.nodeValue, 10);

        onClick(page);
    };

    return (
        <div className="consonant-pagination">
            <div className="consonant-pagination--paginator">
                <button
                    data-testid="btn_prev"
                    onClick={handleClick}
                    type="buttton"
                    className="consonant-pagination--btn consonant-pagination--btn_prev">previous
                </button>
                <ul className="consonant-pagination--items">
                    {generatePageList().map(item => (
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
                                className="consonant-pagination--item-btn">
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    data-testid="btn_next"
                    onClick={handleClick}
                    type="buttton"
                    className="consonant-pagination--btn consonant-pagination--btn_next">next
                </button>
            </div>
            <div data-testid="pagination--summary" className="consonant-pagination--summary">
                Showing
                <strong>
                    {`${currentPageNumber === 1 ? 1 : (currentPageNumber * showItemsPerPage) - (showItemsPerPage - 1)}-${currentPageNumber * showItemsPerPage}`} of
                </strong>
                {totalResults} Results
            </div>
        </div>
    );
};

export default Pagination;

Pagination.propTypes = {
    pageCount: PropTypes.number.isRequired,
    currentPageNumber: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    showItemsPerPage: PropTypes.number.isRequired,
    totalResults: PropTypes.number.isRequired,
};
