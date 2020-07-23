import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import 'isomorphic-fetch';
import Search from '../Search';
import DAO from '../DAO';
import Card from '../Card';

Enzyme.configure({ adapter: new Adapter() });

describe('the CreateSearch/Search component', () => {
    const defaultProps = {
        loadMoreText: 'Load more',
        searchResultsHeader: 'Results',
        resultsPerPage: 3,
        sortBy: 'name',
        pageName: 'thePage',
    };

    const dummyCards = [
        {
            url: 'https://example.com',
            cardTitle: 'Sample',
            background: 'https://placehold.it/150x150',
            tags: ['tag1', 'tag2'],
        },
        {
            url: 'https://example.com/2',
            cardTitle: 'Sample 2',
            background: 'https://placehold.it/150x150',
            tags: ['tag1'],
        },
        {
            url: 'https://example.com/3',
            cardTitle: 'Sample 3',
            background: 'https://placehold.it/150x150',
            tags: ['tag1', 'tag2', 'tag3'],
        },
    ];

    const dummyCategories = [
        'tag 1 / tag 2',
        'tag 1',
        'tag 1 / tag 2 / tag 3',
    ];

    let stub;

    beforeEach(() => {
        stub = sinon.stub(DAO, 'getJsonData');
        stub.callsFake(() => new Promise((resolve) => {
            resolve({
                tags: {
                    create: {
                        tags: [{
                            tags: [
                                { id: 'tag1', title: 'tag 1' },
                                { id: 'tag2', title: 'tag 2' },
                                { id: 'tag3', title: 'tag 3' },
                                { id: 'tag4', title: 'tag 4' },
                                { id: 'tag5', title: 'tag 5' },
                                { id: 'tag6', title: 'tag 6' },
                            ],
                        }],
                    },
                },
                cards: dummyCards,
            });
        }));
    });

    afterEach(() => {
        stub.restore();
    });

    describe('mount behavior', () => {
        it('sets cards and flatTags state', () => {
            const props = {
                ...defaultProps,
            };

            const wrapper = shallow(<Search {...props} />);

            wrapper.update();
        });

        it('correctly sends parameters to the DAO class', () => {

        });
    });

    describe('the load more button', () => {
        it('calls the DAO.getJsonData function with appropriate parameters, and changes the cards being rendered', () => {

        });

        it('displays the loadMoreText prop as the button text', () => {

        });
    });

    describe('the cards list', () => {
        it('displays correct card length, depending on the return value of the DAO.getJsonData function', async () => {
            const props = {
                ...defaultProps,
            };

            const wrapper = await shallow(<Search {...props} />);

            expect(wrapper.find(Card)).toHaveLength(3);
        });

        it('displays each card with the appropriate props', async () => {
            const props = {
                ...defaultProps,
            };

            const wrapper = await shallow(<Search {...props} />);

            wrapper.find(Card).forEach((card, i) => {
                const suppliedCard = dummyCards[i];
                const targetCategories = dummyCategories[i];
                expect(card.props()).toMatchObject({
                    url: suppliedCard.url,
                    title: suppliedCard.cardTitle,
                    backgroundImage: suppliedCard.background,
                    categories: targetCategories,
                });
            });
        });
    });
});
