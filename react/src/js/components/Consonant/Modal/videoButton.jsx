import React, { memo, Fragment, useState, useEffect, useRef, useCallback } from 'react';
import { string } from 'prop-types';
import { createPortal } from 'react-dom';
import ModalWindow from './videoModal';
import Modal from '../../../../../../publish/src/js/components/modal/modal';

const VideoButton = ({
    name,
    videoURL,
    className,
    videoPolicy,
}) => {
    const modalContainer = document.querySelector('.modalContainer');

    const modalElement = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleShowModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen && modalElement && modalElement.current) {
            const videoModal = new Modal(
                modalElement.current,
                { buttonClose: handleCloseModal },
            );

            videoModal.open();
        }
    }, [isOpen, modalElement]);

    return (
        <Fragment>
            <button
                className={className}
                onClick={handleShowModal} />
            {isOpen && createPortal(
                <ModalWindow
                    name={name}
                    videoURL={videoURL}
                    innerRef={modalElement}
                    videoPolicy={videoPolicy} />,
                modalContainer,
            )}
        </Fragment>
    );
};

VideoButton.propTypes = {
    name: string,
    videoPolicy: string,
    videoURL: string.isRequired,
    className: string.isRequired,
};

VideoButton.defaultProps = {
    name: 'video-modal',
    videoPolicy: 'autoplay; fullscreen',
};

export default memo(VideoButton);
