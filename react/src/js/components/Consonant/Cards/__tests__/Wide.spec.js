import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Card from '../WideCard';

import { DEFAULT_PROPS_3_2 } from '../../Testing/Constants/Card';

import setup from '../../Testing/Utils/Settings';

import { getFlatternProps } from '../../Collection/utils';

const renderCard = setup(Card, DEFAULT_PROPS_3_2, getFlatternProps);

describe('Consonant/Card/Wide', () => {
    test('should be able to render a banner overlay', () => {
        const {
            props: {
                bannerIcon,
                bannerFontColor,
                bannerDescription,
                bannerBackgroundColor,
            },
        } = renderCard();

        const bannerElement = screen.getByTestId('consonant-card--banner');
        const bannerIconElement = screen.getByTestId('consonant-card--banner-icon');

        expect(bannerElement).toHaveStyle({
            color: bannerFontColor,
            backgroundColor: bannerBackgroundColor,
        });
        expect(bannerElement).toHaveTextContent(bannerDescription);
        expect(bannerIconElement).toHaveAttribute('src', bannerIcon);
    });
    test('should be able to render a badge overlay', () => {
        const {
            props: { badgeText },
        } = renderCard();

        const badgeElement = screen.queryByText(badgeText);
        expect(badgeElement).not.toBeNull();
    });

    test('should be able to render a label overlay', () => {
        renderCard({
            contentArea: {
                dateDetailText: {
                    endTime: '2021-10-11T21:00:00.000Z',
                    startTime: '2021-10-11T21:00:00.000Z',
                },
            },
        });

        const labelElement = screen.queryByTestId('3-2-card--label');
        expect(labelElement).not.toBeNull();
    });

    test('should be able to render a detail text', () => {
        renderCard({
            contentArea: {
                detailText: 'detail label',
                dateDetailText: {
                    startTime: undefined,
                },
            },
        });

        const labelElement = screen.queryByText('detail label');
        expect(labelElement).not.toBeNull();
    });

    test('should be able to render a logo', () => {
        renderCard();
        const logoAltText = screen.getByAltText('logo-alt-text');
        expect(logoAltText).not.toBeNull();
    });
});
