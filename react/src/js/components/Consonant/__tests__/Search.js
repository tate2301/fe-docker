import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Search from '../Search';

import { DEFAULT_PROPS } from './constants/search';

import makeSetup from './utils/settings';

const setup = makeSetup(Search, DEFAULT_PROPS);

describe('Consonant/Search', () => {
    describe('Check snapshots', () => {
        test('should renders correctly without value', () => {
            const { tree } = setup({ value: 'search value' });

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly with value', () => {
            const { tree } = setup();

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Interaction with UI', () => {
        test('should call onBlur', () => {
            const { props: { onBlur } } = setup();

            const inputElement = screen.getByTestId('search-input');

            fireEvent.focus(inputElement);
            fireEvent.blur(inputElement);

            expect(onBlur).toBeCalled();
        });
        test('shouldn not throw error about onBlur is not a function', () => {
            setup({ onBlur: null });

            const inputElement = screen.getByTestId('search-input');

            fireEvent.focus(inputElement);
            fireEvent.blur(inputElement);
        });
        test('should call onSearch', () => {
            const { props: { onSearch } } = setup({ value: 'Search string' });

            const inputElement = screen.getByTestId('search-input');

            expect(inputElement.value).toBe('Search string');

            fireEvent.change(inputElement, { target: { value: 'New search string' } });

            expect(onSearch).toBeCalled();
            expect(onSearch).toBeCalledWith('New search string');

            onSearch.mockClear();
        });
        test('should clear search value', () => {
            const { props: { onSearch } } = setup();

            const buttonElement = screen.getByText('clear');

            fireEvent.click(buttonElement);

            expect(onSearch).toBeCalled();
            expect(onSearch).toBeCalledWith('');
        });
    });
});
