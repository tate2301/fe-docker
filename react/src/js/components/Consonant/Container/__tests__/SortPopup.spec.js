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

// Create more than 2 filter with different ids
const multipleFilters = [...filters, ...filters]
    .map((item, index) => ({ ...item, id: `${item}_${index}` }));


describe('Sort Popup', () => {
    test('should open select', async () => {
        const configToUse = config;
        await act(async () => render(<Container config={configToUse} />));
        await waitFor(() => screen.getByTestId('select-button'));
        const selectButton = screen.getByTestId('select-button');

        expect(selectButton).not.toHaveClass('consonant-select--btn_active');

        fireEvent.click(selectButton);
        expect(selectButton).toHaveClass('consonant-select--btn_active');
    });

    test('should change to featured sort value', async () => {
        // const { config: { sort: { options, defaultSort } } } = init();
        const configToUse = config;
        const { options } = config.sort;
        const { defaultSort } = config.sort;

        await act(async () => render(<Container config={configToUse} />));

        // get labels by sort value
        const {
            featured,
            defaultLabel,
        } = options.reduce((accumulator, { sort, label }) => {
            if (defaultSort && sort === defaultSort) {
                accumulator.defaultLabel = label;
            }
            switch (sort) {
                case 'featured':
                    accumulator.featured = label;
                    break;
                case 'dateAsc':
                    accumulator.dateAscEnding = label;
                    break;
                case 'dateDesc':
                    accumulator.dateDesc = label;
                    break;
                default:
                    break;
            }

            return accumulator;
        }, { defaultLabel: 'Please select' });

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));

        // get Select input
        const selectButton = screen.getByTestId('select-button');
        fireEvent.click(selectButton);

        // get needed options
        const selectOptions = screen.getByTestId('consonant-select--options');

        const featuredOption = getByText(selectOptions, featured);

        // check if the defaultSort was selected
        expect(selectButton).toHaveTextContent(defaultLabel);

        /**
         * open Select
         * select featured option
         */

        fireEvent.click(featuredOption);

        // check if the featured was selected
        expect(selectButton).toHaveTextContent(featured);
    });

    test('should change to date desc sort value', async () => {
        // const { config: { sort: { options, defaultSort } } } = init();
        const configToUse = config;
        const { options } = config.sort;
        const { defaultSort } = config.sort;

        await act(async () => render(<Container config={configToUse} />));

        // get labels by sort value
        const {
            dateDesc,
            defaultLabel,
        } = options.reduce((accumulator, { sort, label }) => {
            if (defaultSort && sort === defaultSort) {
                accumulator.defaultLabel = label;
            }
            switch (sort) {
                case 'featured':
                    accumulator.featured = label;
                    break;
                case 'dateAsc':
                    accumulator.dateAscEnding = label;
                    break;
                case 'dateDesc':
                    accumulator.dateDesc = label;
                    break;
                default:
                    break;
            }

            return accumulator;
        }, { defaultLabel: 'Please select' });

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));

        // get Select input
        const selectButton = screen.getByTestId('select-button');
        fireEvent.click(selectButton);

        // get needed options
        const selectOptions = screen.getByTestId('consonant-select--options');

        const descOption = getByText(selectOptions, dateDesc);

        // check if the defaultSort was selected
        expect(selectButton).toHaveTextContent(defaultLabel);

        /**
         * open Select
         * select featured option
         */

        fireEvent.click(descOption);

        // check if the featured was selected
        expect(selectButton).toHaveTextContent(dateDesc);

    });

    test('should change to dateAsc sort value', async () => {
        // const { config: { sort: { options, defaultSort } } } = init();
        const configToUse = config;
        const { options } = config.sort;
        const { defaultSort } = config.sort;

        await act(async () => render(<Container config={configToUse} />));

        // get labels by sort value
        const {
            defaultLabel,
            dateAscEnding,
        } = options.reduce((accumulator, { sort, label }) => {
            if (defaultSort && sort === defaultSort) {
                accumulator.defaultLabel = label;
            }
            switch (sort) {
                case 'featured':
                    accumulator.featured = label;
                    break;
                case 'dateAsc':
                    accumulator.dateAscEnding = label;
                    break;
                case 'dateDesc':
                    accumulator.dateDesc = label;
                    break;
                default:
                    break;
            }

            return accumulator;
        }, { defaultLabel: 'Please select' });

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));

        // get Select input
        const selectButton = screen.getByTestId('select-button');
        fireEvent.click(selectButton);

        // get needed options
        const selectOptions = screen.getByTestId('consonant-select--options');
        const dateAscEndingOption = getByText(selectOptions, dateAscEnding);

        // check if the defaultSort was selected
        expect(selectButton).toHaveTextContent(defaultLabel);

        /**
         * open Select
         * select featured option
         */

        fireEvent.click(dateAscEndingOption);

        // check if the featured was selected
        expect(selectButton).toHaveTextContent(dateAscEnding);
    });

    test('shouldn`t set value if defaultSort didn`t present in sort.options', async () => {
        const configToUse = config;
        configToUse.sort.defaultSort = 'notPresentSortOption';
        await act(async () => render(<Container config={configToUse} />));

        await waitFor(() => screen.getByTestId('consonant-collection'));

        const selectButton = screen.getByTestId('select-button');

        expect(selectButton).toHaveTextContent('Featured');
    });
});
