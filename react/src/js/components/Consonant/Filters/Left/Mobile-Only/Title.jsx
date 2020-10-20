import PropTypes from 'prop-types';
import React from 'react';

const Title = ({
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

/* eslint-disable-next-line import/prefer-default-export */
export { Title };

Title.propTypes = {
    onClick: PropTypes.func.isRequired,
    leftPanelMobileHeader: PropTypes.string,
};

Title.defaultProps = {
    leftPanelMobileHeader: '',
};
