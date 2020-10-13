import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useExpandable } from '../../../../utils/hooks';

const clipWrapperItemsCount = 9;
const TopFilterItem = ({
    name,
    id,
    items,
    numItemsSelected,
    onCheck,
    onClearAll,
    results,
    clearFilterText,
}) => {
    const [openDropdown, handleToggle] = useExpandable(id);
    const isOpened = openDropdown === id;

    const stopPropagation = useCallback(e => e.stopPropagation(), []);

    const handleClear = useCallback((e) => {
        e.stopPropagation();
        onClearAll(id);
    }, [onClearAll, id]);

    const handleCheck = useCallback((e) => {
        e.stopPropagation();
        onCheck(id, e.target.value, e.target.checked);
    }, [onCheck, id]);

    const itemsComponent = (
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
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <label htmlFor={item.id} className="consonant-top-filter--items-item-label" onClick={stopPropagation}>
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
    const footerComponent = (
        <div className="consonant-top-filter--footer">
            <span className="consonant-top-filter--footer-res-qty">{results} results</span>
            {numItemsSelected > 0 &&
            <button
                data-testid="clear-btn"
                type="button"
                onClick={handleClear}
                className="consonant-top-filter--footer-clear-btn"
                tabIndex="0">{clearFilterText}
            </button>}
            <button
                type="button"
                onClick={handleToggle}
                className="consonant-top-filter--footer-btn"
                tabIndex="0">
                {numItemsSelected > 0 ? 'Apply' : 'Done'}
            </button>
        </div>
    );

    const containerClassnames = classNames('consonant-top-filter', {
        'consonant-top-filter_opened': isOpened,
        'consonant-top-filter_selected': items.filter(i => i.selected).length > 0 && !isOpened,
    });

    return (
        <div data-testid="filter-item" className={containerClassnames}>
            <div className="consonant-top-filter--inner">
                <h3 className="consonant-top-filter--name">
                    <button
                        type="button"
                        className="consonant-top-filter--link"
                        data-testid="filter-group-btn"
                        onClick={handleToggle}
                        tabIndex="0">
                        {name}
                        <span className="consonant-top-filter--selcted-items-qty">
                            {items.filter(item => item.selected).length || null}
                        </span>
                    </button>
                </h3>
                <div className="consonant-top-filter--selcted-items">
                    <div className="consonant-top-filter--absolute-wrapper">
                        {itemsComponent}
                        {items.length >= clipWrapperItemsCount && <aside className="consonant-top-filter--bg" />}
                        {footerComponent}
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
    onClearAll: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    numItemsSelected: PropTypes.number,
    results: PropTypes.number.isRequired,
    clearFilterText: PropTypes.string,
};

TopFilterItem.defaultProps = {
    numItemsSelected: 0,
    clearFilterText: 'Clear',
};
