export const saveBookmarksToLocalStorage = (bookmarksValue) => {
    try {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarksValue, null, 2));
    } catch {
        console.warn('We could not save your bookmarks, please try to reload this page.');
    }
}
