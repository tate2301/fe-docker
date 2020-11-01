import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useConfig } from '../Helpers/hooks';

/**
 * Bookmarks button with the icon and quanity of the bookmarked cards
 *
 * @component
 * @example
 * const props= {
    showBookmarks: Boolean,
    onClick: Function,
    savedCardsCount: Number,
 * }
 * return (
 *   <Bookmarks {...props}/>
 * )
 */
const Bookmarks = (props) => {
    const {
        showBookmarks,
        onClick,
        savedCardsCount,
    } = props;

    const getConfig = useConfig();

    /**
     **** Authored Configs ****
     */
    const bookmarkTitle = getConfig('bookmarks', 'i18n.leftFilterPanel.filterTitle');
    const bookmarkSelectedIcon = getConfig('bookmarks', 'leftFilterPanel.selectBookmarksIcon');
    const bookmarkUnselectedIcon = getConfig('bookmarks', 'leftFilterPanel.unselectBookmarksIcon');

    /**
     * Whether the bookmarks icon should be selected or not
     * @type {String}
     */
    const bookmarkIcon = showBookmarks ? bookmarkSelectedIcon : bookmarkUnselectedIcon;

    /**
     * Background image CSS styles for the bookmarks icon
     * @type {Object}
     */
    const iconStyles = {
        backgroundImage: bookmarkIcon ? `url(${bookmarkIcon})` : '',
    };

    /**
     * Class name for the bookmarks button:
     * CSS that handles whether the bookmarks icon is selected or not
     * @type {String}
     */
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

Bookmarks.propTypes = {
    showBookmarks: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    savedCardsCount: PropTypes.number,
};

Bookmarks.defaultProps = {
    showBookmarks: false,
    savedCardsCount: 0,
};

export default Bookmarks;
