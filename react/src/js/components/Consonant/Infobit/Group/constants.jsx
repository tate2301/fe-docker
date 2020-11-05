import { INFOBIT_TYPE } from '../../Helpers/constants';
import {
    Icon,
    Text,
    Link,
    Price,
    Button,
    Rating,
    Progress,
    Bookmark,
    IconWithText,
    LinkWithIcon,
    DateInterval,
} from '../Type';

export const defaultProps = {
    renderList: [],
};

export const COMPONENTS = {
    [INFOBIT_TYPE.TEXT]: Text,
    [INFOBIT_TYPE.ICON]: Icon,
    [INFOBIT_TYPE.LINK]: Link,
    [INFOBIT_TYPE.PRICE]: Price,
    [INFOBIT_TYPE.BUTTON]: Button,
    [INFOBIT_TYPE.RATING]: Rating,
    [INFOBIT_TYPE.DATE]: DateInterval,
    [INFOBIT_TYPE.BOOKMARK]: Bookmark,
    [INFOBIT_TYPE.PROGRESS]: Progress,
    [INFOBIT_TYPE.ICON_TEXT]: IconWithText,
    [INFOBIT_TYPE.LINK_ICON]: LinkWithIcon,
    [INFOBIT_TYPE.LINK_ICON]: LinkWithIcon,
};
