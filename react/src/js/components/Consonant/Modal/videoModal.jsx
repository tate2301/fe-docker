import React from 'react';
import PropTypes from 'prop-types';

/** Class representing the UI for the Spectrum Accordion. */

export default class videoModal extends React.Component {
    constructor(props) {
        super(props);
        this.name = this.props.name;
        this.videoUrl = this.props.videoUrl;
        this.videoPolicy = this.props.videoPolicy;
    }

    render() {
        return (
            <div className="modal">
                <div className="dexter-Modal_overlay mobile-place-center mobile-place-middle closePlacement-outsideTopRight" data-conf-display="onHashChange">
                    <div className="dexter-Modal mobile-width-100 mobile-height-auto tablet-width-640 desktop-width-1024" id={`video-${this.name}`}>
                        <h6 id={`video-${this.name}-modalTitle`} className="hide-all">Language Navigation</h6>
                        <p id={`video-${this.name}-modalDescription`} className="hide-all">Language Navigation</p>
                        <a href="#" className="dexter-CloseButton">
                            <i className="dexter-CloseButton_icon spectrum-close-circle-dark" />
                        </a>
                        <div className="aem-Grid aem-Grid--12 aem-Grid--default--12">
                            <div className="video aem-GridColumn aem-GridColumn--default--12">
                                <div className="videoContainer" data-in-modal>
                                    <iframe
                                        title="Featured Video"
                                        data-video-src={this.videoUrl}
                                        allow={this.videoPolicy}
                                        frameBorder="0"
                                        webkitallowfullscreen="true"
                                        mozallowfullscreen="true"
                                        allowFullScreen="true" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

videoModal.propTypes = {
    name: PropTypes.string,
    videoUrl: PropTypes.string.isRequired,
    videoPolicy: PropTypes.string,
};


videoModal.defaultProps = {
    name: 'name',
    videoPolicy: 'allow-all',
};
