import React from 'react';
import PropTypes from 'prop-types';

const LoadMore = (props) => {
    const { onClick, shown, total } = props;
    const render =
        (shown > 0 && total > 0) ? (
            <div className="consonant-load-more">
                <div className="consonant-load-more--inner">
                    <p className="consonant-load-more--text">
                        <span className="consonant-load-more--shown">{shown} </span>
                    of
                        <span className="consonant-load-more--total"> {total} </span>
                    displayed
                    </p>
                    {shown < total &&
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
    shown: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};
