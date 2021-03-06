import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
    screen,
    waitFor,
    fireEvent,
    getByText,
    act,
    render,
} from '@testing-library/react';


import Container from '../Container';
import setupIntersectionObserverMock from '../../Testing/Mocks/intersectionObserver';
import config from '../../Testing/Mocks/config.json';
import cards from '../../Testing/Mocks/cards.json';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ cards }),
    }));

setupIntersectionObserverMock();

describe('Consonant/Container/Sort Popup', () => {
    test('should be able to open the sort popup', async () => {
        const configToUse = config;
        await act(async () => render(<Container config={configToUse} />));
        await waitFor(() => screen.getByTestId('select-button'));
        const selectButton = screen.getByTestId('select-button');

        expect(selectButton).not.toHaveClass('consonant-select--btn_active');

        fireEvent.click(selectButton);
        expect(selectButton).toHaveClass('consonant-select--btn_active');
    });

    test('should be able to feature sort cards', async () => {
        const configToUse = config;
        const { options } = config.sort;
        const { defaultSort } = config.sort;

        await act(async () => render(<Container config={configToUse} />));

        // get labels by sort values
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

        // We need to wait for the api response and state updates
        await waitFor(() => screen.getByTestId('consonant-collection'));

        // Gets Sort Popup input
        const selectButton = screen.getByTestId('select-button');
        fireEvent.click(selectButton);

        // Gets needed sort options
        const selectOptions = screen.getByTestId('consonant-select--options');

        const featuredOption = getByText(selectOptions, featured);

        // Checks if the defaultSort was selected
        expect(selectButton).toHaveTextContent(defaultLabel);

        fireEvent.click(featuredOption);

        // checks to see if featured sort was selected
        expect(selectButton).toHaveTextContent(featured);
    });

    test('should be able to use date desc sort', async () => {
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

        // We need to wait for api response and state updates
        await waitFor(() => screen.getByTestId('consonant-collection'));

        // Get The Sort Popup Input
        const selectButton = screen.getByTestId('select-button');
        fireEvent.click(selectButton);

        // Gets all sort options
        const selectOptions = screen.getByTestId('consonant-select--options');

        const descOption = getByText(selectOptions, dateDesc);

        // Checks if the defaultSort was selected
        expect(selectButton).toHaveTextContent(defaultLabel);

        fireEvent.click(descOption);

        // checks if the descending date option was selected
        expect(selectButton).toHaveTextContent(dateDesc);
    });

    test('should be able to sort by date ascending', async () => {
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

        // We need to wait for the api response and state updates
        await waitFor(() => screen.getByTestId('consonant-collection'));

        // Gets The Sort Popup input
        const selectButton = screen.getByTestId('select-button');
        fireEvent.click(selectButton);

        // Gets the different sort options
        const selectOptions = screen.getByTestId('consonant-select--options');
        const dateAscEndingOption = getByText(selectOptions, dateAscEnding);

        // Checks if defaultSort was selected
        expect(selectButton).toHaveTextContent(defaultLabel);

        fireEvent.click(dateAscEndingOption);

        // Checks if date ascending was selected
        expect(selectButton).toHaveTextContent(dateAscEnding);
    });

    test('If invalid sort option authored, fallback to use featured sort', async () => {
        const configToUse = config;
        configToUse.sort.defaultSort = 'notPresentSortOption';
        await act(async () => render(<Container config={configToUse} />));

        await waitFor(() => screen.getByTestId('consonant-collection'));

        const selectButton = screen.getByTestId('select-button');

        expect(selectButton).toHaveTextContent('Featured');
    });
});
