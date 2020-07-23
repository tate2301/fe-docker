import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import 'isomorphic-fetch';
import Personalize from '../Personalize';

Enzyme.configure({ adapter: new Adapter() });

describe('the Personalize component', () => {
    const defaultProps = {
        saveText: 'Save Text',
        clearText: 'Clear Text',
        personalizedSubheading: 'Subheading',
        personalizeButtonText: 'Button Text',
        personalizedHeading: 'Heading',
        unpersonalizedTitle: 'Unpersonalized Title',
        tagGroups: [],
    };

    describe('the wrapper class', () => {
        it('uses the "personalize personalize__wrapper" class if menuOpened and tagsSelected are false, which is the default behavior', () => {
            const props = {
                ...defaultProps,
            };

            const wrapper = shallow(<Personalize {...props} />);
            expect(wrapper.find('.personalize__wrapper')).toHaveLength(1);
            expect(wrapper.find('.personalize__wrapper_opened')).toHaveLength(0);
            expect(wrapper.find('.personalize__wrapper_changes_saved')).toHaveLength(0);
        });
    });

    describe('the personalize button', () => {
        it('changes the wrapper class when clicked', () => {
            const props = {
                ...defaultProps,
            };

            const wrapper = shallow(<Personalize {...props} />);
            const button = wrapper.find('.personalize__button');
            button.simulate('click', {
                preventDefault: () => {
                },
            });
            expect(wrapper.find('.personalize__wrapper_opened')).toHaveLength(1);
        });
    });

    describe('the tags', () => {
        it('properly displays the tag elements when fed tag groups via props during initialization', () => {
            const tagGroups = [
                [{ id: 'tag1', title: 'tag 1' }, { id: 'tag2', title: 'tag 2' }, { id: 'tag3', title: 'tag 3' }],
                [{ id: 'tag4', title: 'tag 4' }, { id: 'tag5', title: 'tag 5' }, { id: 'tag6', title: 'tag 6' }],
                [{ id: 'tag7', title: 'tag 7' }, { id: 'tag8', title: 'tag 8' }, { id: 'tag9', title: 'tag 9' }],
            ];
            const props = {
                ...defaultProps,
                tagGroups,
            };

            const wrapper = shallow(<Personalize {...props} />);
            expect(wrapper.find('.personalize__tag-list-group')).toHaveLength(3);
            expect(wrapper.find('.personalize__tag-list-group')).toHaveLength(3);

            const tags = tagGroups[0].concat(tagGroups[1]).concat(tagGroups[2]);

            tags.forEach((tag) => {
                const theTag = wrapper.find(`input#${tag.id}`);
                expect(theTag).toHaveLength(1);
                expect(theTag.props().checked).toBe(false);
            });
        });

        it('displays tags as checked when the checkbox elements receive the change event', () => {
            const tagGroups = [
                [{ id: 'tag1', title: 'tag 1' }, { id: 'tag2', title: 'tag 2' }, { id: 'tag3', title: 'tag 3' }],
                [{ id: 'tag4', title: 'tag 4' }, { id: 'tag5', title: 'tag 5' }, { id: 'tag6', title: 'tag 6' }],
                [{ id: 'tag7', title: 'tag 7' }, { id: 'tag8', title: 'tag 8' }, { id: 'tag9', title: 'tag 9' }],
            ];
            const props = {
                ...defaultProps,
                tagGroups,
            };

            const wrapper = shallow(<Personalize {...props} />);
            const tag1 = wrapper.find('input#tag1');
            const tag9 = wrapper.find('input#tag9');

            tag1.simulate('change', { target: { value: true } });
            tag9.simulate('change', { target: { value: true } });

            wrapper.update();

            expect(wrapper.find('input#tag1').props().checked).toBe(true);
            expect(wrapper.find('input#tag9').props().checked).toBe(true);
        });
    });

    describe('the save button', () => {
        it('closes the menu when clicked', () => {
            const props = {
                ...defaultProps,
            };

            const wrapper = shallow(<Personalize {...props} />);

            const personalizeButton = wrapper.find('.personalize__button');
            personalizeButton.simulate('click', { preventDefault: () => {} });

            wrapper.update();
            expect(wrapper.find('.personalize__wrapper_opened')).toHaveLength(1);


            const saveButton = wrapper.find('.personalize__tag-list-apply-btn');
            saveButton.simulate('click', { preventDefault: () => {} });

            wrapper.update();
            expect(wrapper.find('.personalize__wrapper_opened')).toHaveLength(0);
        });

        it('changes the title when clicked', () => {

        });

        it('adds the personalize__wrapper_changes_saved class to the wrapper when clicked', () => {

        });

        it('does not add the personalize__wrapper_changes_saved class if there were no tags saved', () => {

        });

        it('dispatches the tagSelectionSavedAction when saved', () => {

        });
    });

    describe('the clear button', () => {
        it('clears all the tags when clicked', () => {

        });
    });
});
