import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Search from '../../Consonant/Search';

import { DEFAULT_PROPS } from '../constants/search';

import makeSetup from '../utils/settings';

Enzyme.configure({ adapter: new Adapter() });

const getSetup = makeSetup(Search, DEFAULT_PROPS);

describe('Consonant/Search', () => {
    describe('Check snapshots', () => {
        test('should renders correctly', () => {
            const { tree } = getSetup();

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Interaction with UI', () => {
        test('should call onBlur', () => {
            const { props: { onBlur }, wrapper } = getSetup();

            const inputElement = wrapper.find('input');

            inputElement.simulate('focus');
            inputElement.simulate('blur');

            expect(onBlur).toBeCalled();
        });
        test('should call onSearch', () => {
            const { props: { onSearch }, wrapper } = getSetup();

            wrapper.find('input').simulate('change', { target: { value: 'Search string' } });

            expect(onSearch).toBeCalled();
            expect(onSearch).toBeCalledWith('Search string');
            onSearch.mockClear();
        });
        test('should clear search value', () => {
            const { props: { onSearch }, wrapper } = getSetup();

            wrapper.find('.consonant-search--input-clear').simulate('click');

            expect(onSearch).toBeCalled();
            expect(onSearch).toBeCalledWith('');
            onSearch.mockClear();
        });
    });
});
