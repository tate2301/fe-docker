import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useConfig } from '../../../../utils/hooks';

const Item = ({
    name,
    icon,
    id,
    items,
    numItemsSelected,
    isOpened,
    onCheck,
    onClick,
    onClearAll,
    results,
    clearFilterText,
}) => {
    const getConfig = useConfig();
    const handleClick = useCallback((e) => {
        e.preventDefault();
        onClick(id);
    }, []);

    const handleClear = useCallback(() => onClearAll(id), []);

    const handleCheck = useCallback((evt) => {
        evt.stopPropagation();
        onCheck(id, evt.target.value, evt.target.checked);
    }, []);


    const selectedFilterComponent = numItemsSelected > 0 && (
        <button
            data-testid="item-badge"
            type="button"
            className="consonant-left-filter--item-badge"
            onClick={handleClear}
            tabIndex="0">
            {numItemsSelected > 0 ? numItemsSelected : null}
        </button>
    );

    const filterItemsComponent = (
        <ul
            data-testid="filter-group"
            className="consonant-left-filter--items">
            {items.map(item => (
                <li
                    key={item.id}
                    data-testid="filter-group-item"
                    className="consonant-left-filter--items-item">
                    <label htmlFor={item.id} className="consonant-left-filter--items-item-label">
                        <input
                            data-testid="list-item-checkbox"
                            id={item.id}
                            value={item.id}
                            type="checkbox"
                            onChange={handleCheck}
                            checked={item.selected}
                            tabIndex="0" />
                        <span className="consonant-left-filter--items-item-checkmark" />
                        <span className="consonant-left-filter--items-item-name">{item.label}</span>
                    </label>
                </li>
            ))}
        </ul>
    );
    const footerComponent = (
        <div className="consonant-left-filter--footer">
            <span className="consonant-left-filter--footer-res-qty">{getConfig('filterPanel', 'i18n.leftPanel.mobile.group.totalResultsText').replace('{total}', results)}</span>
            {numItemsSelected > 0 &&
            <button
                type="button"
                onClick={handleClear}
                className="consonant-left-filter--footer-clear-btn">{clearFilterText}
            </button>}
            <button
                type="button"
                onClick={handleClick}
                className="consonant-left-filter--footer-btn">
                {numItemsSelected > 0 ? getConfig('filterPanel', 'i18n.leftPanel.mobile.group.applyBtnText') : getConfig('filterPanel', 'i18n.leftPanel.mobile.group.doneBtnText')}
            </button>
        </div>
    );

    return (
        <div data-testid="filter-item" className={isOpened ? 'consonant-left-filter consonant-left-filter_opened' : 'consonant-left-filter'}>
            <div className="consonant-left-filter--inner">
                <h3 className="consonant-left-filter--name">
                    {icon &&
                    <img
                        src={icon}
                        width="16"
                        alt=""
                        loading="lazy" />
                    }
                    <button
                        type="button"
                        data-testid="filter-item-link"
                        className="consonant-left-filter--link"
                        onClick={handleClick}
                        tabIndex="0">
                        {name}
                        <div
                            className="consonant-left-filter--selected-items-qty"
                            data-qty={numItemsSelected > 0 ? `+${numItemsSelected}` : ''}>
                            {items.filter(i => i.selected).map((item, idx) =>
                                (idx === items.length - 1 ? item.label : `${item.label}, `))
                            }
                        </div>
                    </button>
                </h3>
                {selectedFilterComponent}
                {filterItemsComponent}
                {footerComponent}
            </div>
        </div>
    );
};

export default Item;

Item.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onCheck: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onClearAll: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    numItemsSelected: PropTypes.number,
    isOpened: PropTypes.bool,
    results: PropTypes.number.isRequired,
    clearFilterText: PropTypes.string,
};

Item.defaultProps = {
    icon: '',
    isOpened: false,
    numItemsSelected: 0,
    clearFilterText: 'Clear',
};
