import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Bookmarks from '../../Consonant/Bookmarks';

import {
    COUNT_LIST,
    DEFAULT_PROPS,
} from '../constants/bookmarks';

import makeSetup from '../utils/settings';

Enzyme.configure({ adapter: new Adapter() });

const getSetup = makeSetup(Bookmarks, DEFAULT_PROPS);

describe('Consonant/Bookmarks', () => {
    test('should renders correctly different bookmarks count', () => {
        COUNT_LIST.forEach((count) => {
            const { wrapper } = getSetup({ qty: count });

            const badgeElement = wrapper.find('.bookmarks--item-badge');

            expect(badgeElement.text()).toEqual(String(count));
        });
    });

    test('should render unselectedIco', () => {
        const { props: { unselectedIco }, wrapper } = getSetup();

        const iconElement = wrapper.find('.bookmarks--ico');

        expect(iconElement).toHaveLength(1);
        expect(iconElement.get(0).props.style).toHaveProperty('backgroundImage', `url(${unselectedIco})`);
    });
    test('should render selectedIco', () => {
        const { props: { selectedIco }, wrapper } = getSetup({ selected: true });

        const iconElement = wrapper.find('.bookmarks--ico');

        expect(iconElement).toHaveLength(1);
        expect(iconElement.get(0).props.style).toHaveProperty('backgroundImage', `url(${selectedIco})`);
    });
    test('shouldn`t have style object when selected === true && selectedIco didnt exists', () => {
        const { wrapper } = getSetup({ selected: true, selectedIco: '' });

        const iconElement = wrapper.find('.bookmarks--ico');

        expect(iconElement).toHaveLength(1);
        expect(iconElement.get(0).props.style).toBeUndefined();
    });
    test('shouldn`t have style object when selected === false && unselectedIco didnt exists', () => {
        const { wrapper } = getSetup({ unselectedIco: '' });

        const iconElement = wrapper.find('.bookmarks--ico');

        expect(iconElement).toHaveLength(1);
        expect(iconElement.get(0).props.style).toBeUndefined();
    });

    describe('Check snapshots', () => {
        test('should renders correctly', () => {
            const { tree } = getSetup();

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Interaction with UI', () => {
        test('should call onChange', () => {
            const { props: { onClick }, wrapper } = getSetup();

            wrapper.find('button').simulate('click');

            expect(onClick).toBeCalled();
            onClick.mockClear();
        });
    });
});
