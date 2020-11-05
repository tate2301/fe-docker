import React from 'react';

import Item from '../Item';
import { FilterListType } from './types';
import { getSelectedItemsCount } from '../../../Helpers/general';

const FilterList = ({
    filters, resQty, onFilterClick, onCheckboxClick, clearFilterText, onClearFilterItems,
}) => (
    <div className="consonant-left-filters--list">
        {filters.map(({
            id, icon, group, items, opened,
        }) => (
            <Item
                id={id}
                key={id}
                icon={icon}
                name={group}
                items={items}
                results={resQty}
                isOpened={opened}
                onClick={onFilterClick}
                onCheck={onCheckboxClick}
                onClearAll={onClearFilterItems}
                clearFilterText={clearFilterText}
                numItemsSelected={getSelectedItemsCount(items)} />
        ))}
    </div>
);

FilterList.propTypes = FilterListType;

export default FilterList;
