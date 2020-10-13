import React from 'react';
import PropTypes from 'prop-types';

function Icon({src}) {
    return (<span>Icon bit</span>);
}

Icon.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Icon;
