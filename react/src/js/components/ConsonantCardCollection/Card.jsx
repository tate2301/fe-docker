import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
    const {
        id, title, label, text,
    } = props;

    return (
        <div className="consonant-card" id={id}>
            <div className="consonant-card--img" />
            <div className="consonant-card--inner">
                <a href="/" className="consonant-card--label">{label}</a>
                <h2 className="consonant-card--title">
                    <a href="/">{title}</a>
                </h2>
                <p className="consonant-card--text">{text}</p>
                <div className="consonant-card--footer-wrapper">
                    <a href="/" className="consonant-card--btn">Learn more</a>
                </div>
            </div>
        </div>
    );
};

export default Card;

Card.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};
