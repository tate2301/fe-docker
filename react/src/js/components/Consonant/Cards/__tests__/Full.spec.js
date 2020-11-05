import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Card from '../FullCard';

import { DEFAULT_PROPS_FULL } from '../../Testing/Constants/Card';

import setup from '../../Testing/Utils/Settings';

import { getFlatternProps } from '../../Collection/utils';

const renderCard = setup(Card, DEFAULT_PROPS_FULL, getFlatternProps);

describe('Consonant/Card/FullCard', () => {
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
    test('should be able to render a logo overlay', () => {
        renderCard();
        const logoAltText = screen.getByAltText('logo-alt-text');
        expect(logoAltText).not.toBeNull();
    });
});
