const { DateTime, Interval } = require('luxon');

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

function getDay(startTimeUTC, someLocale) {
    const start = DateTime.fromISO(startTimeUTC, { locale: someLocale });
    return start.toFormat('dd', { locale: someLocale });
}

function getMonth(startTimeUTC, someLocale) {
    const start = DateTime.fromISO(startTimeUTC, { locale: someLocale });
    return start.toFormat('LLL', { locale: someLocale });
}

/**
 * E.g. Oct 20 | 13:00 - 14:45 PDT
 * @type {string}
 */
export default function getPrettyDateInterval(startDateUTC, endDateUTC, locale, i18nFormat) {
    return i18nFormat
        .replace('{LLL}', getMonth(startDateUTC, locale))
        .replace('{dd}', getDay(startDateUTC, locale))
        .replace('{timeRange}', getTimeInterval(startDateUTC, endDateUTC, locale))
        .replace('{timeZone}', getLocalTimeZone(endDateUTC));
}
