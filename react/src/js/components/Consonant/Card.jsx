import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
    const {
        id, title, label, text, ctaLink, ctaText, image,
    } = props;

    return (
        <div className="consonant-card" id={id}>
            <div
                className="consonant-card--img"
                style={{ backgroundImage: `url(${image})` }} />
            <div className="consonant-card--inner">
                <span className="consonant-card--label">{label}</span>
                <h2 className="consonant-card--title">{title}</h2>
                <p className="consonant-card--text">{text}</p>
                <div className="consonant-card--btn-wrapper">
                    <a href={ctaLink} className="consonant-card--btn">{ctaText}</a>
                </div>
            </div>
        </div>
    );
};

export default Card;

Card.propTypes = {
    id: PropTypes.string.isRequired,
    ctaLink: PropTypes.string.isRequired,
    ctaText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};
