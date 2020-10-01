import React from 'react';
import PropTypes from 'prop-types';

const LeftFilterItem = (props) => {
    const {
        name,
        icon,
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
    const handleClick = (clickEvt) => {
        clickEvt.preventDefault();
        onClick(id);
    };
    const handleClear = () => {
        onClearAll(id);
    };
    const handleCheck = (evt) => {
        evt.stopPropagation();
        onCheck(id, evt.target.value, evt.target.checked);
    };
    const renderSelecedFilter = () => itemsSelected > 0 && (
        <button
            type="button"
            className="consonant-left-filter--item-badge"
            onClick={handleClear}>
            {itemsSelected}
        </button>
    );
    const renderItems = () => (
        <ul className="consonant-left-filter--items">
            {items.map(item => (
                <li
                    key={item.id}
                    className="consonant-left-filter--items-item">
                    <label htmlFor={item.id} className="consonant-left-filter--items-item-label">
                        <input
                            id={item.id}
                            value={item.id}
                            type="checkbox"
                            onChange={handleCheck}
                            checked={item.selected} />
                        <span className="consonant-left-filter--items-item-checkmark" />
                        <span className="consonant-left-filter--items-item-name">{item.label}</span>
                    </label>
                </li>
            ))}
        </ul>
    );
    const renderFooter = () => (
        <div className="consonant-left-filter--footer">
            <span className="consonant-left-filter--footer-res-qty">{results} results</span>
            {itemsSelected > 0 &&
            <button
                type="button"
                onClick={handleClear}
                className="consonant-left-filter--footer-clear-btn">{clearFilterText}
            </button>}
            <button
                type="button"
                onClick={handleClick}
                className="consonant-left-filter--footer-btn">
                {itemsSelected > 0 ? 'Apply' : 'Done'}
            </button>
        </div>
    );

    return (
        <div className={isOpened ? 'consonant-left-filter consonant-left-filter_opened' : 'consonant-left-filter'}>
            <div className="consonant-left-filter--inner">
                <h3 className="consonant-left-filter--name">
                    {icon &&
                    <img
                        src={icon}
                        width="16"
                        alt=""
                        loading="lazy" />
                    }
                    <a
                        href
                        className="consonant-left-filter--link"
                        onClick={handleClick}>
                        {name}
                        <div
                            className="consonant-left-filter--selected-items-qty"
                            data-qty={itemsSelected > 0 ? `+${itemsSelected}` : ''}>
                            {items.map((item, idx) => {
                                let res = '';

                                if (item.selected) {
                                    res = idx === items.length - 1 ? item.label : `${item.label}, `;
                                }
                                return res;
                            })
                            }
                        </div>
                    </a>
                </h3>
                {renderSelecedFilter()}
                {renderItems()}
                {renderFooter()}
            </div>
        </div>
    );
};

export default LeftFilterItem;

LeftFilterItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onCheck: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onClearAll: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    itemsSelected: PropTypes.number,
    isOpened: PropTypes.bool,
    results: PropTypes.number.isRequired,
    clearFilterText: PropTypes.string,
};

LeftFilterItem.defaultProps = {
    icon: '',
    isOpened: false,
    itemsSelected: 0,
    clearFilterText: 'Clear',
};
