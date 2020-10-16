import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Bookmarks from '../Bookmarks';

import {
    COUNT_LIST,
    DEFAULT_PROPS,
    WITHOUT_ICONS,
} from '../../Helpers/Testing/Constants/Bookmarks';

import makeSetup from '../../Helpers/Testing/Utils/Settings';

const setup = makeSetup(Bookmarks, DEFAULT_PROPS);

describe('Consonant/Bookmarks', () => {
    test('should renders correctly different bookmarks count', () => {
        COUNT_LIST.forEach((count) => {
            const { wrapper } = setup({ qty: count });

            const badgeElement = screen.getByTestId('bookmarks--item-badge');

            expect(badgeElement).toHaveTextContent(count);
            wrapper.unmount();
        });
    });

    test('should render unselectedIco', async () => {
        const {
            config: {
                bookmarks: {
                    leftFilterPanel: {
                        unselectBookmarksIcon,
                    },
                },
            },
        } = setup();

        const iconElement = screen.getByTestId('bookmarks--ico');

        expect(iconElement).toHaveStyle(`background-image: url(${unselectBookmarksIcon})`);
    });
    test('should render selectedIco', () => {
        const {
            config: {
                bookmarks: {
                    leftFilterPanel: {
                        selectBookmarksIcon,
                    },
                },
            },
        } = setup({ selected: true });

        const iconElement = screen.getByTestId('bookmarks--ico');

        expect(iconElement).toHaveStyle(`background-image: url(${selectBookmarksIcon})`);
    });
    test('shouldn`t have style object when selected === true && selectedIco didnt exists', async () => {
        setup({ selected: true }, { bookmarks: WITHOUT_ICONS });

        const iconElement = await waitFor(() => screen.getByTestId('bookmarks--ico'));

        expect(iconElement).not.toHaveStyle({ backgroundImage: "url('')" });
    });
    test('shouldn`t have style object when selected === false && unselectedIco didnt exists', async () => {
        setup({}, { bookmarks: WITHOUT_ICONS });

        const iconElement = await waitFor(() => screen.getByTestId('bookmarks--ico'));

        expect(iconElement).not.toHaveStyle({ backgroundImage: "url('')" });
    });

    describe('Check snapshots', () => {
        test('should renders correctly', () => {
            const { tree } = setup();

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Interaction with UI', () => {
        test('should call onChange', () => {
            const { props: { onClick } } = setup();

            const boorkmarksElement = screen.getByTestId('bookmarks');

            fireEvent.click(boorkmarksElement);

            expect(onClick).toBeCalled();
        });
    });
});
