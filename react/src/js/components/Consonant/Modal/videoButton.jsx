import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import VideoModal from './videoModal';
import Modal from '../publish/src/js/components/modal/modal';

/** Class representing the UI for the Spectrum Accordion. */
export default class videoButton extends React.Component {
    constructor(props) {
        super(props);
        this.name = this.props.name;
        this.videoUrl = this.props.videoUrl;
        this.videoPolicy = this.props.videoPolicy;
        this.showVideoModal = this.showVideoModal.bind(this);
    }

    /*
     * Get our modal from the DOM.
     */
    getModal() {
        return document.querySelector(`.modalContainer #video-${this.name}`);
    }

    openModal() {
        let videoModal = this.renderModal();

        // Create a new DOM-based modal and open it.
        videoModal = new Modal(videoModal);
        videoModal.open();
    }

    showVideoModal(event) {
        event.preventDefault();
        event.stopPropagation();
        this.openModal();
    }

    renderModal() {
        const div = document.createElement('div');
        const modalContainer = document.querySelector('.modalContainer');

        const videoModalObj = React.createElement(VideoModal, {
            name: this.name, videoUrl: this.videoUrl, videoPolicy: this.videoPolicy,
        });
        ReactDOM.render(videoModalObj, div);

        modalContainer.appendChild(div);
        return this.getModal(this.name);
    }

    render() {
        return (
            <button
                onClick={event => this.showVideoModal(event)}
                className="aceui-Button-Round aceui-Button-Round--small aceui-Button-Round--video" />
        );
    }
}

videoButton.propTypes = {
    name: PropTypes.string,
    videoUrl: PropTypes.string.isRequired,
    videoPolicy: PropTypes.string,
};

videoButton.defaultProps = {
    name: 'name',
    videoPolicy: 'all',
};
