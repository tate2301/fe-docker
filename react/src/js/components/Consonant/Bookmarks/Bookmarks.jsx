import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useConfig } from '../../../utils/hooks';

const Bookmarks = (props) => {
    const {
        showBookmarks,
        onClick,
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

export default Bookmarks;

Bookmarks.propTypes = {
    showBookmarks: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    savedCardsCount: PropTypes.number,
};

Bookmarks.defaultProps = {
    showBookmarks: false,
    savedCardsCount: 0,
};
