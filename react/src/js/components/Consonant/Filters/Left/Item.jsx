import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { useConfig } from '../../Helpers/hooks';
import { GroupFooter } from './Mobile-Only/GroupFooter';
import { SelectedItem as DesktopSelectedItem } from './Desktop-Only/SelectedItem';
import { Items } from './Items';

const Item = ({
    name,
    icon,
    id,
    items,
    numItemsSelected,
    isOpened,
    onCheck,
    onClick,
    onClearAll,
    results,
    clearFilterText,
}) => {
    const getConfig = useConfig();
    const handleClick = (e) => {
        e.preventDefault();
        onClick(id);
    };

    const handleClear = () => onClearAll(id);

    const handleCheck = (evt) => {
        evt.stopPropagation();
        onCheck(id, evt.target.value, evt.target.checked);
    };

    const mobileGroupTotalResultsText =
        getConfig('filterPanel', 'i18n.leftPanel.mobile.group.totalResultsText').replace('{total}', results);

    const applyBtnText = getConfig('filterPanel', 'i18n.leftPanel.mobile.group.applyBtnText');
    const doneBtnText = getConfig('filterPanel', 'i18n.leftPanel.mobile.group.doneBtnText');
    const buttonText = numItemsSelected > 0 ? applyBtnText : doneBtnText;

    const leftFilterClassName = classNames({
        'consonant-left-filter': true,
        'consonant-left-filter_opened': isOpened,
    });

    const dataQtyTxt = numItemsSelected > 0 ? `+${numItemsSelected}` : '';
    const shouldRenderSelectedBadge = numItemsSelected > 0;
    const selectedFilters = items.filter(item => item.selected);
    const mobileTagsSelectedText = selectedFilters.map((item, index) => {
        const lastItem = index === items.length - 1;
        return (!lastItem ? `${item.label}, ` : item.label);
    });

    return (
        <div
            data-testid="filter-item"
            className={leftFilterClassName}>
            <div
                className="consonant-left-filter--inner">
                <h3
                    className="consonant-left-filter--name">
                    {icon &&
                    <img
                        src={icon}
                        width="16"
                        alt=""
                        loading="lazy" />
                    }
                    <button
                        type="button"
                        data-testid="filter-item-link"
                        className="consonant-left-filter--link"
                        onClick={handleClick}
                        tabIndex="0">
                        {name}
                        <div
                            className="consonant-left-filter--selected-items-qty"
                            data-qty={dataQtyTxt}>
                            {mobileTagsSelectedText}
                        </div>
                    </button>
                </h3>
                {
                    shouldRenderSelectedBadge &&
                    <DesktopSelectedItem
                        handleClear={handleClear}
                        numItemsSelected={numItemsSelected} />
                }
                {
                    <Items
                        items={items}
                        handleCheck={handleCheck} />
                }
                {
                    <GroupFooter
                        ctaText={buttonText}
                        handleClick={handleClick}
                        clearFilterText={clearFilterText}
                        handleClear={handleClear}
                        numItemsSelected={numItemsSelected}
                        mobileGroupTotalResultsText={mobileGroupTotalResultsText} />
                }
            </div>
        </div>
    );
};

export default Item;

Item.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onCheck: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onClearAll: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    numItemsSelected: PropTypes.number,
    isOpened: PropTypes.bool,
    results: PropTypes.number.isRequired,
    clearFilterText: PropTypes.string,
};

Item.defaultProps = {
    icon: '',
    isOpened: false,
    numItemsSelected: 0,
    clearFilterText: 'Clear',
};
