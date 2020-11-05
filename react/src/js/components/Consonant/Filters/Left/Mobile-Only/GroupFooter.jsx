import React from 'react';

import { If } from '../../../Common';
import { GroupFooterType } from './types';
import { groupFooterDefaultProps } from './constants';

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
/* eslint-disable-next-line import/prefer-default-export */
export const GroupFooter = ({
    handleClear,
    clearFilterText,
    numItemsSelected,
    mobileGroupTotalResultsText,
}) => (
    <div className="consonant-left-filter--footer">
        <span
            className="consonant-left-filter--footer-res-qty">
            {mobileGroupTotalResultsText}
        </span>
        <If condition={numItemsSelected > 0}>
            <button
                type="button"
                onClick={handleClear}
                className="consonant-left-filter--footer-btn">
                {clearFilterText}
            </button>
        </If>
    </div>
);

GroupFooter.propTypes = GroupFooterType;
GroupFooter.defaultProps = groupFooterDefaultProps;
