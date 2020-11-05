import React, { useMemo } from 'react';
import classNames from 'classnames';

import { selector } from './selectors';
import { BookmarksType } from './types';
import { useConfigSelector } from '../Helpers/hooks';

const defaultProps = {
    showBookmarks: false,
    savedCardsCount: 0,
};

const Bookmarks = ({ showBookmarks, onClick, savedCardsCount }) => {
    const {
        label,
        selectIcon,
        unselectIcon,
    } = useConfigSelector(selector);

    const icon = showBookmarks
        ? selectIcon
        : unselectIcon;

    const bookmarkClass = classNames({
        bookmarks: true,
        bookmarks_selected: showBookmarks,
    });

    const iconStyles = useMemo(() => ({ backgroundImage: `url(${icon})` }), [icon]);

    return (
        <button
            tabIndex="0"
            type="button"
            onClick={onClick}
            data-testid="bookmarks"
            className={bookmarkClass}>
            <span className="bookmarks__icon-wrapper">
                <span
                    style={iconStyles}
                    className="bookmarks--icon"
                    data-testid="bookmarks--icon" />
                <span className="bookmarks__label">{label}</span>
            </span>

            <span
                data-testid="bookmarks__badge"
                className="bookmarks--item-badge">
                {savedCardsCount}
            </span>
        </button>
    );
};

Bookmarks.propTypes = BookmarksType;
Bookmarks.defaultProps = defaultProps;

export default Bookmarks;
