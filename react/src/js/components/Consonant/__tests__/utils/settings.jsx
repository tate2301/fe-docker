import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

export default (Component, defaultProps) => (passedProps) => {
    const props = {
        ...defaultProps,
        ...passedProps,
    };

    const wrapper = render(<Component {...props} />);
    const tree = renderer
        .create(<Component {...props} />)
        .toJSON();

    return {
        tree,
        props,
        wrapper,
    };
};
