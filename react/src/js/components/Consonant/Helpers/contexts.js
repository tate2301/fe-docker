import React from 'react';

export const noOp = () => {};

export const ExpandableContext = React.createContext({ value: null, setValue: noOp });
export const ConfigContext = React.createContext({});
