// eslint-disable-next-line import/prefer-default-export
export const selector = ({
    filterPanel: {
        i18n: {
            leftPanel: {
                mobile: {
                    group: {
                        doneBtnText,
                        applyBtnText,
                        totalResultsText,
                    },
                },
            },
        },
    },
}) => ({
    doneButtonText: doneBtnText,
    applyButtonText: applyBtnText,
    totalResultsTextTemplate: totalResultsText,
});
