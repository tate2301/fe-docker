import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SearchIco from '../SearchIco';

import makeSetup from './utils/settings';

const setup = makeSetup(SearchIco, {
    onClick: jest.fn(),
});

describe('Consonant/SearchIco', () => {
    describe('Check snapshots', () => {
        test('should renders correctly', () => {
            const { tree } = setup();

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Interaction with UI', () => {
        test('should call onClick', () => {
            const { props: { onClick } } = setup();

            const iconElement = screen.getByText('Click to search');

            fireEvent.click(iconElement);

            expect(onClick).toBeCalled();
        });
    });
});
