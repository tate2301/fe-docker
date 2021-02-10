/* global history */
import Video from '../video/video';
import Iframe from '../iframe/iframe';
import findBackgroundVideos from '../video/backgroundVideo';

const DATA_REMEMBER_CLOSE_ACTION = 'data-remember-close-action';
const IS_OPEN = 'is-Open';
const NO_SCROLL = 'u-noScroll';

/**
 * Convert the given element to a Modal.
 *
 * @param {Element} element will be converted
 * @param {object} [callbacks={}] An optional object that contains callback functions for
 *  some modal behavior.  The supported callbacks are:
 *   {
 *      close: Called when the modal is closed by any means
 *      buttonClose: Called when the modal close (X) button is clicked
 *      escClose: Called when the esc button is used to close the modal
 *      overlayClose: Called when the modal is closed by clicking on the overlay
 *   }
 */
export default class Modal {
    constructor(element, callbacks = {}) {
        this.callbacks = callbacks;
        this.element = element;
        this.disablePageScroll = false;
        if (this.getDisplayType() === 'onHashChange') {
            this.disablePageScroll = true;
            this.getOverlay();
            this.setupOverlayClick();
            this.setupCloseEscape();
        }
        // Declare focus elements
        this.firstFocusableEl = null;
        this.lastFocusableEl = null;
        this.focusableEls = null;
        // Always get a close button
        this.setupCloseClick();
        // setting the focusable elements of a modal
        this.setFocusableElements();
        this.element.addEventListener('keydown', event => this.handleTabAccessibility(event));
    }

