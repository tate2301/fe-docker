import React from 'react';

import { DateIntervalType } from './types';
import getPrettyDateInterval from '../../../Helpers/prettyFormat';

const defaultProps = {
    locale: '',
    dateFormat: '',
};

/**
 * Date Interval Infobit (shown in 3:2 Card Footer)
 *
 * @component
 * @example
 * const props= {
    locale: String,
    endTime: String,
    startTime: String,
    dateFormat: String,
 * }
 * return (
 *   <DateInterval {...props}/>
 * )
 */
const DateInterval = ({
    locale,
    endTime,
    startTime,
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

DateInterval.propTypes = DateIntervalType;
DateInterval.defaultProps = defaultProps;

export default DateInterval;
