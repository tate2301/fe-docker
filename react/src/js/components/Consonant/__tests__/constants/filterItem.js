
import { filterPanel } from '../mocks/consonant.json';

const { clearFilterText, filters } = filterPanel;
const [{
    id, group, icon, items,
}] = filters;

export const DEFAULT_PROPS = {
    id,
    icon,
    items,
    clearFilterText,

    key: id,
    results: 0, // filtered cards count
    name: group,
    isOpened: false,
    itemsSelected: 0,

    onCheck: jest.fn(),
    onClick: jest.fn(),
    onClearAll: jest.fn(),
};

export const selectedAllItems = {
    itemsSelected: DEFAULT_PROPS.items.length,
    items: DEFAULT_PROPS.items.map(item => ({ ...item, selected: true })),
};
