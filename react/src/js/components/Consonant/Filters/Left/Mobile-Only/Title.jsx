import React from 'react';

import { TitleType } from './types';
import { titleDefaultProps } from './constants';

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
/* eslint-disable-next-line import/prefer-default-export */
export const Title = ({
    onClick,
    leftPanelMobileHeader,
}) => (
    <div
        className="consonant-left-filters--mob-title">
        <button
            type="button"
            onClick={onClick}
            data-testid="mobile-back-btn"
            className="consonant-left-filters--mob-back" />
        <span>
            {leftPanelMobileHeader}
        </span>
    </div>
);

Title.propTypes = TitleType;
Title.defaultProps = titleDefaultProps;
