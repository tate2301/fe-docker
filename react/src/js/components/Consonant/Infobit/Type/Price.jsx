import React from 'react';
import PropTypes from 'prop-types';

/**
 * Price Infobit (shown in 3:2 Card Footer)
 *
 * @component
 * @example
 * const props= {
    price: String,
    term: String,
 * }
 * return (
 *   <Price {...props}/>
 * )
 */
const Price = ({ price, term }) => {
    return (
        <span
            className="consonant-price-infobit">
            <strong 
                className="consonant-price-infobit--price">
                {price}
            </strong>
            <span
                className="consonant-price-infobit--term">
                {term}
            </span>
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
