import React from 'react';
import PropTypes from 'prop-types';

/**
 * Title of the left filters panel on the desktop breakpoint
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

export { Title };
