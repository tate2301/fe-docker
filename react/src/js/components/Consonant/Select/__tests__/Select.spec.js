import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Select from '../Select';

import { DEFAULT_PROPS } from '../../Helpers/Testing/Constants/Select';

import makeSetup from '../../Helpers/Testing/Utils/Settings';

const setup = makeSetup(Select, DEFAULT_PROPS);

describe('Consonant/Select', () => {
    test('should render right options count', () => {
        const { props: { values } } = setup();

        const optionElements = screen.getAllByTestId('select-option');

        expect(optionElements).toHaveLength(values.length);
    });

    describe('Interaction with UI', () => {
        test('should call onSelect', () => {
            const { props: { onSelect } } = setup();

            const [optionElement] = screen.getAllByTestId('select-option');

            fireEvent.click(optionElement);

            expect(onSelect).toBeCalled();
        });
    });
});
