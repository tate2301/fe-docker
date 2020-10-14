import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Collection from '../Collection';

import {
    DEFAULT_PROPS,
    COLLECTION_PROPS,
} from '../../Helpers/Testing/Constants/Collection';

import makeSetup from '../../Helpers/Testing/Utils/Settings';

const setup = makeSetup(Collection, DEFAULT_PROPS);

describe('Consonant/Collection', () => {
    test('should renders 1 card', () => {
        setup({ page: 1 });

        const cardElementList = screen.queryAllByTestId('consonant-card');

        expect(cardElementList).toHaveLength(1);
    });
    test('should renders all card', () => {
        const {
            props: { cards },
        } = setup({ resultsPerPage: 100 }, { pagination: { type: 'loadMore' } });

        const cardElementList = screen.queryAllByTestId('consonant-card');

        expect(cardElementList).toHaveLength(cards.length);
    });
    describe('Check snapshots', () => {
        test('should correct renders', () => {
            const { tree } = setup();

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly with different card style', () => {
            COLLECTION_PROPS.forEach((collectionProps) => {
                const { tree } = setup({}, { collection: collectionProps });

                expect(tree).toMatchSnapshot();
            });
        });
    });
});
