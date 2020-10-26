import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Group as Item } from '../Group';

import {
    DEFAULT_PROPS,
    selectedAllItems,
} from '../../../Testing/Constants/FilterItem';

import makeSetup from '../../../Testing/Utils/Settings';

const setup = makeSetup(Item, DEFAULT_PROPS);

describe('Consonant/Filters/Top/Item', () => {
    test('should render without item count badge', () => {
        setup();

        const badgeElement = screen.queryByTestId('item-badge');

        expect(badgeElement).toBeNull();
    });
    test('should render all list items', () => {
        const { props: { items } } = setup();

        const filterItemElement = screen.queryAllByTestId('filter-group-item');

        expect(filterItemElement).toHaveLength(items.length);
    });
    test('shouldn`t cliped items if items length < 9', () => {
        const defaultItems = [...DEFAULT_PROPS.items];
        defaultItems.length = 5;

        setup({ items: defaultItems });

        const filterGroupElement = screen.getByTestId('filter-group');

        expect(filterGroupElement).not.toHaveClass('consonant-top-filter--items_clipped');
    });

    describe('Interaction with UI', () => {
        test('should call onCheck', () => {
            const { props: { onCheck } } = setup();

            const [checkboxElement] = screen.queryAllByTestId('list-item-checkbox');

            expect(checkboxElement).toBeDefined();

            fireEvent.click(checkboxElement);

            expect(onCheck).toBeCalled();
        });
        // test('should call onClick', () => {
        //     const { props: { onClick, name } } = setup();
        //
        //     const itemLinkElement = screen.getByText(name);
        //
        //     expect(itemLinkElement).not.toBeNull();
        //
        //     fireEvent.click(itemLinkElement);
        //
        //     expect(onClick).toBeCalled();
        // });
        test('should call onClearAll', () => {
            const { props: { onClearAll } } = setup(selectedAllItems);

            const clearBtn = screen.queryByTestId('clear-btn');

            expect(clearBtn).not.toBeNull();

            fireEvent.click(clearBtn);

            expect(onClearAll).toBeCalled();
        });
    });
});
