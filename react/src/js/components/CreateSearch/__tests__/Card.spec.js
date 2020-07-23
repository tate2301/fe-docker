import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import 'isomorphic-fetch';
import Card from '../Card';

Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
    title: 'The Title',
    backgroundImage: 'https://placehold.it/150x150',
    categories: 'Some categories',
    url: 'https://www.example.com',
};

describe('the CreateSearch card component', () => {
    describe('the card image', () => {
        it('shows the backgroundImage prop as a background-image css property', () => {
            const wrapper = shallow(<Card {...defaultProps} />);
            const image = wrapper.find('.create-card-collection__create-card-img');

            expect(image).toHaveLength(1);

            expect(image.get(0).props.style).toHaveProperty('backgroundImage', `url(${defaultProps.backgroundImage})`);
        });

        it('displays a link with the url prop as href', () => {
            const wrapper = shallow(<Card {...defaultProps} />);
            expect(wrapper.find(`a[href="${defaultProps.url}"]`).length).toBeTruthy();
        });

        it('displays the categories prop', () => {
            const wrapper = shallow(<Card {...defaultProps} />);
            expect(wrapper.find(`[children="${defaultProps.categories}"]`)).toHaveLength(1);
        });

        it('shows the card title', () => {
            const wrapper = shallow(<Card {...defaultProps} />);
            expect(wrapper.find(`[children="${defaultProps.title}"]`)).toHaveLength(1);
        });
    });
});
