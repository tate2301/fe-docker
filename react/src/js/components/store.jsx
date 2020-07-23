import { createStore, combineReducers } from 'redux';

export const preselectedTagsStorageKey = 'preselected-tags';

const preselectedTags = JSON.parse(localStorage.getItem(preselectedTagsStorageKey));

const reducer = combineReducers({
    personalizeReducer: (state = {
        tags: preselectedTags || [],
    }, action) => {
        if (action.type === 'TAG_SELECTION_SAVED') {
            return {
                ...state,
                tags: action.tags,
            };
        }
        return {
            ...state,
        };
    },
});

// eslint-disable-next-line import/prefer-default-export
if (!window.sharedStore) {
    window.sharedStore = createStore(reducer);
}

export default window.sharedStore;
