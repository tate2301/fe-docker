import React from 'react';
import PropTypes from 'prop-types';

function Text({ text }) {
    return <p className="consonant-text-infobit">{text}</p>;
}

Text.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Text;
