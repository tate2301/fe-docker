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
    let videoModal;
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
            videoModal = new Modal(
                modalElement.current,
                { buttonClose: handleCloseModal },
            );

            videoModal.open();
        } else if (videoModal) {
            videoModal.close();
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
    name: string.isRequired,
    videoURL: string.isRequired,
    className: string.isRequired,
    videoPolicy: string.isRequired,
};

export default memo(VideoButton);
