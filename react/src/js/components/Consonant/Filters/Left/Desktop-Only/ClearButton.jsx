import React from 'react';
import {
    func,
    string,
} from 'prop-types';

const ClearButtonType = {
    clearAllFiltersText: string,
    onClearAllFilters: func.isRequired,
};

const defaultProps = {
    clearAllFiltersText: '',
};

/**
 * This button
 * (1) clears all the chosen filters
 * (2) clears the search query
 * (3) and deselects "My bookmarks" feature if selected
 *
 * (This button only shows up for the Left Filter Panel - on desktop breakpoint)
 *
 * @component
 * @example
 * const props= {
    onClearAllFilters: Function,
    clearAllFiltersText: String,
 * }
 * return (
 *   <ClearBtn {...props}/>
 * )
 */
const ClearBtn = ({
    onClearAllFilters,
    clearAllFiltersText,
}) => (
    <button
        type="button"
        tabIndex="0"
        onClick={onClearAllFilters}
        data-testid="left-filter-panel-clear-all-btn"
        className="consonant-left-filters--clear-link">
        {clearAllFiltersText}
    </button>
);

ClearBtn.propTypes = ClearButtonType;
ClearBtn.defaultProps = defaultProps;

/* eslint-disable-next-line import/prefer-default-export */
export { ClearBtn };
