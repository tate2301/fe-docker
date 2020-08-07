import React from 'react';
import PropTypes from 'prop-types';

const LoadMore = (props) => {
    const { onClick, show, total } = props;
    const render =
        (show > 0 && total > 0) ? (
            <div className="consonant-load-more">
                <div className="consonant-load-more--inner">
                    <p className="consonant-load-more--text">
                        <span className="consonant-load-more--shown">{show} </span>
                    of
                        <span className="consonant-load-more--total"> {total} </span>
                    displayed
                    </p>
                    {show < total &&
                    <button
                        type="button"
                        className="consonant-load-more--btn"
                        onClick={onClick}>Load more
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
};
