import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';


export default (Component, defaultProps) => (passedProps) => {
    const props = {
        ...defaultProps,
        ...passedProps,
    };

    const wrapper = shallow(<Component {...props} />);
    const tree = renderer
        .create(<Component {...props} />)
        .toJSON();

    return {
        tree,
        props,
        wrapper,
    };
};
