import PropTypes from 'prop-types';
import React from 'react';

const Footer = ({
    showTotalResults,
    resQty,
    onClearAllFilters,
    clearAllFiltersText,
    onMobileFiltersToggleClick,
    someFiltersAreSelected,
    applyText,
    doneText,
    showTotalResultsText,
}) => (
    <div className="consonant-left-filters--mobile-footer">
        {showTotalResults && (
            <span
                data-testid="mobile-footer-total-res"
                className="consonant-left-filters--mobile-footer-total-res-qty">
                {showTotalResultsText.replace('{total}', resQty)}
            </span>
        )}
        {someFiltersAreSelected && (
            <button
                type="button"
                data-testid="mobile-footer-clear"
                className="consonant-left-filters--mobile-footer-clear-btn"
                onClick={onClearAllFilters}>
                {clearAllFiltersText}
            </button>
        )}
        <button
            type="button"
            data-testid="mobile-footer-btn"
            className="consonant-left-filters--mobile-footer-btn"
            onClick={onMobileFiltersToggleClick}>
            {someFiltersAreSelected ? applyText : doneText}
        </button>
    </div>
);

/* eslint-disable-next-line import/prefer-default-export */
export { Footer };

Footer.propTypes = {
    onClearAllFilters: PropTypes.func.isRequired,
    onMobileFiltersToggleClick: PropTypes.func.isRequired,
    doneText: PropTypes.string,
    applyText: PropTypes.string,
    clearAllFiltersText: PropTypes.string,
    showTotalResults: PropTypes.bool,
    someFiltersAreSelected: PropTypes.bool,
    showTotalResultsText: PropTypes.string,
    resQty: PropTypes.number,
};

Footer.defaultProps = {
    doneText: '',
    applyText: '',
    clearAllFiltersText: '',
    showTotalResultsText: '',
    showTotalResults: false,
    someFiltersAreSelected: false,
    resQty: 0,
};
