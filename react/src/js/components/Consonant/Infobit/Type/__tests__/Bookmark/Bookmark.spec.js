import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

import Bookmark from '../../Bookmark/Bookmark';

const props = {
    cardId: '1',
    onClick: jest.fn(),
    disableBookmarkIco: true,
};

describe('Consonant/Bookmarks', () => {
    describe('Interaction with UI', () => {
        test('should call onChange', () => {
            render(<Bookmark {...props} />);

            const boorkmarksElement = screen.getByTestId('bookmark-button');

            fireEvent.click(boorkmarksElement);

            expect(props.onClick).toBeCalled();
        });
    });
});
