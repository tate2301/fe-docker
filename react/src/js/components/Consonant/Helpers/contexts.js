import React from 'react';

/**
 * A funtion-placeholder, does nothing
 * @returns {undefined} - returns undefined
 */
export const noOp = () => {};

/**
 * Creates context for expandable components
 * @param {Object} - default value
 * @returns {Object} - ExpandableContext context object
 */
export const ExpandableContext = React.createContext({ value: null, setValue: noOp });

/**
 * Creates configuration context
 * @param {Object} - default value
 * @returns {Object} - ConfigContext context object
 */
export const ConfigContext = React.createContext({});
