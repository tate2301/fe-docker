const luxon = require('luxon');

const { DateTime, Interval } = luxon;

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

/**
 * E.g. Oct 20 | 13:00 - 14:45 PDT
 * @type {string}
 */
function prettyFormatDate(startDateUTC, endDateUTC, locale, i18nFormat) {
    return i18nFormat
        .replace('{date}', getDate(startDateUTC, locale))
        .replace('{timeRange}', getTimeInterval(startDateUTC, endDateUTC, locale))
        .replace('{timeZone}', getLocalTimeZone(endDateUTC));
}

const prettyFormat = prettyFormatDate('2020-10-20T20:00:00Z', '2020-10-20T21:45:00Z', 'de', '{date} | {timeRange} {timeZone}');
console.log(prettyFormat);