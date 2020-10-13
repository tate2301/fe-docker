/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Bookmark from './Type/Bookmark/Bookmark';
import Button from './Type/Button';
import Icon from './Type/Icon';
import IconWithText from './Type/IconWithText';
import TextLink from './Type/Link';
import LinkWithIcon from './Type/LinkWithIcon';
import Price from './Type/Price';
import Progress from './Type/Progress';
import Rating from './Type/Rating/Rating';
import Text from './Type/Text';
import DateInterval from './Type/DateInterval/DateInterval';
import { parseToPrimitive } from '../../../utils/general';
import { INFOBIT_TYPE } from '../../../constants';

function Group(props) {
    const { renderList } = props;
    const renderListIsNotArray = renderList && !Array.isArray(renderList) && typeof renderList === 'object';
    const data = renderListIsNotArray ? [renderList] : renderList;

    return (
        <Fragment>
            {data.map((el, i) => {
                switch (el.type) {
                    case INFOBIT_TYPE.PRICE:
                        return <Price {...el} key={i} />;

                    case INFOBIT_TYPE.BUTTON:
                        return <Button {...el} key={i} />;

                    case INFOBIT_TYPE.ICON_TEXT:
                        return <IconWithText {...el} key={i} />;

                    case INFOBIT_TYPE.LINK_ICON:
                        return <LinkWithIcon {...el} key={i} />;

                    case INFOBIT_TYPE.TEXT:
                        return <Text {...el} key={i} />;

                    case INFOBIT_TYPE.ICON:
                        return <Icon {...el} key={i} />;

                    case INFOBIT_TYPE.LINK:
                        return <TextLink key={i} />;

                    case INFOBIT_TYPE.PROGRESS:
                        return <Progress {...el} key={i} />;

                    case INFOBIT_TYPE.RATING:
                        return (
                            <Rating
                                key={i}
                                label={el.label}
                                totalStars={parseToPrimitive(el.totalStars)}
                                starsFilled={parseToPrimitive(el.starsFilled)} />
                        );

                    case INFOBIT_TYPE.BOOKMARK:
                        return <Bookmark {...el} key={i} />;

                    case INFOBIT_TYPE.DATE:
                        return <DateInterval {...el} key={i} />;

                    default: return null;
                }
            })}
        </Fragment>
    );
}

Group.propTypes = {
    renderList: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
    })),
};

Group.defaultProps = {
    renderList: [],
};

export default Group;
