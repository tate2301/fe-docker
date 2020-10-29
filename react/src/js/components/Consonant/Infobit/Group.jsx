import uuid from 'react-uuid';
import React, { Fragment } from 'react';
import { oneOfType, arrayOf, shape } from 'prop-types';

import Icon from './Type/Icon';
import Text from './Type/Text';
import Price from './Type/Price';
import Button from './Type/Button';
import TextLink from './Type/Link';
import Rating from './Type/Rating';
import Progress from './Type/Progress';
import IconWithText from './Type/IconWithText';
import LinkWithIcon from './Type/LinkWithIcon';
import DateInterval from './Type/DateInterval';
import Bookmark from './Type/Bookmark/Bookmark';

import { INFOBIT_TYPE } from '../Helpers/constants';
import { parseToPrimitive } from '../Helpers/general';

import { TFooterLeft, TFooterCenter, TFooterRight } from '../types/card';

const TGroup = {
    renderList: arrayOf(oneOfType([
        shape(TFooterLeft),
        shape(TFooterRight),
        shape(TFooterCenter),
    ])),
};

const defaultProps = {
    renderList: [],
};

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
const Group = (props) => {
    const {
        renderList,
    } = props;

    return (
        <Fragment>
            {renderList.map((infobit) => {
                switch (infobit.type) {
                    case INFOBIT_TYPE.PRICE:
                        return (
                            <Price
                                {...infobit}
                                key={uuid()} />
                        );

                    case INFOBIT_TYPE.BUTTON:
                        return (
                            <Button
                                {...infobit}
                                key={uuid()} />
                        );

                    case INFOBIT_TYPE.ICON_TEXT:
                        return (
                            <IconWithText
                                {...infobit}
                                key={uuid()} />
                        );

                    case INFOBIT_TYPE.LINK_ICON:
                        return (
                            <LinkWithIcon
                                {...infobit}
                                key={uuid()} />
                        );

                    case INFOBIT_TYPE.TEXT:
                        return (
                            <Text
                                {...infobit}
                                key={uuid()} />
                        );

                    case INFOBIT_TYPE.ICON:
                        return (
                            <Icon
                                {...infobit}
                                key={uuid()} />
                        );

                    case INFOBIT_TYPE.LINK:
                        return (
                            <TextLink
                                {...infobit}
                                key={uuid()} />
                        );

                    case INFOBIT_TYPE.PROGRESS:
                        return (
                            <Progress
                                {...infobit}
                                key={uuid()} />
                        );

                    case INFOBIT_TYPE.RATING:
                        return (
                            <Rating
                                key={uuid()}
                                label={infobit.label}
                                totalStars={parseToPrimitive(infobit.totalStars)}
                                starsFilled={parseToPrimitive(infobit.starsFilled)} />
                        );

                    case INFOBIT_TYPE.BOOKMARK:
                        return (
                            <Bookmark
                                {...infobit}
                                key={uuid()} />
                        );

                    case INFOBIT_TYPE.DATE:
                        return (
                            <DateInterval
                                {...infobit}
                                key={uuid()} />
                        );

                    default: return null;
                }
            })}
        </Fragment>
    );
};

Group.propTypes = TGroup;
Group.defaultProps = defaultProps;

export default Group;
