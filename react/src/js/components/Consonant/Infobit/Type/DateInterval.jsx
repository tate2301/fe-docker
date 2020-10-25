import React from 'react';
import PropTypes from 'prop-types';
import getPrettyDateInterval from '../../Helpers/prettyFormat';

/**
 * Date Interval Infobit (shown in 3:2 Card Footer)
 *
 * @component
 * @example
 * const props= {
    startTime: String,
    endTime: String,
    locale: String,
    dateFormat: String,
 * }
 * return (
 *   <DateInterval {...props}/>
 * )
 */
const DateInterval = ({
    startTime,
    endTime,
    locale,
    dateFormat,
}) => {
    const prettyDateInterval = getPrettyDateInterval(startTime, endTime, locale, dateFormat);
    return (
        <span
            title={prettyDateInterval}
            className="consonant-date-interval-infobit">
            {prettyDateInterval}
        </span>
    );
};

DateInterval.propTypes = {
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    dateFormat: PropTypes.string.isRequired,
};

export default DateInterval;
