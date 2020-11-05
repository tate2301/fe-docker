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
