const luxon = require('luxon');

const { DateTime, Interval } = luxon;

/**
 * E.g. Oct 20 | 13:00 - 14:45 PDT
 * @type {string}
 */
const i18nFormat = '{date} | {timeRange} {timeZone}';

function getLocalTimeZone(someTimeUTC) {
    const someTime = DateTime.fromISO(someTimeUTC);
    return someTime.toFormat('ZZZZ');
}

function getTimeInterval(startTimeUTC, endTimeUTC, someLocale) {
    const start = DateTime.fromISO(startTimeUTC, { locale: someLocale });
    const end = DateTime.fromISO(endTimeUTC, { locale: someLocale });
    const i = Interval.fromDateTimes(start, end);
    return i.toFormat('T', { locale: someLocale });
}

function getDate(startTimeUTC, someLocale) {
    const start = DateTime.fromISO(startTimeUTC, { locale: someLocale });
    return start.toFormat('LLL dd', { locale: someLocale });
}

function prettyFormatDate(locale, startDateUTC, endDateUTC) {
    return i18nFormat
        .replace('{date}', getDate(startDateUTC, locale))
        .replace('{timeRange}', getTimeInterval(startDateUTC, endDateUTC, locale))
        .replace('{timeZone}', getLocalTimeZone(endDateUTC));
}

console.log(prettyFormatDate('de', '2020-10-20T20:00:00Z', '2020-10-20T21:45:00Z'));