import PropTypes from 'prop-types';
import React from 'react';
import { useConfig } from '../../../utils/hooks';

const LoadMore = ({
    onClick,
    show,
    total,
}) => {
    const getConfig = useConfig();
    const loadMoreButtonText = getConfig('pagination', 'i18n.loadMore.btnText');
    const loadMoreQuantityText = getConfig('pagination', 'i18n.loadMore.resultsQuantityText');

    const qtyHTML = loadMoreQuantityText
        .replace('{start}', `<span class="consonant-load-more--shown">${show}</span>`)
        .replace('{end}', `<span class="consonant-load-more--total">${total}</span>`);


    return (show > 0 && total > 0) ? (
        <div data-testid="consonant-load-more" className="consonant-load-more">
            <div className="consonant-load-more--inner">
                <p
                    data-testid="consonant-load-more--text"
                    className="consonant-load-more--text"
                    dangerouslySetInnerHTML={{ __html: qtyHTML }} />
                {show < total &&
                    <button
                        type="button"
                        data-testid="load-more__button"
                        className="consonant-load-more--btn"
                        onClick={onClick}
                        tabIndex="0">{loadMoreButtonText}
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

LoadMore.defaultProps = {
};
