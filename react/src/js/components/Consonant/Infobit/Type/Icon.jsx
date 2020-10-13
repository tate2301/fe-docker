import React from 'react';
import PropTypes from 'prop-types';

function Icon({ src, alt }) {
    return (<img
        className="consonant-icon-infobit"
        width="28"
        src={src}
        alt={alt}
        loading="lazy" />);
}

Icon.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
};

Icon.defaultProps = {
    alt: '',
};

export default Icon;
