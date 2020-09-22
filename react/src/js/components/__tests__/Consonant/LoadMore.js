import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LoadMore from '../../Consonant/LoadMore';

import { DEFAULT_PROPS } from '../constants/loadMore';

import makeSetup from '../utils/settings';

Enzyme.configure({ adapter: new Adapter() });

const getSetup = makeSetup(LoadMore, DEFAULT_PROPS);

describe('Consonant/LoadMore', () => {
    describe('Check snapshots', () => {
        test('should renders correctly with show < total', () => {
            const { tree } = getSetup();

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly with show > total', () => {
            const { tree } = getSetup({ show: 100, total: 1 });

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Interaction with UI', () => {
        test('should call onClick', () => {
            const { props: { onClick }, wrapper } = getSetup();

            wrapper.find('.consonant-load-more--btn').simulate('click');

            expect(onClick).toBeCalled();
        });
    });
});
