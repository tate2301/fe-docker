import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

export const createTree = component => renderer
    .create(component)
    .toJSON();

export default (Component, defaultConfig) => (props) => {
    let config = defaultConfig;

    if (props) {
        const propsKeys = Object.keys(props);

        config = propsKeys.reduce((accumulator, key) => {
            if (key === 'featuredCards') {
                accumulator[key] = props[key];
            } else {
                accumulator[key] = {
                    ...defaultConfig[key],
                    ...props[key],
                };
            }

            return accumulator;
        }, { ...defaultConfig });
    }

    const wrapper = render(<Component config={config} />);
    const tree = createTree(<Component config={config} />);

    return {
        tree,
        config,
        wrapper,
    };
};
