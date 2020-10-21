import React from 'react';
import renderer from 'react-test-renderer';
import { act, render } from '@testing-library/react';
import setupIntersectionObserverMock from '../Mocks/intersectionObserver';
import Container from '../../../Container/Container';

setupIntersectionObserverMock();


// export const createTree = component => renderer
//     .create(component)
//     .toJSON();

export default (Component, defaultConfig) => async (props) => {
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

    const wrapper = await act(async () => render(<Component config={config} />));
    // const tree = createTree(<Component config={config} />);

    return {
        // tree,
        config,
        wrapper,
    };
};
