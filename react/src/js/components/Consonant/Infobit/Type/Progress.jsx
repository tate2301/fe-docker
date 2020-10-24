import React from 'react';
import PropTypes from 'prop-types';

/**
 * Progress Bar infobit (shown in 3:2 Card Footer)
 *
 * @component
 * @example
 * const props= {
    label: String,
    completionText: String,
    percentage: String,
    color: String
 * }
 * return (
 *   <Progress {...props}/>
 * )
 */
const Progress = ({
    label,
    completionText,
    percentage,
    color,
}) => {
    const valueStyles = {
        width: `calc(${percentage} + 2px)`,
        backgroundColor: color,
    };

    const BASE_10 = 10;
    /**
     * Percentage as int to be used in Aria Label
     *
     * This is different than Percentage prop @type {String} which is diplayed
     * to user
     * @type {Int}
     */
    const percentageInt = parseInt(percentage, BASE_10);

    return (
        <div
            className="consonant-progress-infobit">
            <div
                className="consonant-progress-infobit--wrapper">
                <span
                    className="consonant-progress-infobit--text"
                    title={label}>
                    {label}
                </span>
                <span
                    className="consonant-progress-infobit--text consonant-progress-infobit--text_italic"
                    title={completionText}>
                    {completionText}
                </span>
            </div>
            <div
                className="consonant-progress-infobit--el">
                <span
                    className="consonant-progress-infobit--val"
                    style={valueStyles}
                    role="progressbar"
                    aria-valuenow={percentageInt}
                    aria-valuemin="0"
                    aria-valuemax="100">
                    {percentage}
                </span>
            </div>
        </div>
    );
};

Progress.propTypes = {
    label: PropTypes.string,
    completionText: PropTypes.string,
    percentage: PropTypes.string,
    color: PropTypes.string,
};

Progress.defaultProps = {
    label: '',
    completionText: '',
    percentage: '0',
    color: '#1473E6',
};

export default Progress;
