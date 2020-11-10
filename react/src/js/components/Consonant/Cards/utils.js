// eslint-disable-next-line import/prefer-default-export
export const selector = ({
    language,
    collection: {
        i18n: { prettyDateIntervalFormat },
    },
}) => ({
    locale: language,
    dateTemlate: prettyDateIntervalFormat,
});
