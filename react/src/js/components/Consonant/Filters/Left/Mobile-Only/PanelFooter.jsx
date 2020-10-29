import React from 'react';
import { string, number, func, bool } from 'prop-types';

const TPanelFooter = {
    resQty: number,
    doneText: string,
    applyText: string,
    showTotalResults: bool,
    clearAllFiltersText: string,
    someFiltersAreSelected: bool,
    showTotalResultsText: string,
    onClearAllFilters: func.isRequired,
    onMobileFiltersToggleClick: func.isRequired,
};

const defaultProps = {
    resQty: 0,
    doneText: '',
    applyText: '',
    showTotalResults: false,
    clearAllFiltersText: '',
    showTotalResultsText: '',
    someFiltersAreSelected: false,
};

const PanelFooter = ({
    resQty,
    doneText,
    applyText,
    showTotalResults,
    onClearAllFilters,
    clearAllFiltersText,
    showTotalResultsText,
    someFiltersAreSelected,
    onMobileFiltersToggleClick,
}) => {
    const buttonText = someFiltersAreSelected ? applyText : doneText;
    return (
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
                {buttonText}
            </button>
        </div>
    );
};

PanelFooter.propTypes = TPanelFooter;
PanelFooter.defaultProps = defaultProps;

/* eslint-disable-next-line import/prefer-default-export */
export { PanelFooter };
