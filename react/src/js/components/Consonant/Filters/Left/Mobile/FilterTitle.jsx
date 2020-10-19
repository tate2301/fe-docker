import PropTypes from 'prop-types';
import React from 'react';

const LeftPanelMobileFilterTitle = ({
    onClick,
    leftPanelMobileHeader,
}) => (
    <div className="consonant-left-filters--mob-title">
        <button
            type="button"
            onClick={onClick}
            className="consonant-left-filters--mob-back">
            Back
        </button>
        <span>{leftPanelMobileHeader}</span>
    </div>
);

export default LeftPanelMobileFilterTitle;

LeftPanelMobileFilterTitle.propTypes = {
    onClick: PropTypes.func.isRequired,
    leftPanelMobileHeader: PropTypes.string,
};

LeftPanelMobileFilterTitle.defaultProps = {
    leftPanelMobileHeader: '',
};
