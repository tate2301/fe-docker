import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tooltip from './Tooltip';

function Bookmark({
    cardId,
    isBookmarked,
    saveCardIcon,
    unsaveCardIcon,
    cardSaveText,
    cardUnsaveText,
    onClick,
    disableBookmarkIco,
}) {
    const className = classNames(
        'consonant-bookmark-infobit',
        {
            'consonant-bookmark-infobit_active': isBookmarked,
            'consonant-bookmark-infobit_disabled': disableBookmarkIco,
        },
    );

    const renderIcon = () => {
        let src = '';

        if (isBookmarked && saveCardIcon) src = saveCardIcon;
        if (!isBookmarked && unsaveCardIcon) src = unsaveCardIcon;

        return (<span
            className="consonant-bookmark-infobit--ico"
            style={{ backgroundImage: src ? `url(${src})` : '' }} />);
    };

    const handleClick = (clickEvt) => {
        clickEvt.stopPropagation();
        onClick(cardId);
    };

    return (
        <button
            data-tooltip-wrapper
            type="button"
            className={className}
            onClick={handleClick}
            tabIndex="0">
            {renderIcon()}
            <Tooltip text={
                isBookmarked ? cardUnsaveText : cardSaveText
            } />
        </button>
    );
}

Bookmark.propTypes = {
    cardId: PropTypes.string.isRequired,
    saveCardIcon: PropTypes.string,
    unsaveCardIcon: PropTypes.string,
    cardSaveText: PropTypes.string,
    cardUnsaveText: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    isBookmarked: PropTypes.bool.isRequired,
    disableBookmarkIco: PropTypes.bool.isRequired,
};

Bookmark.defaultProps = {
    saveCardIcon: '',
    unsaveCardIcon: '',
    cardSaveText: 'Save Card',
    cardUnsaveText: 'Unsave Card',
};

export default Bookmark;
