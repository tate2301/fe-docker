import renderer from 'react-test-renderer';
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Card, { Tooltip } from '../3-2';

import { DEFAULT_PROPS_3_2 } from '../../Helpers/Testing/Constants/Card';

import makeSetup from '../../Helpers/Testing/Utils/Settings';

const setup = makeSetup(Card, DEFAULT_PROPS_3_2);

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
        const {
            props: {
                overlays: {
                    label: {
                        description: someBadgeText,
                    },
                },
            },
        } = setup();

        const badgeElement = screen.queryByText(someBadgeText);

        expect(badgeElement).not.toBeNull();
    });

    describe('Check snapshots', () => {
        test('should renders with bookmarking', () => {
            const { tree } = setup({
                isBookmarked: true,
                allowBookmarking: true,
                disableBookmarkIco: true,
            });

            expect(tree).toMatchSnapshot();
        });
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

        const labelElement = screen.queryByTestId('3-2-card--label');

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

    describe('Consonant/Tooltip', () => {
        describe('Check snapshots', () => {
            test('should renders correctly', () => {
                const tree = renderer
                    .create(<Tooltip text="Tooltip text" />)
                    .toJSON();

                expect(tree).toMatchSnapshot();
            });
        });
    });
});
