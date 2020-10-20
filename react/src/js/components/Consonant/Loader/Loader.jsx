import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { LOADER_SIZE } from '../../../utils/constants';

const Loader = ({ size, hidden, absolute }) => {
    let sizeClass;

    if (size === LOADER_SIZE.MEDIUM) {
        sizeClass = 'consonant-loader_medium';
    } else if (size === LOADER_SIZE.BIG) {
        sizeClass = 'consonant-loader_big';
    } else {
        sizeClass = size;
    }

    const className = classNames('consonant-loader', sizeClass, { 'consonant-loader_absolute': absolute });

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

export default Loader;

Loader.propTypes = {
    size: PropTypes.string,
    hidden: PropTypes.bool,
    absolute: PropTypes.bool,
};

Loader.defaultProps = {
    size: '',
    hidden: false,
    absolute: false,
};
