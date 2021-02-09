import {
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

import { debounce, queryString } from './general';
import { makeConfigGetter } from './consonant';
import {
    ConfigContext,
    ExpandableContext,
} from './contexts';
import { ROOT_MARGIN_DEFAULT } from './constants';

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
 * @description - Configs are grabbed from Authoring Dialog and passed into React Component
 *
 * @type {[Number, Function]} Config
 */
export const useConfig = () => {
    const config = useContext(ConfigContext);
    return useCallback(makeConfigGetter(config), [config]);
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
    const options = {
        rootMargin: ROOT_MARGIN_DEFAULT,
    };
    const [lazyLoadImage, setLazyLoadImage] = useState('');
    const [intersectionImage, setIntersectionImage] = useState('');

    const imageObserver = new IntersectionObserver((elements) => {
        if (elements[0].intersectionRatio !== 0) {
            setIntersectionImage(image);
        }
    }, options);

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

/**
 * Create a state that is sync with url search param.
 *
 * @type {Object, Function, Function]} urlState, handleSetQuery, handleClearQuery
 */
export const useURLState = () => {
    const {
        location: { search, pathname },
        history: { replaceState },
    } = window;

    const handleReplaceState = replaceState.bind(window.history, {}, '');

    const [urlState, setUrlState] = useState(queryString.parse(search));

    const handleSetQuery = useCallback((key, value) => {
        setUrlState((origin) => {
            if (!value || (Array.isArray(value) && !value.length)) {
                const cloneOrigin = { ...origin };
                delete cloneOrigin[key];

                return cloneOrigin;
            }

            return { ...origin, [key]: value };
        });
    }, []);

    const handleClearQuery = useCallback(() => {
        setUrlState({});
    }, []);

    useEffect(() => {
        const searchString = queryString.stringify(urlState);

        handleReplaceState(`${pathname}${searchString ? '?' : ''}${searchString}`);
    }, [urlState]);

    return [urlState, handleSetQuery, handleClearQuery];
};
