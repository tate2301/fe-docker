import PropTypes from 'prop-types';
import React from 'react';

const ClearBtn = ({
    onClearAllFilters,
    clearAllFiltersText,
}) => (
    <button
        type="button"
        data-testid="left-filter-panel-clear-all-btn"
        className="consonant-left-filters--clear-link"
        onClick={onClearAllFilters}
        tabIndex="0">
        {clearAllFiltersText}
    </button>
);

/* eslint-disable-next-line import/prefer-default-export */
export { ClearBtn };

ClearBtn.propTypes = {
    onClearAllFilters: PropTypes.func.isRequired,
    clearAllFiltersText: PropTypes.string,
};

ClearBtn.defaultProps = {
    clearAllFiltersText: '',
};
