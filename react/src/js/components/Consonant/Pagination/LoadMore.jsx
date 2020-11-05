import React from 'react';

import { If } from '../Common';
import { LoadMoreType } from './types';
import { loadMoreSelector } from './utils';
import { template } from '../Helpers/general';
import { useConfigSelector } from '../Helpers/hooks';

/**
 * Load More - Button That Naviates Users To The Next Page
 *
 * @component
 * @example
 * const props= {
    show: Number,
    total: Number,
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
    const {
        loadMoreButtonText,
        loadMoreQuantityText,
    } = useConfigSelector(loadMoreSelector);

    /**
     * Summary Of Load More Results To Show To Users
     * @type {String}
     */
    const summaryText = template(loadMoreQuantityText, { start: show, end: total });

    const shouldDisplayLoadMoreButton = show < total;
    const shouldDisplayLoadMore = show > 0 && total > 0;

    return (
        <If condition={Boolean(shouldDisplayLoadMore)}>
            <div
                className="consonant-load-more"
                data-testid="consonant-load-more">
                <div className="consonant-load-more--inner">
                    <p
                        className="consonant-load-more--text"
                        data-testid="consonant-load-more--text">
                        {summaryText}
                    </p>
                    <If condition={Boolean(shouldDisplayLoadMoreButton)}>
                        <button
                            tabIndex="0"
                            type="button"
                            onClick={onClick}
                            data-testid="load-more__button"
                            className="consonant-load-more--btn">
                            {loadMoreButtonText}
                        </button>
                    </If>
                </div>
            </div>
        </If>

    );
};

LoadMore.propTypes = LoadMoreType;

export default LoadMore;
