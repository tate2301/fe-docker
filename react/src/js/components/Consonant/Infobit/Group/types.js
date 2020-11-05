import {
    shape,
    arrayOf,
    oneOfType,
} from 'prop-types';

import {
    FooterLeftType,
    FooterRightType,
    FooterCenterType,
} from '../../types/card';

// eslint-disable-next-line import/prefer-default-export
export const GroupType = {
    renderList: arrayOf(oneOfType([
        shape(FooterLeftType),
        shape(FooterRightType),
        shape(FooterCenterType),
    ])),
};
