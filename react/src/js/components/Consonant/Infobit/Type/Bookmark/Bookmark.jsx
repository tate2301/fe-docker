import React from 'react';
import classNames from 'classnames';
import {
    bool,
    string,
    func,
} from 'prop-types';

import Tooltip from './Tooltip';
import { trackCardSave } from '../../../Analytics/Analytics';

const bookmarkType = {
    isBookmarked: bool,
    saveCardIcon: string,
    cardSaveText: string,
    unsaveCardIcon: string,
    cardUnsaveText: string,
    onClick: func.isRequired,
    cardId: string.isRequired,
    disableBookmarkIco: bool.isRequired,
};

const defaultProps = {
    saveCardIcon: '',
    cardSaveText: '',
    unsaveCardIcon: '',
    cardUnsaveText: '',
    isBookmarked: false,
};

/**
 * Bookmark Infobit (shown in 3:2 Card Footer)
 * Used to save/unsave a card to local storage
 *
 * @component
 * @example
 * const props= {
    cardId: String,
    isBookmarked: String,
    saveCardIcon: String,
    unsaveCardIcon: String,
    cardSaveText: String,
    cardUnsaveText: String,
    onClick: Function,
    disableBookmarkIco: Boolean,
 * }
 * return (
 *   <Bookmark {...props}/>
 * )
 */
const Bookmark = ({
    cardId,
    isBookmarked,
    saveCardIcon,
    unsaveCardIcon,
    cardSaveText,
    cardUnsaveText,
    onClick,
    disableBookmarkIco,
}) => {
    const bookmarkInfobitClass = classNames({
        'BookmarkInfobit': true,
        'BookmarkInfobit is-active': isBookmarked,
        'BookmarkInfobit is-disabled': disableBookmarkIco,
    });

    const bookmarkIcon = () => {
        const cardIcon = isBookmarked ? saveCardIcon : unsaveCardIcon;
        return (
            <span
                data-testid="BookmarkInfobit-ico"
                className="BookmarkInfobit-ico"
                style={{ backgroundImage: cardIcon ? `url(${cardIcon})` : '' }} />
        );
    };

    const handleClick = (clickEvt) => {
        clickEvt.stopPropagation();
        onClick(cardId);
        trackCardSave(cardId, !isBookmarked);
    };

    const tooltipText = isBookmarked ? cardUnsaveText : cardSaveText;

    return (
        <button
            data-testid="BookmarkInfobit"
            data-tooltip-wrapper
            type="button"
            className={bookmarkInfobitClass}
            onClick={handleClick}
            tabIndex="0">
            {bookmarkIcon()}
            <Tooltip
                data-testid="bookmark-tooltip"
                text={tooltipText} />
        </button>
    );
};

Bookmark.propTypes = bookmarkType;
Bookmark.defaultProps = defaultProps;

export default Bookmark;
