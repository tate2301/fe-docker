import React from 'react';
import classNames from 'classnames';
import { string, bool } from 'prop-types';

import { LOADER_SIZE } from '../Helpers/constants';

const TLoader = {
    size: string,
    hidden: bool,
    absolute: bool,
};

const defaultProps = {
    hidden: false,
    absolute: false,
    size: LOADER_SIZE.BIG,
};

/**
 * Loading Spinner (Used when waiting for API call)
 *
 * @component
 * @example
 * const props= {
    size: String,
    hidden: Boolean,
    absolute: Boolean,
 * }
 * return (
 *   <Loader {...props}/>
 * )
 */
const Loader = ({ size, hidden, absolute }) => {
    const className = classNames({
        'consonant-loader_medium': size === LOADER_SIZE.MEDIUM,
        'consonant-loader_big': size === LOADER_SIZE.BIG,
        'consonant-loader': true,
        'consonant-loader_absolute': absolute,
    });

    return !hidden && (
        <div
            data-testid="consonant-loader"
            className={className}>
            <div />
            <div />
            <div />
            <div />
        </div>
    );
};

Loader.propTypes = TLoader;
Loader.defaultProps = defaultProps;

export default Loader;

