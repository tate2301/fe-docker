import React from 'react';
import {
    func,
    bool,
    string,
    number,
} from 'prop-types';

import { If } from '../../../Common';
import { template } from '../../../Helpers/general';

const PanelFooterType = {
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
    /**
     * Text of the left filters footer button for mobile and tablet breakpoints:
     * whether the "Apply changes" text should be shown or "Done"
     * @type {String}
     */
    const buttonText = someFiltersAreSelected ? applyText : doneText;
    const resultText = template(showTotalResultsText, { total: resQty });

    return (
        <div className="consonant-left-filters--mobile-footer">
            <If condition={Boolean(showTotalResults)}>
                <span
                    data-testid="mobile-footer-total-res"
                    className="consonant-left-filters--mobile-footer-total-res-qty">
                    {resultText}
                </span>
            </If>
            <If condition={Boolean(someFiltersAreSelected)}>
                <button
                    type="button"
                    onClick={onClearAllFilters}
                    data-testid="mobile-footer-clear"
                    className="consonant-left-filters--mobile-footer-clear-btn">
                    {clearAllFiltersText}
                </button>
            </If>
            <button
                type="button"
                data-testid="mobile-footer-btn"
                onClick={onMobileFiltersToggleClick}
                className="consonant-left-filters--mobile-footer-btn">
                {buttonText}
            </button>
        </div>
    );
};

PanelFooter.propTypes = PanelFooterType;
PanelFooter.defaultProps = defaultProps;

/* eslint-disable-next-line import/prefer-default-export */
export { PanelFooter };
