import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import setupIntersectionObserverMock from '../Mocks/intersectionObserver';
import ContextProvider from './ContextProvider';
import mockconfig from '../Mocks/config.json';

setupIntersectionObserverMock();

export const createTree = component => renderer
    .create(component)
    .toJSON();

export default (Component, defaultProps, propsCast) => (passedProps, passedConfig) => {
    let props = {
        ...defaultProps,
        ...passedProps,
    };
    const config = {
        ...mockconfig,
        ...passedConfig,
    };

    if (propsCast) {
        props = propsCast(props);
    }

    const WrapperComponent = () => (
        <ContextProvider context={config}>
            <Component {...props} />
        </ContextProvider>
    );

    const wrapper = render(<WrapperComponent />);
    const tree = createTree(<WrapperComponent />);

    return {
        tree,
        props,
        config,
        wrapper,
    };
};
