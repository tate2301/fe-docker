import React from 'react';
import { bool, string, func } from 'prop-types';
import classNames from 'classnames';
import Tooltip from './Tooltip';

const TBookmark = {
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
        'consonant-bookmark-infobit': true,
        'consonant-bookmark-infobit_active': isBookmarked,
        'consonant-bookmark-infobit_disabled': disableBookmarkIco,
    });

    const bookmarkIcon = () => {
        const cardIcon = isBookmarked ? saveCardIcon : unsaveCardIcon;
        return (
            <span
                data-testid="bookmarks--ico"
                className="consonant-bookmark-infobit--ico"
                style={{ backgroundImage: cardIcon ? `url(${cardIcon})` : '' }} />
        );
    };

    const handleClick = (clickEvt) => {
        clickEvt.stopPropagation();
        onClick(cardId);
    };

    const tooltipText = isBookmarked ? cardUnsaveText : cardSaveText;

    return (
        <button
            data-testid="bookmark-button"
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

Bookmark.propTypes = TBookmark;
Bookmark.defaultProps = defaultProps;

export default Bookmark;
