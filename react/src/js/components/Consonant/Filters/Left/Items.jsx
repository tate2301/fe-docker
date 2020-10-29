import PropTypes from 'prop-types';
import React from 'react';

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
const Items = (props) => {
    const {
        items,
        handleCheck,
    } = props;

    return (
        <ul
            data-testid="filter-group"
            className="consonant-left-filter--items">
            {items.map(item => (
                <li
                    key={item.id}
                    data-testid="filter-group-item"
                    className="consonant-left-filter--items-item">
                    <label
                        htmlFor={item.id}
                        className="consonant-left-filter--items-item-label">
                        <input
                            data-testid="list-item-checkbox"
                            id={item.id}
                            value={item.id}
                            type="checkbox"
                            onChange={handleCheck}
                            checked={item.selected}
                            tabIndex="0" />
                        <span
                            className="consonant-left-filter--items-item-checkmark" />
                        <span
                            className="consonant-left-filter--items-item-name">
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
};

/* eslint-disable-next-line import/prefer-default-export */
export { Items };
