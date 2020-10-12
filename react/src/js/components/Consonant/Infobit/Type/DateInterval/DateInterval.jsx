import React from 'react';
import PropTypes from 'prop-types';
import prettyFormatDate from './prettyFormat';

function DateInterval({
    startTime, endTime, locale, dateFormat,
}) {
    const res = prettyFormatDate(startTime, endTime, locale, dateFormat);
    return <span title={res} className="consonant-date-interval-infobit">{res}</span>;
}

DateInterval.propTypes = {
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    dateFormat: PropTypes.string.isRequired,
};

export default DateInterval;
