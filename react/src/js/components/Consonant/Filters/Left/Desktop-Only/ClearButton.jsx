import React from 'react';
import PropTypes from 'prop-types';

/**
 * Left filters button that clears all the chosen filters, the search query
 * and deselects "My bookmarks" feature if selected
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

/* eslint-disable-next-line import/prefer-default-export */
export { ClearBtn };
