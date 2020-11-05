import {
    func,
    shape,
    number,
    arrayOf,
} from 'prop-types';

import { CardType } from '../types/card';

// eslint-disable-next-line import/prefer-default-export
export const CollectionType = {
    pages: number,
    resultsPerPage: number,
    cards: arrayOf(shape(CardType)),
    onCardBookmark: func.isRequired,
};
