// eslint-disable-next-line import/prefer-default-export
export const selector = ({
    search: {
        i18n: {
            leftFilterPanel: {
                searchTitle,
            },
        },
    },
}) => ({
    leftPanelTitle: searchTitle,
});
