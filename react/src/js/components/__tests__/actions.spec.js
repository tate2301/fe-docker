import { tagSelectionSavedAction } from '../actions';

describe('tagSelectionSaved action creator', () => {
    it('correctly creates the action given a list of tags', () => {
        const tags = ['tag1', 'tag2', 'tag3'];
        expect(tagSelectionSavedAction(tags)).toEqual({
            type: 'TAG_SELECTION_SAVED',
            tags,
        });
    });
});
