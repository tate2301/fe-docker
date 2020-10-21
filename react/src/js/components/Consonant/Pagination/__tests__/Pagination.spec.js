import { screen, fireEvent, getNodeText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import mockconfig from '../../Helpers/Testing/Mocks/consonant.json';

import Paginator from '../Paginator';

import { PAGE_LIST, PAGES_PROPS, DEFAULT_PROPS } from '../../Helpers/Testing/Constants/Pagination';

import makeSetup from '../../Helpers/Testing/Utils/Settings';
import { getItemsRange } from '../../Helpers/Testing/Utils/Pagination';

const setup = makeSetup(Paginator, DEFAULT_PROPS);

const { pagination: { i18n: { paginator: { resultsQuantityText } } } } = mockconfig;

describe('Consonant/Pagination', () => {
    test('should render different items range', () => {
        PAGE_LIST.forEach((page) => {
            const { props: { showItemsPerPage, totalResults }, wrapper } =
                setup({ currentPageNumber: page });

            const { start, end } = getItemsRange({
                page, totalResults, itemsPerPage: showItemsPerPage,
            });

            const itemsToDisplay = {
                start, end, total: totalResults,
            };

            const summary = resultsQuantityText
                .replace(/\{(\w*)}/gi, (_, matchedKey) => itemsToDisplay[matchedKey]);

            const paginationSummaryElement = screen.getByTestId('pagination--summary');

            expect(paginationSummaryElement).toHaveTextContent(summary);
            wrapper.unmount();
        });
    });

    describe('Interaction with UI', () => {
        test('should call onClick', () => {
            const { props: { onClick } } = setup();

            const prevButton = screen.getByTestId('btn_prev');
            const nextButton = screen.getByTestId('btn_next');
            const pageButton = screen.queryAllByTestId('btn_page')[0];

            fireEvent.click(nextButton);

            expect(onClick).toHaveBeenCalledWith(2);

            fireEvent.click(prevButton);

            expect(onClick).toHaveBeenCalledWith(1);

            fireEvent.click(pageButton);
            const buttonText = getNodeText(pageButton);

            expect(onClick).toHaveBeenCalledWith(Number(buttonText));
        });
        test('should call onClick with 1', () => {
            const { props: { onClick } } = setup({ currentPageNumber: 0 });

            const prevButton = screen.getByTestId('btn_prev');

            fireEvent.click(prevButton);

            expect(onClick).toHaveBeenCalledWith(1);
        });
        test('should call onClick with totalPages', () => {
            const { props: { onClick } } = setup({ currentPageNumber: 2, totalPages: 1 });

            const nextButton = screen.getByTestId('btn_next');

            fireEvent.click(nextButton);

            expect(onClick).toHaveBeenCalledWith(1);
        });
        test('should call onClick with currentPageNumber - 1', () => {
            const { props: { onClick } } = setup({ currentPageNumber: 5 });

            const prevButton = screen.getByTestId('btn_prev');

            fireEvent.click(prevButton);

            expect(onClick).toHaveBeenCalledWith(4);
        });
        test('should call onClick not with 0', () => {
            const { props: { onClick } } = setup({ currentPageNumber: 1 });

            const prevButton = screen.getByTestId('btn_prev');

            fireEvent.click(prevButton);

            expect(onClick).toHaveBeenCalledWith(1);
        });
    });
});
