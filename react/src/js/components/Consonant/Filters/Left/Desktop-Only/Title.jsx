import PropTypes from 'prop-types';
import React from 'react';

const Title = ({
    panelHeader,
}) => (
    <h3
        className="consonant-left-filters--desk-title">
        {panelHeader}
    </h3>
);

/* eslint-disable-next-line import/prefer-default-export */
export { Title };

Title.propTypes = {
    panelHeader: PropTypes.string,
};

Title.defaultProps = {
    panelHeader: '',
};
