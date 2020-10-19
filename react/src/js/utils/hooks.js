import React  from 'react';
import debounce from 'lodash/debounce';
import { useCallback, useContext, useEffect, useState } from 'react';
import { makeConfigGetter } from './consonant';
import { ConfigContext, ExpandableContext } from '../contexts';

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

export const useConfig = () => {
    const config = useContext(ConfigContext);
    return useCallback(makeConfigGetter(config), [config]);
};


export const useIsMounted = () => {
    const isMounted = React.useRef(true);

    React.useEffect(() => {
        return () => {
        isMounted.current = false;
        };
    }, []);

    return isMounted;
}

export const useLazyLoading = (imageRef, image) => {
    const [lazyLoadImage, setLazyLoadImage] = useState(""); 
    const isMounted = useIsMounted(); 
    const imageObserver = new IntersectionObserver(elements => {
        if (elements[0].intersectionRatio !== 0 && isMounted.current) {
            setLazyLoadImage(image);
        }
    })

    useEffect(() => {
        if(lazyLoadImage){
            const img = new Image();
            img.src = lazyLoadImage;
            img.onload = () => {
                if (isMounted.current) {
                    setLazyLoadImage(lazyLoadImage);
                }
            }
        }
      }, [lazyLoadImage])

    useEffect(() => {
        if(imageRef.current){
            imageObserver.observe(imageRef.current);
        }
    }, [imageRef]);

    return [ lazyLoadImage ];   
}