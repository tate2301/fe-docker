
import { collection } from '../Mocks/consonant.json';
import cards from '../Mocks/cards.json';

export const DEFAULT_PROPS = {
    cards,

    pages: 10,
    resultsPerPage: 1,

    onCardBookmark: jest.fn(),
};

export const COLLECTION_PROPS = [
    '3:2',
    '1:1',
    'none',
    'full-card',
].map(cardStyle => ({ ...collection, cardStyle }));
