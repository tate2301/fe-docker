import { string } from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const DateIntervalType = {
    locale: string,
    dateFormat: string,
    endTime: string.isRequired,
    startTime: string.isRequired,
};
