export const saveBookmarksToLocalStorage = (bookmarksValue) => {
    try {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarksValue, null, 2));
    } catch (e) {
        console.warn('We could not save your bookmarks, please try to reload this page.');
    }
};

export const readBookmarksFromLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem('bookmarks'));
    return Array.isArray(data) ? data : null;
};

export const truncateString = (str, num) => {
    if (str.length <= num) return str;
    return `${str.slice(0, num)}...`;
};

export const truncateList = (list, limit) => {
    // No limit, return all;
    if (limit < 0) return list;

    // Slice received data to required q-ty;
    return list.slice(0, limit);
};

export const removeDuplicatesByKey = (list, key) => {
    const newList = [];
    const ids = new Set();
    list.forEach((item) => {
        if (!ids.has(item[key])) {
            newList.push(item);
            ids.add(item[key]);
        }
    });
    return newList;
};
