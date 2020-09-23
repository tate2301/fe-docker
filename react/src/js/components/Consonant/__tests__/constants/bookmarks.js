import { bookmarks } from '../mocks/consonant.json';

export const COUNT_LIST = [0, 5, 10, 15, 20];
export const DEFAULT_PROPS = {
    key: 'filtersSideBookmarks',
    selectedIco: bookmarks.selectBookmarksIcon,
    unselectedIco: bookmarks.unselectBookmarksIcon,
    selected: false, // if true - render selectedIco, if false - render unselectedIco
    onClick: jest.fn(), // handler to switch selected prop
    qty: 0, // bookmarked cards count
};
