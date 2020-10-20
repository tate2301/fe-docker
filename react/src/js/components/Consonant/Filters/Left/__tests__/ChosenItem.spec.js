import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ChosenItem from '../Desktop-Only/ChosenItem';

import { DEFAULT_PROPS } from '../../../Helpers/Testing/Constants/SelectedFilter';

import makeSetup from '../../../Helpers/Testing/Utils/Settings';

const setup = makeSetup(ChosenItem, DEFAULT_PROPS);

describe('Consonant/ChosenItem', () => {
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
