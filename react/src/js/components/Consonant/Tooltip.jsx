import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = (props) => {
    const { text } = props;

    return (
        <span className="consonant-tooltip">{text}</span>
    );
};

export default Tooltip;

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
};
