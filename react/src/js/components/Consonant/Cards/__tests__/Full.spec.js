import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Card from '../Full';

import { DEFAULT_PROPS_FULL } from '../../Helpers/Testing/Constants/Card';

import makeSetup from '../../Helpers/Testing/Utils/Settings';

const setup = makeSetup(Card, DEFAULT_PROPS_FULL);

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
});
