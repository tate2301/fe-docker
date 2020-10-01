import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

export const createTree = component => renderer
    .create(component)
    .toJSON();

export default (Component, defaultProps) => (passedProps) => {
    const props = {
        ...defaultProps,
        ...passedProps,
    };

    const wrapper = render(<Component {...props} />);
    const tree = createTree(<Component {...props} />);

    return {
        tree,
        props,
        wrapper,
    };
};
