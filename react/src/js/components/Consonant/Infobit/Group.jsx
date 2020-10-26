/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { INFOBIT_TYPE } from '../Helpers/constants';
import { parseToPrimitive } from '../Helpers/general';
import Bookmark from './Type/Bookmark/Bookmark';
import Button from './Type/Button';
import Icon from './Type/Icon';
import IconWithText from './Type/IconWithText';
import TextLink from './Type/Link';
import LinkWithIcon from './Type/LinkWithIcon';
import Price from './Type/Price';
import Progress from './Type/Progress';
import Rating from './Type/Rating';
import Text from './Type/Text';
import DateInterval from './Type/DateInterval';

const Group = (props) => {
    const { renderList } = props;

    return (
        <Fragment>
            {renderList.map((infobit, index) => {
                switch (infobit.type) {
                    case INFOBIT_TYPE.PRICE:
                        return <Price {...infobit} key={index} />;

                    case INFOBIT_TYPE.BUTTON:
                        return <Button {...infobit} key={index} />;

                    case INFOBIT_TYPE.ICON_TEXT:
                        return <IconWithText {...infobit} key={index} />;

                    case INFOBIT_TYPE.LINK_ICON:
                        return <LinkWithIcon {...infobit} key={index} />;

                    case INFOBIT_TYPE.TEXT:
                        return <Text {...infobit} key={index} />;

                    case INFOBIT_TYPE.ICON:
                        return <Icon {...infobit} key={index} />;

                    case INFOBIT_TYPE.LINK:
                        return <TextLink {...infobit} key={index} />;

                    case INFOBIT_TYPE.PROGRESS:
                        return <Progress {...infobit} key={index} />;

                    case INFOBIT_TYPE.RATING:
                        return (
                            <Rating
                                key={index}
                                label={infobit.label}
                                totalStars={parseToPrimitive(infobit.totalStars)}
                                starsFilled={parseToPrimitive(infobit.starsFilled)} />
                        );

                    case INFOBIT_TYPE.BOOKMARK:
                        return <Bookmark {...infobit} key={index} />;

                    case INFOBIT_TYPE.DATE:
                        return <DateInterval {...infobit} key={index} />;

                    default: return null;
                }
            })}
        </Fragment>
    );
};

Group.propTypes = {
    renderList: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
    })),
};

Group.defaultProps = {
    renderList: [],
};

export default Group;
