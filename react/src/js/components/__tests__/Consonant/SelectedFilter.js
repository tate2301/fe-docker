import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SelectedFilter from '../../Consonant/SelectedFilter';

import { DEFAULT_PROPS } from '../constants/selectedFilter';

import makeSetup from '../utils/settings';

Enzyme.configure({ adapter: new Adapter() });

const getSetup = makeSetup(SelectedFilter, DEFAULT_PROPS);

describe('Consonant/SelectedFilter', () => {
    describe('Check snapshots', () => {
        test('should renders correctly', () => {
            const { tree } = getSetup();

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Interaction with UI', () => {
        test('should call onOpen', () => {
            const { props: { onClick, id, parentId }, wrapper } = getSetup();

            const selectedFilterElement = wrapper.find('.consonant-filters--selected-filter');

            selectedFilterElement.simulate('click');

            expect(onClick).toBeCalled();
            expect(onClick).toHaveBeenCalledWith(parentId, id, false);
        });
    });
});
