import '@testing-library/jest-dom/extend-expect';
import {
    screen,
    fireEvent,
} from '@testing-library/react';

import { Group as Item } from '../Group';
import setup from '../../../Testing/Utils/Settings';
import {
    DEFAULT_PROPS,
    selectedAllItems,
} from '../../../Testing/Constants/FilterItem';

const renderTopFilterItem = setup(Item, DEFAULT_PROPS);

describe('Consonant/Filters/Top/Item', () => {
    test('Should be able to render without an item count badge', () => {
        renderTopFilterItem();

        const badgeElement = screen.queryByTestId('item-badge');
        expect(badgeElement).toBeNull();
    });

    test('Should be able to render all list items', () => {
        const { props: { items } } = renderTopFilterItem();

        const filterItemElement = screen.queryAllByTestId('filter-group-item');
        expect(filterItemElement).toHaveLength(items.length);
    });

    test('Items should NOT be clipped if item length is less than 9', () => {
        const defaultItems = [...DEFAULT_PROPS.items];
        defaultItems.length = 5;

        renderTopFilterItem({ items: defaultItems });

        const filterGroupElement = screen.getByTestId('filter-group');
        expect(filterGroupElement).not.toHaveClass('consonant-TopFilter-items--clipped');
    });

    test('Clicking filter checkboxes should work', () => {
        const { props: { onCheck } } = renderTopFilterItem();

        const [checkboxElement] = screen.queryAllByTestId('list-item-checkbox');
        expect(checkboxElement).toBeDefined();

        fireEvent.click(checkboxElement);
        expect(onCheck).toBeCalled();
    });

    test('Clicking the clear all button should work', () => {
        const { props: { onClearAll } } = renderTopFilterItem(selectedAllItems);

        const clearBtn = screen.queryByTestId('clear-btn');
        expect(clearBtn).not.toBeNull();

        fireEvent.click(clearBtn);
        expect(onClearAll).toBeCalled();
    });
});
