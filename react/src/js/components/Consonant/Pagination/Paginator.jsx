import React from 'react';
import PropTypes from 'prop-types';
import { useConfig } from '../../../utils/hooks';
import { getPageStartEnd, generateRange } from '../../../utils/general';

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

    const handleClick = (clickEvt) => {
        let page;
        clickEvt.preventDefault();

        const { target } = clickEvt;

        if (target.classList.contains('consonant-pagination--btn_prev')) {
            page = currentPageNumber - 1 > 0 ? currentPageNumber - 1 : 1;
        }
        if (target.classList.contains('consonant-pagination--btn_next')) {
            page = currentPageNumber + 1 < totalPages ? currentPageNumber + 1 : totalPages;
        }
        if (typeof page !== 'number') page = parseInt(target.firstChild.nodeValue, 10);

        onClick(page);
    };

    const getStartNumber = () => {
        if (currentPageNumber === 1) return 1;
        return (currentPageNumber * showItemsPerPage) - (showItemsPerPage - 1);
    };

    const getEndNumber = () => {
        const res = currentPageNumber * showItemsPerPage;
        return res < totalResults ? res : totalResults;
    };

    const renderQtyHTML = () => {
        const regexp = /\{(\w*)}/gi;

        const itemsToDisplay = {
            total: totalResults,

            end: getEndNumber(),
            start: getStartNumber(),
        };

        return quantityText.replace(regexp, (_, matchedKey) => {
            const value = itemsToDisplay[matchedKey];

            return `<strong>${value}</strong>`;
        });
    };

    return (
        <div className="consonant-pagination">
            <div className="consonant-pagination--paginator">
                <button
                    data-testid="btn_prev"
                    onClick={handleClick}
                    type="buttton"
                    className="consonant-pagination--btn consonant-pagination--btn_prev"
                    tabIndex="0">{prevLabel}
                </button>
                <ul className="consonant-pagination--items">
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
                    type="buttton"
                    className="consonant-pagination--btn consonant-pagination--btn_next"
                    tabIndex="0">{nextLabel}
                </button>
            </div>
            <div
                data-testid="pagination--summary"
                className="consonant-pagination--summary"
                dangerouslySetInnerHTML={{ __html: renderQtyHTML() }} />
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

Paginator.defaultProps = {
};
