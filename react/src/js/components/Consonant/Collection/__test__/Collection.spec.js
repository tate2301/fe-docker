import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Collection from '../Collection';

import { DEFAULT_PROPS } from '../../Testing/Constants/Collection';

import setup from '../../Testing/Utils/Settings';

const renderCollection = setup(Collection, DEFAULT_PROPS);

describe('Consonant/Collection', () => {
    test('should render 1 card if on page 1 and 1 card rendered per page', () => {
        renderCollection({ page: 1 });

        const cardElementList = screen.queryAllByTestId('consonant-OneHalfCard');

        expect(cardElementList).toHaveLength(1);
    });
    test('should be able to render all cards', () => {
        const {
            props: { cards },
        } = renderCollection({ resultsPerPage: Number.MAX_SAFE_INTEGER }, { pagination: { type: 'loadMore' } });

        const threeByTwoCards = screen.queryAllByTestId('consonant-OneHalfCard');
        const oneByOneCards = screen.queryAllByTestId('consonant-ThreeFourthCard');
        const fullCards = screen.queryAllByTestId('consonant-FullCard');

        const totalCards = threeByTwoCards.length + oneByOneCards.length + fullCards.length;
        expect(totalCards).toEqual(cards.length);
    });
});
