import React from 'react';
import {
    string,
    number,
    func,
} from 'prop-types';

const GroupFooterType = {
    ctaText: string,
    clearFilterText: string,
    numItemsSelected: number,
    handleClear: func.isRequired,
    handleClick: func.isRequired,
    mobileGroupTotalResultsText: string,
};

const defaultProps = {
    ctaText: '',
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

GroupFooter.propTypes = GroupFooterType;
GroupFooter.defaultProps = defaultProps;

/* eslint-disable-next-line import/prefer-default-export */
export { GroupFooter };
