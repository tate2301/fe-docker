import React from 'react';
import PropTypes from 'prop-types';

/**
 * Footer of the left filter panel for mobile and tablet breakpoints
 *
 * @component
 * @example
 * const props= {
    showTotalResults: Boolean,
    resQty: Number,
    onClearAllFilters: Function,
    clearAllFiltersText: String,
    onMobileFiltersToggleClick: Function,
    someFiltersAreSelected: Boolean,
    applyText: String,
    doneText: String,
    showTotalResultsText: String,
 * }
 * return (
 *   <PanelFooter {...props}/>
 * )
 */
const PanelFooter = (props) => {
    const {
        showTotalResults,
        resQty,
        onClearAllFilters,
        clearAllFiltersText,
        onMobileFiltersToggleClick,
        someFiltersAreSelected,
        applyText,
        doneText,
        showTotalResultsText,
    } = props;

    /**
     * Text of the left filters footer button for mobile and tablet breakpoints:
     * whether the "Apply changes" text should be shown or "Done"
     * @type {String}
     */
    const buttonText = someFiltersAreSelected ? applyText : doneText;

    return (
        <div
            className="consonant-left-filters--mobile-footer">
            {showTotalResults &&
                <span
                    data-testid="mobile-footer-total-res"
                    className="consonant-left-filters--mobile-footer-total-res-qty">
                    {showTotalResultsText.replace('{total}', resQty)}
                </span>
            }
            {someFiltersAreSelected &&
                <button
                    type="button"
                    data-testid="mobile-footer-clear"
                    className="consonant-left-filters--mobile-footer-clear-btn"
                    onClick={onClearAllFilters}>
                    {clearAllFiltersText}
                </button>
            }
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

PanelFooter.propTypes = {
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

PanelFooter.defaultProps = {
    doneText: '',
    applyText: '',
    clearAllFiltersText: '',
    showTotalResultsText: '',
    showTotalResults: false,
    someFiltersAreSelected: false,
    resQty: 0,
};

/* eslint-disable-next-line import/prefer-default-export */
export { PanelFooter };
