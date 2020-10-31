import React from 'react';
import PropTypes from 'prop-types';

/**
 * Footer for the left filter for mobile and tablet breakpoints
 *
 * @component
 * @example
 * const props= {
    mobileGroupTotalResultsText: String,
    numItemsSelected: Number,
    handleClear: Function,
    clearFilterText: String,
    handleClick: Function,
    ctaText: String,
 * }
 * return (
 *   <GroupFooter {...props}/>
 * )
 */
const GroupFooter = (props) => {
    const {
        mobileGroupTotalResultsText,
        numItemsSelected,
        handleClear,
        clearFilterText,
        handleClick,
        ctaText,
    } = props;

    return (
        <div
            className="consonant-left-filter--footer">
            <span
                className="consonant-left-filter--footer-res-qty">
                {mobileGroupTotalResultsText}
            </span>
            {numItemsSelected > 0 &&
                <button
                    type="button"
                    onClick={handleClear}
                    className="consonant-left-filter--footer-clear-btn">
                    {clearFilterText}
                </button>
            }
            <button
                type="button"
                onClick={handleClick}
                className="consonant-left-filter--footer-btn">
                {ctaText}
            </button>
        </div>
    );
};

GroupFooter.propTypes = {
    mobileGroupTotalResultsText: PropTypes.string,
    numItemsSelected: PropTypes.number,
    handleClear: PropTypes.func.isRequired,
    clearFilterText: PropTypes.string,
    ctaText: PropTypes.string,
    handleClick: PropTypes.func.isRequired,
};

GroupFooter.defaultProps = {
    mobileGroupTotalResultsText: '',
    numItemsSelected: 0,
    clearFilterText: '',
    ctaText: '',
};

export { GroupFooter };
