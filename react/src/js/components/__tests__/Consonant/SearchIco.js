import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SearchIco from '../../Consonant/SearchIco';

import makeSetup from '../utils/settings';

Enzyme.configure({ adapter: new Adapter() });

const getSetup = makeSetup(SearchIco, {
    onClick: jest.fn(),
});

describe('Consonant/SearchIco', () => {
    describe('Check snapshots', () => {
        test('should renders correctly', () => {
            const { tree } = getSetup();

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Interaction with UI', () => {
        test('should call onClick', () => {
            const { props: { onClick }, wrapper } = getSetup();

            const inputElement = wrapper.find('.search-ico');

            inputElement.simulate('click');

            expect(onClick).toBeCalled();
        });
    });
});
