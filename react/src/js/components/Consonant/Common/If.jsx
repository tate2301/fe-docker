import React, { memo, Fragment } from 'react';
import { bool, node } from 'prop-types';

const TIf = {
    condition: bool,
    children: node.isRequired,
};

const defaultProps = {
    condition: false,
};

const If = ({ condition, children }) => (
    <Fragment>
        {!condition ? null : children}
    </Fragment>
);

If.propTypes = TIf;
If.defaultProps = defaultProps;

export default memo(If);
