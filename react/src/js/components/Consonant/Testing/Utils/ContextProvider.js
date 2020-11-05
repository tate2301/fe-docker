import merge from 'lodash/merge';
import React, {
    useMemo,
    useState,
    useCallback,
} from 'react';
import {
    node,
    shape,
} from 'prop-types';

import { ConfigType } from '../../types/config';
import { DEFAULT_CONFIG } from '../../Helpers/constants';
import {
    ConfigContext,
    ExpandableContext,
} from '../../Helpers/contexts';

const ContextProvider = ({ context, children }) => {
    const [isOpen, toggle] = useState(null);


    const fullConfig = merge(DEFAULT_CONFIG, context);

    const handleChangeVisibility = useCallback(
        (value) => {
            toggle(value);
        },
        [toggle],
    );

    const expandableContext = useMemo(
        () => ({
            value: isOpen,
            setValue: handleChangeVisibility,
        }),
        [isOpen, handleChangeVisibility],
    );

    return (
        <ExpandableContext.Provider value={expandableContext}>
            <ConfigContext.Provider value={fullConfig}>
                {children}
            </ConfigContext.Provider>
        </ExpandableContext.Provider>
    );
};

ContextProvider.propTypes = {
    context: shape(ConfigType),
    children: node.isRequired,
};

ContextProvider.defaultProps = {
    context: {},
};

export default ContextProvider;
