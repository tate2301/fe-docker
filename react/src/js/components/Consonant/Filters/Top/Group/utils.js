// eslint-disable-next-line import/prefer-default-export
export const selector = ({
    filterPanel: {
        i18n: {
            topPanel: {
                mobile: {
                    group: {
                        doneBtnText: doneButtonText,
                        applyBtnText: applyButtonText,
                        totalResultsText: totalResultTextTemplate,
                    },
                },
            },
        },
    },
}) => ({
    doneButtonText,
    applyButtonText,
    totalResultTextTemplate,
});
