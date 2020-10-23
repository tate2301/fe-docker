import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import mockconfig from '../Mocks/config.json';
import setupIntersectionObserverMock from '../Mocks/intersectionObserver';

setupIntersectionObserverMock();

import ContextProvider from './ContextProvider';

export const createTree = component => renderer
    .create(component)
    .toJSON();

export default (Component, defaultProps) => (passedProps, passedConfig) => {
    const props = {
        ...defaultProps,
        ...passedProps,
    };
    const config = {
        ...mockconfig,
        ...passedConfig,
    };

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
