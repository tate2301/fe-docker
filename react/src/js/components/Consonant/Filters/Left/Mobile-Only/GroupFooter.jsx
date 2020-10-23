import PropTypes from 'prop-types';
import React from 'react';

const GroupFooter = ({
    mobileGroupTotalResultsText,
    numItemsSelected,
    handleClear,
    clearFilterText,
    handleClick,
    ctaText,
}) => (
    <div className="consonant-left-filter--footer">
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

/* eslint-disable-next-line import/prefer-default-export */
export { GroupFooter };

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
