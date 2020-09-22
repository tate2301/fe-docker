import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Pagination from '../../Consonant/Pagination';

import { PAGE_LIST, DEFAULT_PROPS } from '../constants/pagination';

import makeSetup from '../utils/settings';
import { getItemsRange, createEvent } from '../utils/pagination';

Enzyme.configure({ adapter: new Adapter() });

const getSetup = makeSetup(Pagination, DEFAULT_PROPS);

describe('Consonant/Pagination', () => {
    test('should render different items range', () => {
        PAGE_LIST.forEach((page) => {
            const { props: { showItemsPerPage }, wrapper } = getSetup({ currentPageNumber: page });

            const itemRange = getItemsRange({ page, itemsPerPage: showItemsPerPage });

            expect(wrapper.find('strong').text()).toEqual(itemRange);
        });
    });

    describe('Check snapshots', () => {
        test('should renders correctly when closed', () => {
            const { tree } = getSetup();

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Interaction with UI', () => {
        test('should call onClick', () => {
            const { props: { onClick }, wrapper } = getSetup();

            const prevButton = wrapper.find('.consonant-pagination--btn_prev');
            const nextButton = wrapper.find('.consonant-pagination--btn_next');
            const pageButton = wrapper.find('.consonant-pagination--item-btn').first();

            nextButton.simulate('click', createEvent(nextButton));

            expect(onClick).toHaveBeenCalledWith(2);

            prevButton.simulate('click', createEvent(prevButton));

            expect(onClick).toHaveBeenCalledWith(1);

            pageButton.simulate('click', createEvent(pageButton, 5));

            expect(onClick).toHaveBeenCalledWith(5);
        });
    });
});
