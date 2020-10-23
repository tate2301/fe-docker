import {
    screen,
    waitFor,
    fireEvent,
    getByText,
    getByTestId,
    queryAllByTestId,
    act,
    logDOM,
    render,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Container from '../Container';

import config from '../../Helpers/Testing/Mocks/consonant.json';
import cards from '../../Helpers/Testing/Mocks/cards.json';

import makeInit from '../../Helpers/Testing/Utils/Init';
import React from 'react';

// Different window sizes for different cases
const MOBILE_WIDTH = 384;
const DESKTOP_WIDTH = 1800;
const TABLET_MIN_WIDTH = 768;
const DESKTOP_MIN_WIDTH = 1200;

const init = makeInit(Container, config);

const { filterPanel: { filters }, collection: { endpoint } } = config;

const filteredCards = cards.filter(({ appliesTo }) => Boolean(appliesTo));

// Mock api to get card list
const handlers = [
    rest.get(endpoint, (req, res, ctx) => res(
        ctx.status(200),
        ctx.json({ cards }),
    )),
];

window.scrollTo = () => { };
jest.setTimeout(30000);

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ cards }),
    }));

describe('Load More Button', () => {

    test('should render load more component', async () => {

        const configToUse = config;
        config.pagination.type = 'loadMore';
        await act(async () => render(<Container config={configToUse} />));

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));

        // find LoadMore in whole DOM tree
        const loadMoreElement = screen.queryByTestId('consonant-load-more');

        expect(loadMoreElement).not.toBeNull();
    });

    test('should show more', async () => {

        const configToUse = config;
        config.pagination.type = 'loadMore';
        await act(async () => render(<Container config={configToUse} />));

        const { btnText } = config.pagination.i18n.loadMore;
        const { resultsPerPage } = config.collection;
        const { featuredCards } = config;

        const allCardsCount = cards.length + featuredCards.length;

        await waitFor(() => screen.getByTestId('consonant-collection'));

        const loadMoreElement = screen.queryByTestId('consonant-load-more');

        const loadMoreButton = getByText(loadMoreElement, btnText);
        const loadMoreText = getByTestId(loadMoreElement, 'consonant-load-more--text');

        expect(loadMoreText).toHaveTextContent(`${resultsPerPage} ${allCardsCount}`);

        fireEvent.click(loadMoreButton);

        // -2 to oexclude the 1:1 card and full-card
        expect(loadMoreText).toHaveTextContent(`${cards.length - 2} ${allCardsCount}`);
    });
});
