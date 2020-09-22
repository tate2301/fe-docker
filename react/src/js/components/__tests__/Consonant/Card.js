import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Card from '../../Consonant/Card';

import {
    CARD_STYLE,
    DEFAULT_PROPS,
    PROPS_WITHOUT_BANNER,
} from '../constants/card';

import makeSetup from '../utils/settings';

Enzyme.configure({ adapter: new Adapter() });

const getSetup = makeSetup(Card, DEFAULT_PROPS);

describe('Consonant/Card', () => {
    test('should renders banner correctly', () => {
        const {
            props,
            wrapper,
        } = getSetup();

        const bannerElement = wrapper.find('.consonant-card--banner');
        const bannerIconElement = wrapper.find('.consonant-card--banner-icon');

        expect(bannerElement).toHaveLength(1);
        expect(bannerElement.get(0).props.style).toHaveProperty('color', props.bannerFontColor);
        expect(bannerElement.get(0).props.style).toHaveProperty('backgroundColor', props.bannerBackgroundColor);

        expect(bannerElement.text()).toEqual(props.bannerDescription);

        expect(bannerIconElement.get(0).props.src).toEqual(props.bannerIcon);
    });
    test('shouldn`t render banner if some of banner prop dont exists', () => {
        PROPS_WITHOUT_BANNER.forEach((propsWithoutBanner) => {
            const { wrapper } = getSetup(propsWithoutBanner);

            const bannerElement = wrapper.find('.consonant-card--banner');

            expect(bannerElement).toHaveLength(0);
        });
    });
    test('should renders without banner icon', () => {
        const { wrapper } = getSetup({ bannerIcon: '' });

        const bannerIconElement = wrapper.find('.consonant-card--banner-icon');

        expect(bannerIconElement).toHaveLength(0);
    });
    test('should renders without video icon', () => {
        const { wrapper } = getSetup({ videoURL: '' });

        const videoIconElement = wrapper.find('.consonant-card--video-ico');

        expect(videoIconElement).toHaveLength(0);
    });
    test('should renders without label', () => {
        const { wrapper } = getSetup({ label: '' });

        const cardLabelElement = wrapper.find('.consonant-card--label');

        expect(cardLabelElement).toHaveLength(0);
    });

    describe('Check snapshots', () => {
        test('should renders with bookmarking', () => {
            const { tree } = getSetup({
                isBookmarked: true,
                allowBookmarking: true,
                disableBookmarkIco: true,
            });

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly with different card style', () => {
            CARD_STYLE.forEach((style) => {
                const { tree } = getSetup({ cardStyle: style });

                expect(tree).toMatchSnapshot();
            });
        });
    });

    describe('Interaction with UI', () => {
        test('should call onClick', () => {
            const { props: { onClick }, wrapper } = getSetup({ allowBookmarking: true, cardStyle: '3:2' });

            wrapper.find('button').simulate('click', { stopPropagation: () => {} });

            expect(onClick).toBeCalled();
        });
    });
});
