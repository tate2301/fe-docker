import React from 'react';
import PropTypes from 'prop-types';

const LoadMore = (props) => {
    const {
        onClick, show, total, loadMoreButtonText, loadMoreQuantityText,
    } = props;
    const renderQtyHTML = () => loadMoreQuantityText
        .replace('{}', `<span className="consonant-load-more--shown">${show}</span>`)
        .replace('{}', `<span className="consonant-load-more--total">${total}</span>`);

    const render =
        (show > 0 && total > 0) ? (
            <div className="consonant-load-more">
                <div className="consonant-load-more--inner">
                    <p
                        className="consonant-load-more--text"
                        dangerouslySetInnerHTML={{ __html: renderQtyHTML() }} />
                    {show < total &&
                    <button
                        type="button"
                        className="consonant-load-more--btn"
                        onClick={onClick}>{loadMoreButtonText}
                    </button>
                    }
                </div>
            </div>)
            : null;
    return render;
};

export default LoadMore;

LoadMore.propTypes = {
    show: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    loadMoreButtonText: PropTypes.string,
    loadMoreQuantityText: PropTypes.string,
};

LoadMore.defaultProps = {
    loadMoreButtonText: 'Load more',
    loadMoreQuantityText: '{} of {} displayed',
};
