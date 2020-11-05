import React from 'react';
import classNames from 'classnames';

import { ItemsType } from './types';

/**
 * Options of the top filter
 *
 * @component
 * @example
 * const props= {
    items: Array,
    handleCheck: Function,
    stopPropagation: Function,
    clipWrapperItemsCount: Number,
 * }
 * return (
 *   <Items {...props}/>
 * )
 */
const Items = ({
    items,
    handleCheck,
    stopPropagation,
    clipWrapperItemsCount,
}) => {
    /**
     **** Constants ****
     */

    /**
     * Whether the top filter options should be blurred at the bottom of the parent container
     * @type {Boolean}
     */
    const shouldClipItems = items.length >= clipWrapperItemsCount;

    /**
     * Class name for the top filter options wrapper:
     * whether the top filter options should be blurred at the bottom of the parent container
     * @type {String}
     */
    const clipFilterItemsClass = classNames({
        'consonant-top-filter--items': true,
        'consonant-top-filter--items_clipped': shouldClipItems,
    });

    return (
        <ul
            data-testid="filter-group"
            className={clipFilterItemsClass}>
            {items.map(item => (
                <li
                    key={item.id}
                    data-testid="filter-group-item"
                    className="consonant-top-filter--items-item">
                    {/* eslint-disable-next-line max-len */}
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <label
                        htmlFor={item.id}
                        onClick={stopPropagation}
                        className="consonant-top-filter--items-item-label">
                        <input
                            id={item.id}
                            value={item.id}
                            type="checkbox"
                            onChange={handleCheck}
                            checked={item.selected}
                            data-testid="list-item-checkbox"
                            tabIndex="0" />
                        <span
                            className="consonant-top-filter--items-item-checkmark" />
                        <span
                            className="consonant-top-filter--items-item-name">
                            {item.label}
                        </span>
                    </label>
                </li>
            ))}
        </ul>
    );
};

Items.propTypes = ItemsType;

/* eslint-disable-next-line import/prefer-default-export */
export { Items };
