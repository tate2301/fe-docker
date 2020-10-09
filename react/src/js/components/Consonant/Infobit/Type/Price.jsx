import React from 'react';
import PropTypes from 'prop-types';

function Price({ price, term }) {
    return (
        <span className="consonant-price-infobit">
            <strong className="consonant-price-infobit--price">{price}</strong>
            <span className="consonant-price-infobit--term">{term}</span>
        </span>
    );
}

Price.propTypes = {
    price: PropTypes.string.isRequired,
    term: PropTypes.string,
};

Price.defaultProps = {
    term: '',
};

export default Price;
