import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FilterItem from '../FilterItem';

import {
    DEFAULT_PROPS,
    selectedAllItems,
} from './constants/filterItem';

import makeSetup from './utils/settings';

const setup = makeSetup(FilterItem, DEFAULT_PROPS);

describe('Consonant/FilterItem', () => {
    test('should render without item count badge', () => {
        setup();

        const badgeElement = screen.queryByTestId('item-badge');

        expect(badgeElement).toBeNull();
    });
    test('should render with item count badge', () => {
        setup(selectedAllItems);

        const badgeElement = screen.queryByTestId('item-badge');

        expect(badgeElement).not.toBeNull();

        expect(badgeElement).toHaveTextContent(String(selectedAllItems.itemsSelected));
    });
    test('should render all list items', () => {
        const { props: { items } } = setup();

        const listItemElement = screen.queryAllByTestId('list-item');

        expect(listItemElement).toHaveLength(items.length);
    });

    describe('Check snapshots', () => {
        test('should renders correctly when closed', () => {
            const { tree } = setup();

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly when opened', () => {
            const { tree } = setup({ isOpened: true });

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Interaction with UI', () => {
        test('should call onCheck', () => {
            const { props: { onCheck } } = setup();

            const [checkboxElement] = screen.queryAllByTestId('list-item-checkbox');

            expect(checkboxElement).toBeDefined();

            fireEvent.click(checkboxElement);

            expect(onCheck).toBeCalled();
        });
        test('should call onClick', () => {
            const { props: { onClick, name } } = setup();

            const itemLinkElement = screen.getByText(name);

            expect(itemLinkElement).not.toBeNull();

            fireEvent.click(itemLinkElement);

            expect(onClick).toBeCalled();
        });
        test('should call onClearAll', () => {
            const { props: { onClearAll } } = setup(selectedAllItems);

            const badgeElement = screen.queryByTestId('item-badge');

            expect(badgeElement).not.toBeNull();

            fireEvent.click(badgeElement);

            expect(onClearAll).toBeCalled();
        });
    });
});
