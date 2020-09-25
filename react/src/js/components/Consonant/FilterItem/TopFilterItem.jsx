import React from 'react';
import PropTypes from 'prop-types';
import FilterItems from './FilterItems';
import FilterFooter from './FilterFooter';

const TopFilterItem = (props) => {
    const {
        name,
        id,
        items,
        itemsSelected,
        isOpened,
        onCheck,
        onClick,
        onClearAll,
        results,
        clearFilterText,
    } = props;
    const handleClick = (clickEvt) => {
        clickEvt.preventDefault();
        onClick(id);
    };

    const defineClassNames = () => {
        const res = ['consonant-top-filter'];

        if (isOpened) res.push('consonant-top-filter_opened');
        if (items.filter(item => item.selected).length > 0) res.push('consonant-top-filter_selected');

        return res.join(' ');
    };

    return (
        <div className={defineClassNames()}>
            <div className="consonant-top-filter--inner">
                <h3 className="consonant-top-filter--name">
                    <a href="#" className="consonant-top-filter--link" onClick={handleClick}>
                        {name}
                        <div className="consonant-top-filter--selcted-items-qty">
                            {items.filter(item => item.selected).length > 0 &&
                            items.filter(item => item.selected).length}
                        </div>
                    </a>
                </h3>
                <div className="consonant-top-filter--selcted-items">
                    <div className="consonant-top-filter--absolute-wrapper">
                        <FilterItems id={id} items={items} onCheck={onCheck} />
                        <FilterFooter
                            id={id}
                            results={results}
                            itemsSelected={itemsSelected}
                            onClearAll={onClearAll}
                            clearFilterText={clearFilterText}
                            onClick={onClick} />
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
    onClick: PropTypes.func.isRequired,
    onClearAll: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    itemsSelected: PropTypes.number,
    isOpened: PropTypes.bool,
    results: PropTypes.number.isRequired,
    clearFilterText: PropTypes.string,
};

TopFilterItem.defaultProps = {
    isOpened: false,
    itemsSelected: 0,
    clearFilterText: 'Clear',
};
