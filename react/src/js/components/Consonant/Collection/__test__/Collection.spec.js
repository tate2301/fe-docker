import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Collection from '../Collection';

import {
    CARD_STYLE,
    DEFAULT_PROPS,
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
        } = setup({ page: 100, showItemsPerPage: 100 });

        const cardElementList = screen.queryAllByTestId('consonant-card');

        expect(cardElementList).toHaveLength(cards.length);
    });
    describe('Check snapshots', () => {
        test('should correct renders', () => {
            const { tree } = setup();

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly with different card style', () => {
            CARD_STYLE.forEach((style) => {
                const { tree } = setup({ cardStyle: style });

                expect(tree).toMatchSnapshot();
            });
        });
    });

    describe('Interaction with UI', () => {
        test('should call onClick', () => {
            const {
                props: { onCardBookmark },
            } = setup({ allowBookmarking: true, cardsStyle: '3:2' });

            const bookmarkButton = screen.getByTestId('bookmark-button');

            fireEvent.click(bookmarkButton);

            expect(onCardBookmark).toBeCalled();
        });
    });
});
