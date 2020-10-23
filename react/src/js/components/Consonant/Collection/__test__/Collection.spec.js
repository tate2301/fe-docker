import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Collection from '../Collection';

import {
    DEFAULT_PROPS,
} from '../../Helpers/Testing/Constants/Collection';

import makeSetup from '../../Helpers/Testing/Utils/Settings';

const setup = makeSetup(Collection, DEFAULT_PROPS);

describe('Consonant/Collection', () => {
    test('should renders 1 card', () => {
        setup({ page: 1 });

        const cardElementList = screen.queryAllByTestId('consonant-card-3-2');

        expect(cardElementList).toHaveLength(1);
    });
    test('should renders all card', () => {
        const {
            props: { cards },
        } = setup({ resultsPerPage: 100 }, { pagination: { type: 'loadMore' } });

        const cardElementList = screen.queryAllByTestId('consonant-card-3-2');
        
        // -3 to exclude the 1:1 and full-card and invalid card style from test
        expect(cardElementList).toHaveLength(cards.length - 3);
    });
});