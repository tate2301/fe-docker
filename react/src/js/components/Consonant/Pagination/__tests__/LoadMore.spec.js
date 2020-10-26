import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import LoadMore from '../LoadMore';

import { DEFAULT_PROPS } from '../../Testing/Constants/LoadMore';

import setup from '../../Testing/Utils/Settings';

const renderLoadMore = setup(LoadMore, DEFAULT_PROPS);

describe('Consonant/Pagination/Load More', () => {
    test('If there are no results, load more should not render', () => {
        const { wrapper: { container } } = renderLoadMore({ total: 0 });

        expect(container).toBeEmptyDOMElement();
    });
    test('If there is nothing to show, load more should not render', () => {
        const { wrapper: { container } } = renderLoadMore({ show: 0 });

        expect(container).toBeEmptyDOMElement();
    });

    test('Click handler should work', () => {
        const { props: { onClick } } = renderLoadMore();

        const buttonElement = screen.getByTestId('load-more__button');

        fireEvent.click(buttonElement);

        expect(onClick).toBeCalled();
    });
});
