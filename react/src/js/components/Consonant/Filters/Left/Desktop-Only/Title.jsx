import React from 'react';
import PropTypes from 'prop-types';

/**
 * Title for the left filter panel for the desktop breakpoint
 *
 * @component
 * @example
 * const props= {
    panelHeader: String,
 * }
 * return (
 *   <Title {...props}/>
 * )
 */
const Title = (props) => {
    const {
        panelHeader,
    } = props;

    return (
        <h3
            className="consonant-left-filters--desk-title">
            {panelHeader}
        </h3>
    );
};

Title.propTypes = {
    panelHeader: PropTypes.string,
};

Title.defaultProps = {
    panelHeader: '',
};

/* eslint-disable-next-line import/prefer-default-export */
export { Title };
