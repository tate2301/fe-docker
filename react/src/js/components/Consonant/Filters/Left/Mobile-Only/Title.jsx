import React from 'react';
import {
    string,
    func,
} from 'prop-types';

const titleType = {
    onClick: func.isRequired,
    leftPanelMobileHeader: string,
};

const defaultProps = {
    leftPanelMobileHeader: '',
};

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
            className="consonant-LeftFilters-mobTitle">
            <button
                data-testid="mobile-back-btn"
                type="button"
                onClick={onClick}
                className="consonant-LeftFilters-mobBack" />
            <span>
                {leftPanelMobileHeader}
            </span>
        </div>
    );
};

Title.propTypes = titleType;
Title.defaultProps = defaultProps;

/* eslint-disable-next-line import/prefer-default-export */
export { Title };
