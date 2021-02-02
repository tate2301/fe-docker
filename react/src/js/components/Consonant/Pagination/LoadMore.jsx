import React from 'react';
import {
    number,
    func,
} from 'prop-types';

import { useConfig } from '../Helpers/hooks';

const loadMoreType = {
    show: number.isRequired,
    total: number.isRequired,
    onClick: func.isRequired,
};

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
    show,
    total,
    onClick,
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
            data-testid="LoadMore"
            className="LoadMore">
            <div className="LoadMore-inner">
                <p
                    data-testid="LoadMore-text"
                    className="LoadMore-text">
                    {summaryText}
                </p>
                {shouldDisplayLoadMoreBtn &&
                    <button
                        type="button"
                        data-testid="LoadMore-btn"
                        className="LoadMore-btn"
                        onClick={onClick}
                        tabIndex="0">
                        {loadMoreButtonText}
                    </button>
                }
            </div>
        </div>)
        : null;
};

LoadMore.propTypes = loadMoreType;

export default LoadMore;
