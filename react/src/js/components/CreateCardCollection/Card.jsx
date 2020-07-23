/* eslint-disable jsx-a11y/anchor-has-content,react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';

/** Class representing the UI for the Spectrum Accordion. */
export default class Card extends React.Component {
    render() {
        return (
            <div className="create-card-collection__create-card">
                <div
                    className="create-card-collection__create-card-img"
                    style={{ backgroundSize: 'cover', backgroundImage: `url(${this.props.backgroundImage})` }}>
                    <a
                        className="create-card-collection__create-card-hero"
                        href={this.props.url} />
                </div>
                <div className="create-card-collection__create-card-info">
                    <div className="create-card-collection__create-card-tag-label">
                        {this.props.categories.split(' / ').map(category => (
                            <a key={category} href={this.props.url}>{category}</a>
                        ))}
                    </div>
                    <h2 className="create-card-collection__create-card-title">
                        <a href={this.props.url}>
                            {this.props.title}
                        </a>
                    </h2>
                </div>
            </div>
        );
    }
}


Card.propTypes = {
    title: PropTypes.string,
    categories: PropTypes.string,
    backgroundImage: PropTypes.string,
    url: PropTypes.string,
};

Card.defaultProps = {
    title: '',
    backgroundImage: '',
    categories: '',
    url: '',
};
