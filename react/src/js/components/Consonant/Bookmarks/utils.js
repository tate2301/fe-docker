// eslint-disable-next-line import/prefer-default-export
export const selector = ({
    bookmarks: {
        leftFilterPanel: { selectBookmarksIcon, unselectBookmarksIcon },
        i18n: {
            leftFilterPanel: { filterTitle },
        },
    },
}) => ({
    label: filterTitle,
    selectIcon: selectBookmarksIcon,
    unselectIcon: unselectBookmarksIcon,
});
