import React from 'react';
import PropTypes from 'prop-types';

/**
 * Title of the left filters panel for mobile and tablet breakpoints
 *
 * @component
 * @example
 * const props= {
    onClick: Function,
    leftPanelMobileHeader: String,
 * }
 * return (
 *   <Title {...props}/>
 * )
 */
const Title = (props) => {
    const {
        onClick,
        leftPanelMobileHeader,
    } = props;

    return (
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
};

Title.propTypes = {
    onClick: PropTypes.func.isRequired,
    leftPanelMobileHeader: PropTypes.string,
};

Title.defaultProps = {
    leftPanelMobileHeader: '',
};

/* eslint-disable-next-line import/prefer-default-export */
export { Title };
