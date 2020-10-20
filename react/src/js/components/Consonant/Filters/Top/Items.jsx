import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Items = (props) => {
    const {
        items,
        handleCheck,
        stopPropagation,
        clipWrapperItemsCount,
    } = props;

    const clipFilterItemsClass = classNames({
        'consonant-top-filter--items': true,
        'consonant-top-filter--items_clipped': items.length >= clipWrapperItemsCount,
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

/* eslint-disable-next-line import/prefer-default-export */
export { Items };

Items.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleCheck: PropTypes.func.isRequired,
    stopPropagation: PropTypes.func.isRequired,
    clipWrapperItemsCount: PropTypes.number.isRequired,
};
