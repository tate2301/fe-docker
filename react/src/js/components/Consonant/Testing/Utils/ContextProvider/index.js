import { shape, node } from 'prop-types';
import React, { useState, useCallback, useMemo } from 'react';
import { ConfigContext, ExpandableContext } from '../../../../../utils/contexts';

import { contextPropTypes } from './types';

const ContextProvider = ({ context, children }) => {
    const [isOpen, toggle] = useState(null);

    const handleChangeVisibility = useCallback((value) => {
        toggle(value);
    }, [toggle]);

    const expandableContext = useMemo(() => ({
        value: isOpen,
        setValue: handleChangeVisibility,
    }), [isOpen, handleChangeVisibility]);


    return (
        <ExpandableContext.Provider value={expandableContext}>
            <ConfigContext.Provider value={context}>
                {children}
            </ConfigContext.Provider>
        </ExpandableContext.Provider>
    );
};

ContextProvider.propTypes = {
    children: node.isRequired,
    context: shape(contextPropTypes),
};

ContextProvider.defaultProps = {
    context: {},
};

export default ContextProvider;
