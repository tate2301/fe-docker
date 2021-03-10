/**
 * React Modal
 *
 * This modal is the React equivalent of a Dexter DOM modal.
 * Its usage is heavily dependent on using it with a Dexter DOM modal class.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class ReactModal extends React.PureComponent {
    render() {
        const { children } = this.props;
        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement(child));

        return (
            <div className="modal dexter-Author-Hide">
                <div
                    className="dexter-Modal_overlay mobile-place-center mobile-place-middle"
                    data-conf-display="onHashChange"
                    style={{ backgroundColor: this.props.overlayColor }}>
                    <div
                        id={this.props.id}
                        className={`dexter-Modal ${this.props.widthClasses} ${this.props.heightClasses}`}>
                        <h6
                            id={`${this.props.id}-modalTitle`}
                            className="hide-all">
                            {this.props.name}
                        </h6>
                        <p
                            id={`${this.props.id}-modalDescription`}
                            className="hide-all">
                            {this.props.description}
                        </p>
                        <a href="#" className="dexter-CloseButton">
                            <i className="dexter-CloseButton_icon spectrum-close-circle-dark" />
                        </a>
                        <div className="aem-Grid aem-Grid--12 aem-Grid--default--12">
                            {childrenWithProps}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactModal.propTypes = {
    id: PropTypes.string,
    widthClasses: PropTypes.string,
    heightClasses: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    overlayColor: PropTypes.string,
    children: PropTypes.node.isRequired,
};

ReactModal.defaultProps = {
    id: '',
    widthClasses: '',
    heightClasses: '',
    name: '',
    description: '',
    overlayColor: '',
};
