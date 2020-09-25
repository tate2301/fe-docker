import React from 'react';
import PropTypes from 'prop-types';

const FilterItems = (props) => {
    const { id, items, onCheck } = props;
    const handleCheck = (evt) => {
        evt.stopPropagation();
        onCheck(id, evt.target.value, evt.target.checked);
    };

    return (
        <ul className="consonant-filter-items">
            {items.map(item => (
                <li
                    key={item.id}
                    className="consonant-filter-items--item">
                    <label className="consonant-filter-items--item-label">
                        <input
                            value={item.id}
                            type="checkbox"
                            onChange={handleCheck}
                            checked={item.selected} />
                        <span className="consonant-filter-items--item-checkmark" />
                        <span className="consonant-filter-items--item-name">{item.label}</span>
                    </label>
                </li>
            ))}
        </ul>
    );
};

export default FilterItems;

FilterItems.propTypes = {
    id: PropTypes.string.isRequired,
    onCheck: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
