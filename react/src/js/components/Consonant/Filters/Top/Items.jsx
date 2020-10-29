import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
const Items = (props) => {
    const {
        items,
        handleCheck,
        stopPropagation,
        clipWrapperItemsCount,
    } = props;

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
                        className="consonant-top-filter--items-item-label"
                        onClick={stopPropagation}>
                        <input
                            data-testid="list-item-checkbox"
                            id={item.id}
                            value={item.id}
                            type="checkbox"
                            onChange={handleCheck}
                            checked={item.selected}
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

Items.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleCheck: PropTypes.func.isRequired,
    stopPropagation: PropTypes.func.isRequired,
    clipWrapperItemsCount: PropTypes.number.isRequired,
};

export default Items;
