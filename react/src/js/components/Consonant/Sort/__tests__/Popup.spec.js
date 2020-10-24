import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { DEFAULT_PROPS } from '../../Helpers/Testing/Constants/Select';
import Popup from '../Popup';
import setup from '../../Helpers/Testing/Utils/Settings';

const renderSortPopup = setup(Popup, DEFAULT_PROPS);

describe('Sort Popup', () => {
    test('Should show all sort options', async () => {
        const { props: { values } } = renderSortPopup();
        const sortPopup = screen.getByTestId('select-button');

        fireEvent.click(sortPopup);

        const optionElements = screen.getAllByTestId('select-option');
        expect(optionElements).toHaveLength(values.length);
    });

    test('Click handler should work', () => {
        const { props: { onSelect } } = renderSortPopup();
        const sortPopup = screen.getByTestId('select-button');

        fireEvent.click(sortPopup);
        const [optionElement] = screen.getAllByTestId('select-option');
        fireEvent.click(optionElement);

        expect(onSelect).toBeCalled();
    });
});
