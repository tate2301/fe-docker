import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import LoadMore from '../LoadMore';

import { DEFAULT_PROPS } from '../../Testing/Constants/LoadMore';

import makeSetup from '../../Testing/Utils/Settings';

const setup = makeSetup(LoadMore, DEFAULT_PROPS);

describe('Consonant/LoadMore', () => {
    test('shouldn`t render if total is 0', () => {
        const { wrapper: { container } } = setup({ total: 0 });

        expect(container).toBeEmptyDOMElement();
    });
    test('shouldn`t render if show is 0', () => {
        const { wrapper: { container } } = setup({ show: 0 });

        expect(container).toBeEmptyDOMElement();
    });

    describe('Interaction with UI', () => {
        test('should call onClick', () => {
            const { props: { onClick } } = setup();

            const buttonElement = screen.getByTestId('load-more__button');

            fireEvent.click(buttonElement);

            expect(onClick).toBeCalled();
        });
    });
});
