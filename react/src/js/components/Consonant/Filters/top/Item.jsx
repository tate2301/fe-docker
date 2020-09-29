import React from 'react';
import PropTypes from 'prop-types';

const TopFilterItem = (props) => {
    const {
        name,
        id,
        items,
        itemsSelected,
        isOpened,
        onCheck,
        onClick,
        onClearAll,
        results,
        clearFilterText,
    } = props;
    const handleClick = () => {
        onClick(id);
    };
    const handleClear = (clickEvt) => {
        clickEvt.stopPropagation();
        onClearAll(id);
    };
    const handleCheck = (evt) => {
        evt.stopPropagation();
        onCheck(id, evt.target.value, evt.target.checked);
    };
    const renderItems = () => (
        <ul className="consonant-top-filter--items">
            {items.map(item => (
                <li
                    key={item.id}
                    className="consonant-top-filter--items-item">
                    <label className="consonant-top-filter--items-item-label">
                        <input
                            value={item.id}
                            type="checkbox"
                            onChange={handleCheck}
                            checked={item.selected} />
                        <span className="consonant-top-filter--items-item-checkmark" />
                        <span className="consonant-top-filter--items-item-name">{item.label}</span>
                    </label>
                </li>
            ))}
        </ul>
    );
    const renderFooter = () => (
        <div className="consonant-top-filter--footer">
            <span className="consonant-top-filter--footer-res-qty">{results} results</span>
            {itemsSelected > 0 &&
            <button
                type="button"
                onClick={handleClear}
                className="consonant-top-filter--footer-clear-btn">{clearFilterText}
            </button>}
            <button
                type="button"
                onClick={handleClick}
                className="consonant-top-filter--footer-btn">
                {itemsSelected > 0 ? 'Apply' : 'Done'}
            </button>
        </div>
    );
    const defineClassNames = () => {
        const res = ['consonant-top-filter'];

        if (isOpened) res.push('consonant-top-filter_opened');
        if (items.filter(item => item.selected).length > 0 && !isOpened) res.push('consonant-top-filter_selected');

        return res.join(' ');
    };

    return (
        <div className={defineClassNames()}>
            <div className="consonant-top-filter--inner">
                <h3 className="consonant-top-filter--name">
                    <a href="#" className="consonant-top-filter--link" onClick={handleClick}>
                        {name}
                        <div className="consonant-top-filter--selcted-items-qty">
                            {items.filter(item => item.selected).length > 0 &&
                            items.filter(item => item.selected).length}
                        </div>
                    </a>
                </h3>
                <div className="consonant-top-filter--selcted-items">
                    <div className="consonant-top-filter--absolute-wrapper">
                        {renderItems()}
                        {renderFooter()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopFilterItem;

TopFilterItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onCheck: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onClearAll: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    itemsSelected: PropTypes.number,
    isOpened: PropTypes.bool,
    results: PropTypes.number.isRequired,
    clearFilterText: PropTypes.string,
};

TopFilterItem.defaultProps = {
    isOpened: false,
    itemsSelected: 0,
    clearFilterText: 'Clear',
};
