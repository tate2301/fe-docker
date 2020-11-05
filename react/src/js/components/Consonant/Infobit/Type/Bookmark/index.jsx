import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import {
    bool,
    func,
    string,
} from 'prop-types';

import Tooltip from './Tooltip';
import { CLASS_PREFIX, STATE } from './constants';

const BookmarkType = {
    onClick: func,
    isBookmarked: bool,
    saveCardIcon: string,
    cardSaveText: string,
    unsaveCardIcon: string,
    cardUnsaveText: string,
    cardId: string.isRequired,
    disableBookmarkIco: bool.isRequired,
};

const defaultProps = {
    saveCardIcon: '',
    cardSaveText: '',
    unsaveCardIcon: '',
    cardUnsaveText: '',
    onClick: undefined,
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
    onClick,
    saveCardIcon,
    cardSaveText,
    isBookmarked,
    unsaveCardIcon,
    cardUnsaveText,
    disableBookmarkIco,
}) => {
    const icon = isBookmarked ? saveCardIcon : unsaveCardIcon;
    const tooltipText = isBookmarked ? cardSaveText : cardUnsaveText;

    const className = classNames({
        CLASS_PREFIX: true,
        [`${CLASS_PREFIX}_${STATE.active}`]: isBookmarked,
        [`${CLASS_PREFIX}_${STATE.disabled}`]: disableBookmarkIco,
    });

    const handleClick = useCallback(
        (event) => {
            event.stopPropagation();

            if (onClick) onClick(cardId);
        },
        [onClick, cardId],
    );

    const iconStyles = useMemo(() => ({ backgroundImage: `url(${icon})` }), [icon]);

    return (
        <button
            tabIndex="0"
            type="button"
            data-tooltip-wrapper
            className={className}
            onClick={handleClick}
            data-testid="bookmark-button">
            <span
                style={iconStyles}
                data-testid="bookmarks--ico"
                className="consonant-bookmark-infobit--ico" />
            <Tooltip text={tooltipText} />
        </button>
    );
};

Bookmark.propTypes = BookmarkType;
Bookmark.defaultProps = defaultProps;

export default Bookmark;
