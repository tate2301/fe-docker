import React from 'react';
import PropTypes from 'prop-types';

function Tooltip({ text }) {
    return <span className="consonant-tooltip">{text}</span>;
}

Tooltip.propTypes = {
    text: PropTypes.string,
};

Tooltip.defaultProps = {
    text: '',
};

export default Tooltip;
