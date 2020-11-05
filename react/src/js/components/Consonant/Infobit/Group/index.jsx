import React from 'react';
import uuid from 'react-uuid';

import { GroupType } from './types';
import { defaultProps, COMPONENTS } from './constants';

/**
 * Group of Infobits (shown in 3:2 Card Footer)
 *
 * @component
 * @example
 * const props= {
    renderList: Array,
 * }
 * return (
 *   <Group {...props}/>
 * )
 */
const Group = ({ renderList }) => renderList.map(({ type, ...infobit }) => {
    const Component = COMPONENTS[type];

    return !Component ? null : <Component key={uuid()} {...infobit} />;
});

Group.propTypes = GroupType;
Group.defaultProps = defaultProps;

export default Group;
