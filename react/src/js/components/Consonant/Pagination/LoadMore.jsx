import PropTypes from 'prop-types';
import React from 'react';
import { useConfig } from '../Helpers/hooks';

/**
 * Load More - Button That Naviates Users To The Next Page
 *
 * @component
 * @example
 * const props= {
    show: Int,
    total: Int,
    onClick: Function,
 * }
 * return (
 *   <LoadMore {...props}/>
 * )
 */
const LoadMore = ({
    onClick,
    show,
    total,
}) => {
    const getConfig = useConfig();

    /**
     * Authored Button Text
     * @type {String}
     */
    const loadMoreButtonText = getConfig('pagination', 'i18n.loadMore.btnText');

    /**
     * Authored Summary Text
     * @type {String}
     */
    const loadMoreQuantityText = getConfig('pagination', 'i18n.loadMore.resultsQuantityText');

    /**
     * Summary Of Load More Results To Show To Users
     * @type {String}
     */
    const summaryText = loadMoreQuantityText
        .replace('{start}', show)
        .replace('{end}', total);

    const shouldDisplayLoadMore = show > 0 && total > 0;
    const shouldDisplayLoadMoreBtn = show < total;

    return (shouldDisplayLoadMore) ? (
        <div
            data-testid="consonant-load-more"
            className="consonant-load-more">
            <div className="consonant-load-more--inner">
                <p
                    data-testid="consonant-load-more--text"
                    className="consonant-load-more--text">
                    {summaryText}
                </p>
                {shouldDisplayLoadMoreBtn &&
                    <button
                        type="button"
                        data-testid="load-more__button"
                        className="consonant-load-more--btn"
                        onClick={onClick}
                        tabIndex="0">
                        {loadMoreButtonText}
                    </button>
                }
            </div>
        </div>)
        : null;
};

export default LoadMore;

LoadMore.propTypes = {
    show: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

LoadMore.defaultProps = {};
