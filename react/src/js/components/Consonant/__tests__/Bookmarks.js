import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Bookmarks from '../Bookmarks';

import {
    COUNT_LIST,
    DEFAULT_PROPS,
} from './constants/bookmarks';

import makeSetup from './utils/settings';

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

    test('should render unselectedIco', () => {
        const { props: { unselectedIco } } = setup();

        const iconElement = screen.getByTestId('bookmarks--ico');

        expect(iconElement).toHaveStyle({ backgroundImage: `url(${unselectedIco})` });
    });
    test('should render selectedIco', () => {
        const { props: { selectedIco } } = setup({ selected: true });

        const iconElement = screen.getByTestId('bookmarks--ico');

        expect(iconElement).toHaveStyle({ backgroundImage: `url(${selectedIco})` });
    });
    test('shouldn`t have style object when selected === true && selectedIco didnt exists', () => {
        setup({ selected: true, selectedIco: '' });

        const iconElement = screen.getByTestId('bookmarks--ico');

        expect(iconElement).not.toHaveStyle({ backgroundImage: "url('')" });
    });
    test('shouldn`t have style object when selected === false && unselectedIco didnt exists', () => {
        setup({ unselectedIco: '' });

        const iconElement = screen.getByTestId('bookmarks--ico');

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
