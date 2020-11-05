import React from 'react';

import { TitleType } from './types';
import { titleDefaultProps } from './constants';

/**
 * Title for the left filter panel for the desktop breakpoint
 *
 * @component
 * @example
 * const props= {
    panelHeader: String,
 * }
 * return (
 *   <Title {...props}/>
 * )
 */
/* eslint-disable-next-line import/prefer-default-export */
export const Title = ({ panelHeader }) => (
    <h3
        className="consonant-left-filters--desk-title">
        {panelHeader}
    </h3>
);

Title.propTypes = TitleType;
Title.defaultProps = titleDefaultProps;
