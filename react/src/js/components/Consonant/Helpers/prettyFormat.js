import { template } from './general';

const { DateTime, Interval } = require('luxon');

/**
 * Gets the Localized Local Time Zone
 * @param {Date} someTimeUTC - An authored time in UTC
 * @returns {Date} - Locale Time Zone in abbreviated named offset
 * @example - EST
 */
const getLocalTimeZone = (timeUTC) => {
    const someTime = DateTime.fromISO(timeUTC);

    return someTime.toFormat('ZZZZ');
};

/**
 * Gets the Local Time Interval
 * @param {Date} startDateUTC - An authored start date in UTC
 * @param {Date} endDateUTC - An authored end date in UTC
 * @param {String} locale - Locale to translate things to
 * @returns {Date} - Time Interval in localized 24-hour time
 * @example - 13:00 - 14:45
 */
const getTimeInterval = (startTimeUTC, endTimeUTC, locale) => {
    const options = { locale };

    const start = DateTime.fromISO(startTimeUTC, options);
    const end = DateTime.fromISO(endTimeUTC, options);
    const interval = Interval.fromDateTimes(start, end);

    return interval.toFormat('T', { locale });
};

/**
 * Gets the localized day
 * @param {Date} someTimeUTC - An authored time in UTC
 * @returns {Date} - A day of the month, padded to 2
 * @example - 06
 */
const getDay = (someTimeUTC, locale) => {
    const options = { locale };

    const start = DateTime.fromISO(someTimeUTC, options);

    return start.toFormat('dd', { locale });
};

/**
 * Gets the localized month
 * @param {Date} someTimeUTC - An authored time in UTC
 * @returns {Date} - Month as an abbreviated localized string
 * @example - Aug
 */
const getMonth = (someTimeUTC, locale) => {
    const options = { locale };

    const start = DateTime.fromISO(someTimeUTC, options);

    return start.toFormat('LLL', options);
};

/**
 * Gets Date Interval for Infobit in pretty format
 * @param {Date} startDateUTC - An authored start date in UTC
 * @param {Date} endDateUTC - An authored end date in UTC
 * @param {String} locale - Locale to translate things to
 * @param {String} text - Format from AEM on how to render date
 * @returns {String} - Date interval in pretty format
 * @example - Oct 20 | 13:00 - 14:45 PDT
 */
const getPrettyDateInterval = (startDateUTC, endDateUTC, locale, text) => {
    const dates = {
        dd: getDay(endDateUTC, locale),
        LLL: getMonth(startDateUTC, locale),
        timeZone: getLocalTimeZone(endDateUTC),
        timeRange: getTimeInterval(startDateUTC, endDateUTC, locale),
    };

    return template(text, dates);
};

export default getPrettyDateInterval;
