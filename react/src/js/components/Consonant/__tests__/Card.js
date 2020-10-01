import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Card from '../Card';

import {
    CARD_STYLE,
    DEFAULT_PROPS,
    PROPS_WITHOUT_BANNER,
} from './constants/card';

import makeSetup from './utils/settings';

const setup = makeSetup(Card, DEFAULT_PROPS);

describe('Consonant/Card', () => {
    test('should renders banner correctly', () => {
        const {
            props: {
                bannerIcon,
                bannerFontColor,
                bannerDescription,
                bannerBackgroundColor,
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
    test('shouldn`t render banner if some of banner prop dont exists', () => {
        PROPS_WITHOUT_BANNER.forEach((propsWithoutBanner) => {
            const { wrapper } = setup(propsWithoutBanner);

            const bannerElement = screen.queryByTestId('consonant-card--banner');

            expect(bannerElement).toBeNull();
            wrapper.unmount();
        });
    });
    test('should renders without banner icon', () => {
        setup({ bannerIcon: '' });

        const bannerIconElement = screen.queryByTestId('consonant-card--banner-icon');

        expect(bannerIconElement).toBeNull();
    });
    test('should renders without video icon', () => {
        setup({ videoURL: '' });

        const videoIconElement = screen.queryByTestId('consonant-card--video-ico');

        expect(videoIconElement).toBeNull();
    });
    test('should renders without label', () => {
        setup({ label: '' });

        const cardLabelElement = screen.queryByTestId('consonant-card--label');

        expect(cardLabelElement).toBeNull();
    });
    test('shouldn`t have backgroundImage', () => {
        setup();

        const iconElement = screen.getByTestId('bookmarks--ico');
        expect(iconElement).toHaveStyle({ backgroundImage: '' });
    });


    test('should render unselectedIco', () => {
        const { props: { cardUnsavedIco } } = setup({ allowBookmarking: true });

        const iconElement = screen.getByTestId('bookmarks--ico');

        expect(iconElement).toHaveStyle({ backgroundImage: `url(${cardUnsavedIco})` });
    });
    test('should render selectedIco', () => {
        const { props: { cardSavedIco } } = setup({ allowBookmarking: true, isBookmarked: true });

        const iconElement = screen.getByTestId('bookmarks--ico');

        expect(iconElement).toHaveStyle({ backgroundImage: `url${cardSavedIco}` });
    });

    test('shouldn`t render cardSavedIco', () => {
        setup({ allowBookmarking: true, isBookmarked: true, cardSavedIco: '' });

        const iconElement = screen.getByTestId('bookmarks--ico');

        expect(iconElement).not.toHaveStyle({ backgroundImage: "url('')" });
    });
    test('shouldn`t render cardUnsavedIco', () => {
        setup({ allowBookmarking: true, cardUnsavedIco: '' });

        const iconElement = screen.getByTestId('bookmarks--ico');

        expect(iconElement).not.toHaveStyle({ backgroundImage: "url('')" });
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
        test('should renders correctly with different card style', () => {
            CARD_STYLE.forEach((style) => {
                const { tree } = setup({ cardStyle: style });

                expect(tree).toMatchSnapshot();
            });
        });
    });

    describe('Interaction with UI', () => {
        test('should call onClick', () => {
            const { props: { onClick } } = setup({ allowBookmarking: true, cardStyle: '3:2' });

            const bookmarkButtonElement = screen.getByTestId('consonant-card__bookmark-button');

            fireEvent.click(bookmarkButtonElement);

            expect(onClick).toBeCalled();
        });
    });
});
