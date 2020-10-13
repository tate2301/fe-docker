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
