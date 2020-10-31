import React from 'react';
import {
    string,
    func,
} from 'prop-types';

const TitleType = {
    onClick: func.isRequired,
    leftPanelMobileHeader: string,
};

const defaultProps = {
    leftPanelMobileHeader: '',
};

const Title = ({
    onClick,
    leftPanelMobileHeader,
}) => (
    <div
        className="consonant-left-filters--mob-title">
        <button
            data-testid="mobile-back-btn"
            type="button"
            onClick={onClick}
            className="consonant-left-filters--mob-back" />
        <span>
            {leftPanelMobileHeader}
        </span>
    </div>
);

Title.propTypes = TitleType;
Title.defaultProps = defaultProps;

/* eslint-disable-next-line import/prefer-default-export */
export { Title };
