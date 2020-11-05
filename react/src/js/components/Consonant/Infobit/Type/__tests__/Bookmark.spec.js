import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
    render,
    screen,
    fireEvent,
} from '@testing-library/react';

import Bookmark from '../Bookmark';

const props = {
    cardId: '1',
    onClick: jest.fn(),
    disableBookmarkIco: true,
};

describe('Consonant/Infobits/Types/Bookmarks', () => {
    test('When a bookmark icon is clicked, the appropriate event handler should be called', () => {
        render(<Bookmark {...props} />);

        const boorkmarksElement = screen.getByTestId('bookmark-button');

        fireEvent.click(boorkmarksElement);

        expect(props.onClick).toBeCalled();
    });
});
