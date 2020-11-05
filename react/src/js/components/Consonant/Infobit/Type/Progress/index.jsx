import React, { useMemo } from 'react';

import { ProgressType } from './types';
import { BASE_10, defaultProps } from './constants';

/**
 * Progress Bar infobit (shown in 3:2 Card Footer)
 *
 * @component
 * @example
 * const props= { label: String,
    color: String
    percentage: String,
    completionText: String,
 * }
 * return (
 *   <Progress {...props}/>
 * )
 */
const Progress = ({
    label,
    color,
    percentage,
    completionText,
}) => {
    /**
     * Percentage as int to be used in Aria Label
     *
     * This is different than Percentage prop @type {String} which is diplayed
     * to user
     * @type {Number}
     */
    const percentageInt = parseInt(percentage, BASE_10);

    const valueStyles = useMemo(() => ({
        backgroundColor: color,
        width: `calc(${percentage} + 2px)`,
    }), [color, percentage]);

    return (
        <div
            className="consonant-progress-infobit">
            <div
                className="consonant-progress-infobit--wrapper">
                <span
                    title={label}
                    className="consonant-progress-infobit--text">
                    {label}
                </span>
                <span
                    title={completionText}
                    className="consonant-progress-infobit--text consonant-progress-infobit--text_italic">
                    {completionText}
                </span>
            </div>
            <div
                className="consonant-progress-infobit--el">
                <span
                    aria-valuemin="0"
                    role="progressbar"
                    aria-valuemax="100"
                    style={valueStyles}
                    aria-valuenow={percentageInt}
                    className="consonant-progress-infobit--val">
                    {percentage}
                </span>
            </div>
        </div>
    );
};

Progress.propTypes = ProgressType;
Progress.defaultProps = defaultProps;

export default Progress;
