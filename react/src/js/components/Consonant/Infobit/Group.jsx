import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Bookmark from './Type/Bookmark';
import Button from './Type/Button';
import Icon from './Type/Icon';
import IconWithText from './Type/IconWithText';
import TextLink from './Type/Link';
import LinkWithIcon from './Type/LinkWithIcon';
import Price from './Type/Price';
import Progress from './Type/Progress';
import Rating from './Type/Rating';
import Text from './Type/Text';

const INFOBIT_TYPE = {
    PRICE: 'price',
    BUTTON: 'button',
    ICON_TEXT: 'icon-with-text',
    LINK_ICON: 'link-with-icon',
    TEXT: 'text',
    ICON: 'icon',
    LINK: 'link',
    PROGRESS: 'progress-bar',
    RATING: 'rating',
    BOOKMARK: 'bookmark',
};

function Group(props) {
    const { renderList } = props;
    const renderItems = (data) => {
        let arr = data;
        const res = [];

        if (!data) throw new Error();
        if (data && !Array.isArray(data) && typeof data === 'object') arr = [data];

        try {
            arr.forEach((el) => {
                switch (el.type) {
                    case INFOBIT_TYPE.PRICE:
                        res.push(<Price />);
                        break;
                    case INFOBIT_TYPE.BUTTON:
                        res.push(<Button {...el} />);
                        break;
                    case INFOBIT_TYPE.ICON_TEXT:
                        res.push(<IconWithText />);
                        break;
                    case INFOBIT_TYPE.LINK_ICON:
                        res.push(<LinkWithIcon />);
                        break;
                    case INFOBIT_TYPE.TEXT:
                        res.push(<Text />);
                        break;
                    case INFOBIT_TYPE.ICON:
                        res.push(<Icon />);
                        break;
                    case INFOBIT_TYPE.LINK:
                        res.push(<TextLink />);
                        break;
                    case INFOBIT_TYPE.PROGRESS:
                        res.push(<Progress />);
                        break;
                    case INFOBIT_TYPE.RATING:
                        res.push(<Rating />);
                        break;
                    case INFOBIT_TYPE.BOOKMARK:
                        res.push(<Bookmark />);
                        break;
                    default: break;
                }
            });

            return res;
        } catch (e) {
            alert(1);
            return res;
        }
    };

    return (<Fragment>{renderItems(renderList)}</Fragment>);
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
