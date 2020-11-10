
import {
    bool,
    func,
    string,
} from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const BookmarkType = {
    onClick: func,
    isBookmarked: bool,
    saveCardIcon: string,
    cardSaveText: string,
    unsaveCardIcon: string,
    cardUnsaveText: string,
    cardId: string.isRequired,
    disableBookmarkIco: bool.isRequired,
};
