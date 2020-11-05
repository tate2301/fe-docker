import React from 'react';

import { FooterType } from './types';
import { If } from '../../../Common';

const defaultProps = {
    numItemsSelected: 0,
    clearFilterText: '',
    mobileFooterBtnText: '',
    mobileGroupTotalResultsText: '',
};

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
const Footer = ({
    handleClear,
    handleToggle,
    clearFilterText,
    numItemsSelected,
    mobileFooterBtnText,
    mobileGroupTotalResultsText,
}) => {
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
            <If condition={Boolean(shouldShowClearButton)}>
                <button
                    tabIndex="0"
                    type="button"
                    onClick={handleClear}
                    data-testid="clear-btn"
                    className="consonant-top-filter--footer-clear-btn">
                    {clearFilterText}
                </button>
            </If>
            <button
                tabIndex="0"
                type="button"
                onClick={handleToggle}
                className="consonant-top-filter--footer-btn">
                {mobileFooterBtnText}
            </button>
        </div>
    );
};

Footer.propTypes = FooterType;
Footer.defaultProps = defaultProps;

/* eslint-disable-next-line import/prefer-default-export */
export { Footer };
