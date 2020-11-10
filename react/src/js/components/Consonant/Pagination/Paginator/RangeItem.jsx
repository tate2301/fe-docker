import React, { useCallback } from 'react';
import classNames from 'classnames';

import { RangeItemType } from '../types';

/**
 * @component
 * @description Range item for Paginator component
 * @param {Object} props
 * @param {Number} props.item - Current reange item.
 * @param {Number} props.currentPage - Current selected page.
 * @param {Function} props.onClick - Click handler.
 */
const RangeItem = ({
    item,
    onClick,
    currentPage,
}) => {
    const className = classNames({
        'consonant-pagination--item': true,
        'consonant-pagination--item_active': currentPage === item,
    });

    const handleClick = useCallback((event) => {
        onClick(event, item);
    }, [item, onClick]);

    return (
        <li
            className={className}>
            <button
                tabIndex="0"
                type="button"
                onClick={handleClick}
                data-testid="btn_page"
                className="consonant-pagination--item-btn">
                {item}
            </button>
        </li>
    );
};

RangeItem.propTypes = RangeItemType;

export default RangeItem;
