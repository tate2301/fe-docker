
import { cards, bookmarks, collection } from '../Mocks/consonant.json';

const {
    cardStyle,
} = collection;

const {
    enabled: allowBookmarking,
    cardUnsavedIcon,
    cardSavedIcon,
    saveCardText,
    unsaveCardText,
} = bookmarks;

export const DEFAULT_PROPS = {
    cards,
    allowBookmarking,
    saveCardText,
    unsaveCardText,

    page: 10,
    showItemsPerPage: 1,
    cardsStyle: cardStyle,
    cardSavedIco: cardSavedIcon,
    cardUnsavedIco: cardUnsavedIcon,

    onCardBookmark: jest.fn(),
};

export const CARD_STYLE = [
    '3:2',
    '1:1',
    'none',
    'full-card',
];
