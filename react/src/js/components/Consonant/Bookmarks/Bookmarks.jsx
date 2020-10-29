import React from 'react';
import classNames from 'classnames';
import { bool, func, number } from 'prop-types';

import { useConfig } from '../Helpers/hooks';

const TBookmarks = {
    showBookmarks: bool,
    savedCardsCount: number,
    onClick: func.isRequired,
};

const defaultProps = {
    showBookmarks: false,
    savedCardsCount: 0,
};

const Bookmarks = (props) => {
    const {
        onClick,
        showBookmarks,
        savedCardsCount,
    } = props;

    const getConfig = useConfig();
    const bookmarkTitle = getConfig('bookmarks', 'i18n.leftFilterPanel.filterTitle');
    const bookmarkSelectedIcon = getConfig('bookmarks', 'leftFilterPanel.selectBookmarksIcon');
    const bookmarkUnselectedIcon = getConfig('bookmarks', 'leftFilterPanel.unselectBookmarksIcon');

    const bookmarkIcon = showBookmarks ? bookmarkSelectedIcon : bookmarkUnselectedIcon;

    const iconStyles = {
        backgroundImage: bookmarkIcon ? `url(${bookmarkIcon})` : '',
    };

    const bookmarkClass = classNames({
        bookmarks: true,
        bookmarks_selected: showBookmarks,
    });

    return (
        <button
            data-testid="bookmarks"
            type="button"
            onClick={onClick}
            className={bookmarkClass}
            tabIndex="0">
            <span
                className="bookmarks--ico-wrapper">
                <span
                    style={iconStyles}
                    className="bookmarks--ico"
                    data-testid="bookmarks--ico" />
                <span
                    className="bookmarks--title">
                    {bookmarkTitle}
                </span>
            </span>
            <span
                data-testid="bookmarks--item-badge"
                className="bookmarks--item-badge">
                {savedCardsCount}
            </span>
        </button>
    );
};

Bookmarks.propTypes = TBookmarks;
Bookmarks.defaultProps = defaultProps;

export default Bookmarks;
