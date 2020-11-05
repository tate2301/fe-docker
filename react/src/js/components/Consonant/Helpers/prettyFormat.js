import {
    DateTime,
    Interval,
} from 'luxon';

/**
* Gets the Localized Local Time Zone
* @param {Date} someTimeUTC - An authored time in UTC
* @returns {Date} - Locale Time Zone in abbreviated named offset
* @example - EST
*/
const getLocalTimeZone = (someTimeUTC) => {
    const someTime = DateTime.fromISO(someTimeUTC);
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
const getTimeInterval = (startTimeUTC, endTimeUTC, someLocale) => {
    const start = DateTime.fromISO(startTimeUTC, { locale: someLocale });
    const end = DateTime.fromISO(endTimeUTC, { locale: someLocale });
    const i = Interval.fromDateTimes(start, end);
    return i.toFormat('T', { locale: someLocale });
};

/**
* Gets the localized day
* @param {Date} someTimeUTC - An authored time in UTC
* @returns {Date} - A day of the month, padded to 2
* @example - 06
*/
const getDay = (someTimeUTC, someLocale) => {
    const start = DateTime.fromISO(someTimeUTC, { locale: someLocale });
    return start.toFormat('dd', { locale: someLocale });
};

/**
* Gets the localized month
* @param {Date} someTimeUTC - An authored time in UTC
* @returns {Date} - Month as an abbreviated localized string
* @example - Aug
*/
const getMonth = (someTimeUTC, someLocale) => {
    const start = DateTime.fromISO(someTimeUTC, { locale: someLocale });
    return start.toFormat('LLL', { locale: someLocale });
};

/**
* Gets Date Interval for Infobit in pretty format
* @param {Date} startDateUTC - An authored start date in UTC
* @param {Date} endDateUTC - An authored end date in UTC
* @param {String} locale - Locale to translate things to
* @param {String} i18nFormat - Format from AEM on how to render date
* @returns {String} - Date interval in pretty format
* @example - Oct 20 | 13:00 - 14:45 PDT
*/
const getPrettyDateInterval = (startDateUTC, endDateUTC, locale, i18nFormat) => i18nFormat
    .replace('{LLL}', getMonth(startDateUTC, locale))
    .replace('{dd}', getDay(startDateUTC, locale))
    .replace('{timeRange}', getTimeInterval(startDateUTC, endDateUTC, locale))
    .replace('{timeZone}', getLocalTimeZone(endDateUTC));

export default getPrettyDateInterval;
