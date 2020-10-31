import React from 'react';
import { string } from 'prop-types';

const TitleType = {
    panelHeader: string,
};

const defaultProps = {
    panelHeader: '',
};

const Title = ({
    panelHeader,
}) => (
    <h3
        className="consonant-left-filters--desk-title">
        {panelHeader}
    </h3>
);

Title.propTypes = TitleType;
Title.defaultProps = defaultProps;

/* eslint-disable-next-line import/prefer-default-export */
export { Title };
