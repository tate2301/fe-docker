import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useConfig } from '../../../utils/hooks';

const Bookmarks = (props) => {
    const {
        selected,
        onClick,
        qty,
    } = props;

    const getConfig = useConfig();
    const title = getConfig('bookmarks', 'i18n.leftFilterPanel.filterTitle');
    const selectedIco = getConfig('bookmarks', 'leftFilterPanel.selectBookmarksIcon');
    const unselectedIco = getConfig('bookmarks', 'leftFilterPanel.unselectBookmarksIcon');

    const src = selected ? selectedIco : unselectedIco;

    const iconStyles = useMemo(() => ({
        backgroundImage: src ? `url(${src})` : '',
    }));

    return (
        <button
            data-testid="bookmarks"
            type="button"
            onClick={onClick}
            className={selected ? 'bookmarks bookmarks_selected' : 'bookmarks'}
            tabIndex="0">
            <span className="bookmarks--ico-wrapper">
                <span
                    style={iconStyles}
                    className="bookmarks--ico"
                    data-testid="bookmarks--ico" />
                <span className="bookmarks--title">{title}</span>
            </span>
            <span data-testid="bookmarks--item-badge" className="bookmarks--item-badge">{qty}</span>
        </button>
    );
};

export default Bookmarks;

Bookmarks.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    qty: PropTypes.number,
};

Bookmarks.defaultProps = {
    selected: false,
    qty: 0,
};
