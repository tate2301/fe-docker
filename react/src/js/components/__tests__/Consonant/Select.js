import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Select from '../../Consonant/Select';

import { DEFAULT_PROPS } from '../constants/select';

import makeSetup from '../utils/settings';

Enzyme.configure({ adapter: new Adapter() });

const getSetup = makeSetup(Select, DEFAULT_PROPS);

describe('Consonant/Select', () => {
    test('should render right options count', () => {
        const { props: { values }, wrapper } = getSetup();

        const optionElements = wrapper.find('.consonant-select--option');

        expect(optionElements).toHaveLength(values.length);
    });

    describe('Check snapshots', () => {
        test('should renders correctly', () => {
            const { tree } = getSetup();

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly with autoWidth', () => {
            const { tree } = getSetup({ autoWidth: true });

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly opened select', () => {
            const { tree } = getSetup({ opened: true });

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly with selected option', () => {
            const { tree } = getSetup({ val: { label: 'label 1' } });

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Interaction with UI', () => {
        test('should call onOpen', () => {
            const { props: { onOpen }, wrapper } = getSetup();

            const selectButtonElement = wrapper.find('.consonant-select--btn');

            selectButtonElement.simulate('click');

            expect(onOpen).toHaveBeenCalledTimes(1);

            selectButtonElement.simulate('blur');

            expect(onOpen).toHaveBeenCalledTimes(2);
        });
        test('should call onSelect', () => {
            const { props: { onSelect }, wrapper } = getSetup();

            wrapper.find('.consonant-select--option').first().simulate('click');

            expect(onSelect).toBeCalled();
        });
    });
});
