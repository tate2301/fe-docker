import React from 'react';
import PropTypes from 'prop-types';

const FilterItem = (props) => {
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
    const handleCheck = (evt) => {
        onCheck(id, evt.target.value, evt.target.checked);
    };
    const handleClick = (clickEvt) => {
        clickEvt.preventDefault();
        onClick(id);
    };
    const handleClear = () => {
        onClearAll(id);
    };
    const renderSelecedFilter = () => itemsSelected > 0 && (
        <button
            type="button"
            className="consonant-filters--item-badge"
            onClick={handleClear}>
            {itemsSelected}
        </button>
    );

    return (
        <div className={
            isOpened ? 'consonant-filters--item consonant-filters--item_opened' : 'consonant-filters--item'
        }>
            <div className="consonant-filters--item-inner">
                <h3 className="consonant-filters--item-name">
                    {icon &&
                    <img
                        src={icon}
                        width="16"
                        alt=""
                        loading="lazy" />
                    }
                    <a href="#" onClick={handleClick}>
                        {name}
                        <div
                            className="consonant-filters--item-selcted-items"
                            data-qty={itemsSelected > 0 ? `+${itemsSelected}` : ''}>
                            {items.map((item, idx) => {
                                let res = '';

                                if (item.selected) {
                                    res = idx === items.length - 1 ? item.label : `${item.label}, `;
                                }
                                return res;
                            })}
                        </div>
                    </a>
                </h3>
                {renderSelecedFilter()}
                <ul className="consonant-filters--item-list">
                    {items.map(item => (
                        <li
                            key={item.id}
                            className="consonant-filters--item-list-item">
                            <label>
                                <input
                                    value={item.id}
                                    type="checkbox"
                                    onChange={handleCheck}
                                    checked={item.selected} />
                                <span className="consonant-filters--item-list-item-checkmark" />
                                <span className="consonant-filters--item-list-item-name">{item.label}</span>
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="consonant-filters--mobile-footer">
                    <span className="consonant-filters--mobile-footer-total-res">{results} results</span>
                    {
                        itemsSelected > 0 &&
                        <button
                            type="button"
                            onClick={handleClear}
                            className="consonant-filters--mobile-footer-clear">{clearFilterText}
                        </button>
                    }
                    <button
                        type="button"
                        onClick={handleClick}
                        className="consonant-filters--mobile-footer-btn">
                        {itemsSelected > 0 ? 'Apply' : 'Done'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterItem;

FilterItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onCheck: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onClearAll: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    itemsSelected: PropTypes.number,
    isOpened: PropTypes.bool,
    results: PropTypes.number.isRequired,
    clearFilterText: PropTypes.string,
};

FilterItem.defaultProps = {
    isOpened: false,
    itemsSelected: 0,
    clearFilterText: 'Clear',
};
