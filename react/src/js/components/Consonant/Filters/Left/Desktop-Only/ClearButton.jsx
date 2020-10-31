import React from 'react';
import PropTypes from 'prop-types';

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
const ClearBtn = (props) => {
    const {
        onClearAllFilters,
        clearAllFiltersText,
    } = props;

    return (
        <button
            type="button"
            data-testid="left-filter-panel-clear-all-btn"
            className="consonant-left-filters--clear-link"
            onClick={onClearAllFilters}
            tabIndex="0">
            {clearAllFiltersText}
        </button>
    );
};

ClearBtn.propTypes = {
    onClearAllFilters: PropTypes.func.isRequired,
    clearAllFiltersText: PropTypes.string,
};

ClearBtn.defaultProps = {
    clearAllFiltersText: '',
};

export { ClearBtn };
