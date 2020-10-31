import debounce from 'lodash/debounce';
import React, {
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

import { makeConfigGetter } from './consonant';
import {
    ConfigContext,
    ExpandableContext,
} from './contexts';

// const noop = () => {};

/**
 * @typedef {function(): {Int, Int}} WindowDimensionsState - Current Window Dimensions
 * @description — Handles debouncing when window is re-sized
 *
 * @type {function(): {Int, Int}} WindowDimensions
 */
export const useWindowDimensions = () => {
    const getWindowDimensions = () => ({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        const handleResize = debounce(() => setWindowDimensions(getWindowDimensions()));

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
};

/**
 * @typedef {String} OpenDropdownState - Id of a selected dropdown
 * @description — Passed in Context Provider So All Nested Components can be in sync
 *
 * @typedef {Function} OpenDropdownStateSetter - handleToggle sets dropdown state
 * @description - This handles keeping multiple popup states in sync
 *
 * @type {[String, Function]} OpenDropdown
 */
export const useExpandable = (dropdownId) => {
    const { value: openDropdown, setValue: setOpenDropdown } = useContext(ExpandableContext);
    const handleToggle = useCallback((e) => {
        e.stopPropagation();
        if (openDropdown === dropdownId) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(dropdownId);
        }
    }, [setOpenDropdown, openDropdown]);

    return [openDropdown, handleToggle];
};

/**
 * @typedef {Function} ConfigStateSetter
 * @description - Configs are grabbed from Authoring Dialog and passedd into React Component
 *
 * @type {[Number, Function]} Config
 */
export const useConfig = () => {
    const config = useContext(ConfigContext);
    return useCallback(makeConfigGetter(config), [config]);
};


/**
 * @typedef {Function} IsMountedtateSetter
 * @description - Flag to handle unmounting components when react re-renders
 * This is used to prevent memory leaks in the application when DOM is wiped by react
 *
 * @type {[Number, Function]} IsMounted
 */
export const useIsMounted = () => {
    const isMounted = React.useRef(true);

    React.useEffect(() => () => {
        isMounted.current = false;
    }, []);

    return isMounted;
};

/**
 * @typedef {Image} LazyLoadedImageState
 * @description — Has image as state after image is lazy loaded
 *
 * @typedef {Function} LazyLoadedImageStateSetter
 * @description - Sets state once image is lazy loaded
 *
 * @type {[Image]} LazyLoadedImage
 */
export const useLazyLoading = (imageRef, image) => {
    const [lazyLoadImage, setLazyLoadImage] = useState('');
    const [intersectionImage, setIntersectionImage] = useState('');

    const imageObserver = new IntersectionObserver((elements) => {
        if (elements[0].intersectionRatio !== 0) {
            setIntersectionImage(image);
        }
    });

    useEffect(() => {
        let img;
        if (intersectionImage) {
            img = new Image();

            img.src = intersectionImage;
            img.onload = () => {
                setLazyLoadImage(intersectionImage);
            };
        }
        return () => {
            if (img) {
                img.onload = () => {};
            }
        };
    }, [intersectionImage]);

    useEffect(() => {
        if (imageRef.current) {
            imageObserver.observe(imageRef.current);
        }
        return () => {
            imageObserver.unobserve(imageRef.current);
        };
    }, [imageRef]);

    return [lazyLoadImage];
};
