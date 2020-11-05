import {
    bool,
    func,
    number,
} from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const BookmarksType = {
    showBookmarks: bool,
    savedCardsCount: number,
    onClick: func.isRequired,
};
