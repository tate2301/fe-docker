import React from 'react';
import PropTypes from 'prop-types';

const clipWrapperItemsCount = 9;
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
        <ul
            data-testid="filter-group"
            className={items.length >= clipWrapperItemsCount ?
                'consonant-top-filter--items consonant-top-filter--items_clipped' :
                'consonant-top-filter--items'
            }>
            {items.map(item => (
                <li
                    key={item.id}
                    data-testid="filter-group-item"
                    className="consonant-top-filter--items-item">
                    <label htmlFor={item.id} className="consonant-top-filter--items-item-label">
                        <input
                            data-testid="list-item-checkbox"
                            id={item.id}
                            value={item.id}
                            type="checkbox"
                            onChange={handleCheck}
                            checked={item.selected}
                            tabIndex="0" />
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
                data-testid="clear-btn"
                type="button"
                onClick={handleClear}
                className="consonant-top-filter--footer-clear-btn">{clearFilterText}
            </button>}
            <button
                type="button"
                onClick={handleClick}
                className="consonant-top-filter--footer-btn"
                tabIndex="0">
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
        <div data-testid="filter-item" className={defineClassNames()}>
            <div className="consonant-top-filter--inner">
                <h3 className="consonant-top-filter--name">
                    <button
                        type="button"
                        className="consonant-top-filter--link"
                        data-testid="filter-item-link"
                        onClick={handleClick}
                        tabIndex="0">
                        {name}
                        <span className="consonant-top-filter--selcted-items-qty">
                            {items.filter(item => item.selected).length > 0 &&
                            items.filter(item => item.selected).length}
                        </span>
                    </button>
                </h3>
                <div className="consonant-top-filter--selcted-items">
                    <div className="consonant-top-filter--absolute-wrapper">
                        {renderItems()}
                        {items.length >= clipWrapperItemsCount && <aside className="consonant-top-filter--bg" />}
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
