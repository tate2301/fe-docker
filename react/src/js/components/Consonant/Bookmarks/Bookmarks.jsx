import React from 'react';
import PropTypes from 'prop-types';

const Bookmarks = (props) => {
    const {
        title,
        selectedIco,
        unselectedIco,
        selected,
        onClick,
        qty,
    } = props;

    const renderIcon = () => {
        let src = '';

        if (selected && selectedIco) src = selectedIco;
        if (!selected && unselectedIco) src = unselectedIco;

        return src ?
            <span
                data-testid="bookmarks--ico"
                className="bookmarks--ico"
                style={{ backgroundImage: `url(${src})` }} /> :
            <span data-testid="bookmarks--ico" className="bookmarks--ico" />;
    };

    return (
        <button
            data-testid="bookmarks"
            type="button"
            onClick={onClick}
            className={selected ? 'bookmarks bookmarks_selected' : 'bookmarks'
            }
            tabIndex="0">
            <span className="bookmarks--ico-wrapper">
                {renderIcon()}
                <span className="bookmarks--title">{title}</span>
            </span>
            <span data-testid="bookmarks--item-badge" className="bookmarks--item-badge">{qty}</span>
        </button>
    );
};

export default Bookmarks;

Bookmarks.propTypes = {
    title: PropTypes.string,
    selectedIco: PropTypes.string,
    unselectedIco: PropTypes.string,
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    qty: PropTypes.number,
};

Bookmarks.defaultProps = {
    title: 'My favorites',
    selectedIco: '',
    unselectedIco: '',
    selected: false,
    qty: 0,
};
