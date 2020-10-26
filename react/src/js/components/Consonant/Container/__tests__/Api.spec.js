import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
    screen,
    waitFor,
    act,
    render,
} from '@testing-library/react';

import Container from '../Container';
import config from '../../Testing/Mocks/config.json';

const { collection: { endpoint } } = config;

const server = setupServer(rest
    .get(endpoint, (req, res, ctx) => res(
        ctx.status(200),
        ctx.json({ cards: [] }),
    )));

describe('Consonant/Container/Api', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    describe('200 Responses', () => {
        test('If 200 Response -- but no cards returned from API, do not display a card collection', async () => {
            server.use(rest.get(endpoint, (req, res, ctx) => res(
                ctx.status(200),
                ctx.json({ cards: [] }),
            )));

            const configToUse = config;
            await act(async () => render(<Container config={configToUse} />));
            await waitFor(() => screen.queryByTestId('consonant-collection'));
            expect(screen.queryByTestId('consonant-collection')).toBeNull();
        });
    });

    describe('400 Responses', () => {
        test('If 401 Response -- do not display a card collection', async () => {
            server.use(rest.get(endpoint, (req, res, ctx) => res(ctx.status(401))));
            const configToUse = config;
            await act(async () => render(<Container config={configToUse} />));
            await waitFor(() => screen.queryByTestId('consonant-collection'));
            expect(screen.queryByTestId('consonant-collection')).toBeNull();
        });
    });
});

