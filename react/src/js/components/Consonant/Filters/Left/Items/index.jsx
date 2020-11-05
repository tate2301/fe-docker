import React from 'react';

import { ItemsType } from './types';

/**
 * Options of the left filter item
 *
 * @component
 * @example
 * const props= {
    items: Array,
    handleCheck: Function,
 * }
 * return (
 *   <Items {...props}/>
 * )
 */
const Items = ({
    items,
    handleCheck,
}) => (
    <ul
        data-testid="filter-group"
        className="consonant-left-filter--items">
        {items.map(({ id, label, selected }) => (
            <li
                key={id}
                data-testid="filter-group-item"
                className="consonant-left-filter--items-item">
                <label
                    htmlFor={id}
                    className="consonant-left-filter--items-item-label">
                    <input
                        id={id}
                        value={id}
                        tabIndex="0"
                        type="checkbox"
                        checked={selected}
                        onChange={handleCheck}
                        data-testid="list-item-checkbox" />
                    <span
                        className="consonant-left-filter--items-item-checkmark" />
                    <span
                        className="consonant-left-filter--items-item-name">
                        {label}
                    </span>
                </label>
            </li>
        ))}
    </ul>
);

Items.propTypes = ItemsType;

/* eslint-disable-next-line import/prefer-default-export */
export { Items };
