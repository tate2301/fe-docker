import React from 'react';
import {
    string,
    number,
    func,
    bool,
} from 'prop-types';

const panelFooterType = {
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

PanelFooter.propTypes = panelFooterType;
PanelFooter.defaultProps = defaultProps;

/* eslint-disable-next-line import/prefer-default-export */
export { PanelFooter };
