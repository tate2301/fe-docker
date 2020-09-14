import React from 'react';
import PropTypes from 'prop-types';

const Bookmarks = (props) => {
    const {
        selectedIco,
        unselectedIco,
        selected,
        onClick,
        qty,
    } = props;
    return (
        <button
            type="button"
            onClick={onClick}
            className={selected ? 'bookmarks bookmarks_selected' : 'bookmarks'
            }>
            <span className="bookmarks--ico-wrapper">
                {(selectedIco && unselectedIco) ?
                    <img
                        src={selected ? unselectedIco : selectedIco}
                        width="16"
                        alt=""
                        loading="lazy" /> :
                    <span className="bookmarks--ico" />
                }
                <span className="bookmarks--title">My favorites</span>
            </span>
            <span className="bookmarks--item-badge">{qty}</span>
        </button>
    );
};

export default Bookmarks;

Bookmarks.propTypes = {
    selectedIco: PropTypes.string,
    unselectedIco: PropTypes.string,
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    qty: PropTypes.number,
};

Bookmarks.defaultProps = {
    selectedIco: '',
    unselectedIco: '',
    selected: false,
    qty: 0,
};
