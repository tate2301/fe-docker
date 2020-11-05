import React from 'react';
import {
    func,
    string,
    number,
} from 'prop-types';

import { If } from '../../../Common';

const GroupFooterType = {
    clearFilterText: string,
    numItemsSelected: number,
    handleClear: func.isRequired,
    mobileGroupTotalResultsText: string,
};

const defaultProps = {
    numItemsSelected: 0,
    clearFilterText: '',
    mobileGroupTotalResultsText: '',
};

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
const GroupFooter = ({
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
GroupFooter.defaultProps = defaultProps;

/* eslint-disable-next-line import/prefer-default-export */
export { GroupFooter };
