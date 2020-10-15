import React from 'react';
import PropTypes from 'prop-types';

function Progress({
    label, completionText, percentage, color,
}) {
    const valueStyles = {
        width: `calc(${percentage} + 2px)`,
        backgroundColor: color,
    };

    return (
        <div className="consonant-progress-infobit">
            <div className="consonant-progress-infobit--wrapper">
                <span className="consonant-progress-infobit--text" title={label}>{label}</span>
                <span
                    className="consonant-progress-infobit--text consonant-progress-infobit--text_italic"
                    title={completionText}>{completionText}
                </span>
            </div>
            <div className="consonant-progress-infobit--el">
                <span
                    className="consonant-progress-infobit--val"
                    style={valueStyles}
                    role="progressbar"
                    aria-valuenow={parseInt(percentage, 10)}
                    aria-valuemin="0"
                    aria-valuemax="100">Progress: {percentage}
                </span>
            </div>
        </div>
    );
}

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
    color: '',
};

export default Progress;
