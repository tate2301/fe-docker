import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SelectedFilter from '../SelectedFilter';

import { DEFAULT_PROPS } from './constants/selectedFilter';

import makeSetup from './utils/settings';

const setup = makeSetup(SelectedFilter, DEFAULT_PROPS);

describe('Consonant/SelectedFilter', () => {
    describe('Check snapshots', () => {
        test('should renders correctly', () => {
            const { tree } = setup();

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Interaction with UI', () => {
        test('should call onOpen', () => {
            const {
                props: {
                    id,
                    name,
                    onClick,
                    parentId,
                },
            } = setup();

            const buttonElement = screen.getByText(name);

            fireEvent.click(buttonElement);

            expect(onClick).toBeCalled();
            expect(onClick).toHaveBeenCalledWith(parentId, id, false);
        });
    });
});
