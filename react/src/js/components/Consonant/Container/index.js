import React, { memo, useMemo } from 'react';
import { shape } from 'prop-types';

import Container from './Container';
import { ConfigType } from '../types/config';
import { mergeDeep } from '../Helpers/general';
import { ConfigContext } from '../Helpers/contexts';
import { DEFAULT_CONFIG } from '../Helpers/constants';

/**
 * Consonant Card Collection
 * Config is implicitly populated by authors
 *
 * @component
 * @example
 * const config= {
    collection: {},
    featuredCards: [{}],
    filterPanel: {},
    sort: {},
    pagination: {},
    bookmarks: {},
    search: {},
    language: ''
 * }
 * return (
 *   <Container config={config}/>
 * )
 */
const ProvidedContainer = ({ config }) => {
    const fullConfig = useMemo(() => mergeDeep(DEFAULT_CONFIG, config), [config]);

    return (
        <ConfigContext.Provider value={fullConfig}>
            <Container />
        </ConfigContext.Provider>
    );
};

ProvidedContainer.propTypes = {
    config: shape(ConfigType),
};

ProvidedContainer.defaultProps = {
    config: {},
};

export default memo(ProvidedContainer);
