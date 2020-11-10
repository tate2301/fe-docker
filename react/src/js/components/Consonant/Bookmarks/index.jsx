import React, { useMemo } from 'react';
import classNames from 'classnames';

import { selector } from './utils';
import { BookmarksType } from './types';
import { useConfigSelector } from '../Helpers/hooks';

const defaultProps = {
    showBookmarks: false,
    savedCardsCount: 0,
};

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
const Bookmarks = ({ showBookmarks, onClick, savedCardsCount }) => {
    const {
        label,
        selectIcon,
        unselectIcon,
    } = useConfigSelector(selector);

    /**
     * Whether the bookmarks icon should be selected or not
     * @type {String}
     */
    const icon = showBookmarks
        ? selectIcon
        : unselectIcon;

    /**
     * Class name for the bookmarks button:
     * CSS that handles whether the bookmarks icon is selected or not
     * @type {String}
     */
    const bookmarkClass = classNames({
        bookmarks: true,
        bookmarks_selected: showBookmarks,
    });

    /**
     * Background image CSS styles for the bookmarks icon
     * @type {Object}
     */
    const iconStyles = useMemo(() => ({ backgroundImage: `url(${icon})` }), [icon]);

    return (
        <button
            tabIndex="0"
            type="button"
            onClick={onClick}
            data-testid="bookmarks"
            className={bookmarkClass}>
            <span className="bookmarks--ico-wrapper">
                <span
                    style={iconStyles}
                    className="bookmarks--icon"
                    data-testid="bookmarks--icon" />
                <span className="bookmarks__label">{label}</span>
            </span>

            <span
                data-testid="bookmarks--item-badge"
                className="bookmarks--item-badge">
                {savedCardsCount}
            </span>
        </button>
    );
};

Bookmarks.propTypes = BookmarksType;
Bookmarks.defaultProps = defaultProps;

export default Bookmarks;
