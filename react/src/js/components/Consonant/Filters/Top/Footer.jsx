import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => {
    const {
        mobileGroupTotalResultsText,
        numItemsSelected,
        handleClear,
        clearFilterText,
        handleToggle,
        mobileFooterBtnText,
    } = props;

    return (
        <div className="consonant-top-filter--footer">
            <span className="consonant-top-filter--footer-res-qty">
                {mobileGroupTotalResultsText}
            </span>
            {numItemsSelected > 0 &&
            <button
                data-testid="clear-btn"
                type="button"
                onClick={handleClear}
                className="consonant-top-filter--footer-clear-btn"
                tabIndex="0">
                {clearFilterText}
            </button>}
            <button
                type="button"
                onClick={handleToggle}
                className="consonant-top-filter--footer-btn"
                tabIndex="0">
                {mobileFooterBtnText}
            </button>
        </div>
    );
};

/* eslint-disable-next-line import/prefer-default-export */
export { Footer };

Footer.propTypes = {
    mobileGroupTotalResultsText: PropTypes.string,
    numItemsSelected: PropTypes.number,
    handleClear: PropTypes.func.isRequired,
    clearFilterText: PropTypes.string,
    handleToggle: PropTypes.func.isRequired,
    mobileFooterBtnText: PropTypes.string,
};

Footer.defaultProps = {
    mobileGroupTotalResultsText: '',
    numItemsSelected: 0,
    clearFilterText: '',
    mobileFooterBtnText: '',
};
