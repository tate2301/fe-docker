import React from 'react';
import PropTypes from 'prop-types';

/**
 * Top filter footer
 *
 * @component
 * @example
 * const props= {
    mobileGroupTotalResultsText: String,
    numItemsSelected: Number,
    handleClear: Function,
    clearFilterText: String,
    handleToggle: Function,
    mobileFooterBtnText: String,
 * }
 * return (
 *   <Footer {...props}/>
 * )
 */
const Footer = (props) => {
    const {
        mobileGroupTotalResultsText,
        numItemsSelected,
        handleClear,
        clearFilterText,
        handleToggle,
        mobileFooterBtnText,
    } = props;

    /**
     **** Constants ****
     */

    /**
     * Whether the "Clear options" button should be displayed
     * @type {Boolean}
     */
    const shouldShowClearButton = numItemsSelected > 0;

    return (
        <div
            className="consonant-top-filter--footer">
            <span
                className="consonant-top-filter--footer-res-qty">
                {mobileGroupTotalResultsText}
            </span>
            {shouldShowClearButton &&
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

export default Footer;
