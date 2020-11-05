import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Card from '../SquareCard';

import { DEFAULT_PROPS_1_1 } from '../../Testing/Constants/Card';

import setup from '../../Testing/Utils/Settings';

import { getFlatternProps } from '../../Collection/utils';

const renderCard = setup(Card, DEFAULT_PROPS_1_1, getFlatternProps);

describe('Consonant/Card/Square', () => {
    test('should renders banner correctly', () => {
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

    test('should renders with badge', () => {
        const {
            props: { badgeText },
        } = renderCard();

        const badgeElement = screen.queryByText(badgeText);

        expect(badgeElement).not.toBeNull();
    });

    test('should renders with label', () => {
        renderCard({
            contentArea: {
                dateDetailText: {
                    endTime: '2021-10-11T21:00:00.000Z',
                    startTime: '2021-10-11T21:00:00.000Z',
                },
            },
        });

        const labelElement = screen.queryByTestId('1-1-card--label');

        expect(labelElement).not.toBeNull();
    });

    test('should renders with detail text in label ', () => {
        renderCard({
            contentArea: {
                detailText: 'datail label',
                dateDetailText: {
                    startTime: undefined,
                },
            },
        });

        const labelElement = screen.queryByText('datail label');

        expect(labelElement).not.toBeNull();
    });

    test('If No Detail Text or startTime is authored, then card label should not appear ', () => {
        renderCard({
            contentArea: {
                detailText: undefined,
                dateDetailText: {
                    startTime: undefined,
                },
            },
        });

        const labelElement = screen.queryByTestId('1-1-card--label');

        expect(labelElement)
            .toBeNull();
    });
});
