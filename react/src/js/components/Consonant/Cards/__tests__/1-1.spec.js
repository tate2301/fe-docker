import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Card from '../1-1';

import { DEFAULT_PROPS_1_1 } from '../../Helpers/Testing/Constants/Card';

import makeSetup from '../../Helpers/Testing/Utils/Settings';

const setup = makeSetup(Card, DEFAULT_PROPS_1_1);

describe('Consonant/Card', () => {
    test('should renders banner correctly', () => {
        const {
            props: {
                overlays: {
                    banner: {
                        description: bannerDescription,
                        fontColor: bannerFontColor,
                        backgroundColor: bannerBackgroundColor,
                        icon: bannerIcon,
                    },
                },
            },
        } = setup();

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
        setup({ badgeText: 'some badge text' });

        const badgeElement = screen.queryByText('some badge text');

        expect(badgeElement).not.toBeNull();
    });

    test('should renders with label', () => {
        setup({
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
        setup({
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
});
