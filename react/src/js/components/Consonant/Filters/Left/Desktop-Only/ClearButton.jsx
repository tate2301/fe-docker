import React from 'react';
import { func, string } from 'prop-types';

const TClearButton = {
    clearAllFiltersText: string,
    onClearAllFilters: func.isRequired,
};

const defaultProps = {
    clearAllFiltersText: '',
};

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

ClearBtn.propTypes = TClearButton;
ClearBtn.defaultProps = defaultProps;

/* eslint-disable-next-line import/prefer-default-export */
export { ClearBtn };
