import React from 'react';
import PropTypes from 'prop-types';

const FilterItem = (props) => {
    const {
        name, id, items, isOpened, onCheck, onClick, onClearAll,
    } = props;
    const handleCheck = (evt) => {
        onCheck(id, evt.target.value);
    };
    const handleClick = () => {
        onClick(id);
    };
    const handleClear = () => {
        onClearAll(id);
    };
    const countFilters = () => items.reduce((acc, val) => (val.selected ? acc + 1 : acc), 0);
    const renderSelecedFilter = () => countFilters() > 0 && (
        <button
            type="button"
            className="consonant-filters--item-badge"
            onClick={handleClear}>
            {countFilters()}
        </button>
    );

    return (
        <div className={
            isOpened ? 'consonant-filters--item consonant-filters--item_opened' : 'consonant-filters--item'
        }>
            <div className="consonant-filters--item-inner">
                <h3 className="consonant-filters--item-name">
                    <a href="#" onClick={handleClick}>{name}</a>
                </h3>
                <div
                    className="consonant-filters--item-selcted-items"
                    data-qty={countFilters() > 0 ? `+${countFilters()}` : ''}>
                    {items.map((item, idx) => {
                        let res = '';

                        if (item.selected) {
                            res = idx === items.length - 1 ? item.name : `${item.name}, `;
                        }
                        return res;
                    })}
                </div>
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
                                <span className="consonant-filters--item-list-item-name">{item.name}</span>
                            </label>
                            <span className="consonant-filters--item-list-item-res">{item.results}</span>
                        </li>
                    ))}
                </ul>
                <div className="consonant-filters--item-list-mob-footer">
                    <span className="consonant-filters--item-list-mob-footer-total">430 Results</span>
                    <button
                        onClick={handleClick}
                        className="consonant-filters--item-list-mob-footer-btn">done
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
    onCheck: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onClearAll: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    isOpened: PropTypes.bool,
};

FilterItem.defaultProps = {
    isOpened: false,
};