    setFocusableElements() {
        this.focusableEls = this.element.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
        this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];
        this.firstFocusableEl = this.focusableEls[0] || this.element;
    }

    isCloseEnabledRepeatUser() {
        const repeatUser = window.localStorage.getItem(this.getUserStorageValue());
        const closeButton = this.element.querySelector('.dexter-CloseButton');
        return closeButton.hasAttribute(DATA_REMEMBER_CLOSE_ACTION) && JSON.parse(repeatUser);
    }

    getDisplayType() {
        return this.element.parentElement.dataset.confDisplay;
    }

    getId() {
        return this.element.id;
    }

    getDelay() {
        const delay = this.element.parentElement.dataset.confDelay;
        return parseInt(delay, 10);
    }

    getPageName() {
        return this.element.parentElement.dataset.pageName;
    }

    getUserStorageValue() {
        // creating the localstorage key in the format : modalId_pageName
        const pageName = this.getPageName();
        return this.getId().concat('_', pageName);
    }

    setupCloseClick() {
        const closeButton = this.element.querySelector('.dexter-CloseButton');
        const closeButtonHandler = (event) => {
            event.stopPropagation();
            event.preventDefault();
            if (closeButton.hasAttribute(DATA_REMEMBER_CLOSE_ACTION)) {
                // setting the userVisited to true
                window.localStorage.setItem(this.getUserStorageValue(), true);
            }
            if (typeof this.callbacks.buttonClose === 'function') this.callbacks.buttonClose();
            this.close();
            // analytics for close button
            this.sendCloseAnalytics();
        };
        closeButton.addEventListener('click', closeButtonHandler);
    }

    sendCloseAnalytics() {
        /* eslint-disable no-underscore-dangle */
        if (window.digitalData && window._satellite) {
            window.digitalData._set('primaryEvent.eventInfo.eventName', window.digitalData._get('digitalData.page.pageInfo.pageName').concat(':tryFreeCloseClick', this.getId()));
            window._satellite.track('event', {
                digitalData: window.digitalData._snapshot(),
            });
        }
        /* eslint-enable no-underscore-dangle */
    }

    getOverlay() {
        this.modalOverlay = this.element.parentElement;
    }

    getIframes() {
        if (!this.iframes || this.iframes.length === 0) {
            const iframeElements = this.element.querySelectorAll('.frame-container iframe');
            this.iframes = Array.from(iframeElements, element => new Iframe(element));
        }
    }

    setupOverlayClick() {
        const overlayHandler = (event) => {
            if (event.target.classList.contains('dexter-Modal_overlay')) {
                event.stopPropagation();
                event.preventDefault();
                if (typeof this.callbacks.overlayClose === 'function') this.callbacks.overlayClose();
                this.close();
            }
        };
        this.modalOverlay.addEventListener('click', overlayHandler);
    }

    open(previousHashValue) {
        this.previousHashValue = previousHashValue;
        this.isOpen = true;
        if (this.modalOverlay) {
            this.modalOverlay.classList.add(IS_OPEN);
        }
        this.element.parentElement.classList.add(IS_OPEN);
        this.element.classList.add(IS_OPEN);
        this.getVideos();
        this.videos.forEach((video) => {
            video.setSrc();
        });
        this.getIframes();
        const disablePageScroll = () => {
            if (this.isOpen && this.disablePageScroll) {
                document.body.classList.add(NO_SCROLL);
            }
        };
        this.iframes.forEach((iframe) => {
            iframe.element.onload = disablePageScroll;
            iframe.setSrc();
        });
        if (this.iframes.length === 0) {
            disablePageScroll();
        }
        findBackgroundVideos(this.element, false);
        // saving the focused element before open
        this.focusedElBeforeOpen = document.activeElement;
        if (this.firstFocusableEl && !this.firstFocusableEl.isEqualNode(this.lastFocusableEl)) {
            this.firstFocusableEl.focus();
        }
    }

    getVideos() {
        if (!this.videos || this.videos.length === 0) {
            const videoElements = this.element.querySelectorAll('.videoContainer iframe');
            this.videos = Array.from(videoElements, element => new Video(element));
        }
    }

    close() {
        if (this.disablePageScroll) {
            document.body.classList.remove(NO_SCROLL);
        }
        this.isOpen = false;
        if (this.videos && this.videos.length) {
            this.videos.forEach((video) => {
                video.removeSrc();
            });
        }
        if (this.modalOverlay) {
            this.modalOverlay.classList.remove(IS_OPEN);
        }
        if (this.iframes && this.iframes.length) {
            this.iframes.forEach((iframe) => {
                iframe.removeSrc();
            });
        }
        this.element.classList.remove(IS_OPEN);
        const pageScroll = document.documentElement.scrollTop;
        /* removes the hash value but leaves a '#' */
        window.location.hash = this.previousHashValue || '';
        this.resetFocus();
        window.scrollTo(0, pageScroll);
        if (typeof this.callbacks.close === 'function') this.callbacks.close();
    }

    resetFocus() {
        try {
            this.focusedElBeforeOpen.focus();
        } catch (e) {
            // prevent console error
        }
    }

    handleBackwardTab(event) {
        if (document.activeElement === this.firstFocusableEl) {
            event.preventDefault();
            if (this.lastFocusableEl) {
                this.lastFocusableEl.focus();
            }
        }
    }

    handleForwardTab(event) {
        if (document.activeElement === this.lastFocusableEl) {
            event.preventDefault();
            if (this.firstFocusableEl) {
                this.firstFocusableEl.focus();
            }
        }
    }

    handleTabAccessibility(event) {
        if (event.which && event.which === 9) {
            const isShift = event.shiftKey;
            if (this.focusableEls.length === 1) {
                event.preventDefault();
            }
            if (isShift) {
                this.handleBackwardTab(event);
            } else {
                this.handleForwardTab(event);
            }
        }
    }

    setupCloseEscape() {
        document.onkeydown = (event) => {
            let isEscape = false;
            if ('key' in event) {
                isEscape = (event.key === 'Escape' || event.key === 'Esc');
            } else {
                isEscape = (event.keyCode === 27);
            }
            if (isEscape) {
                if (typeof this.callbacks.escClose === 'function') this.callbacks.escClose();
                this.close();
            }
        };
    }
}
