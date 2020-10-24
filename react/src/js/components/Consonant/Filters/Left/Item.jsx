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
    const ctaText = numItemsSelected > 0 ? applyBtnText : doneBtnText;

    const leftFilterClassName = classNames({
        'consonant-left-filter': true,
        'consonant-left-filter_opened': isOpened,
    });

    const dataQtyTxt = numItemsSelected > 0 ? `+${numItemsSelected}` : '';

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
                            {items.filter(i => i.selected).map((item, idx) =>
                                (idx === items.length - 1 ? item.label : `${item.label}, `))
                            }
                        </div>
                    </button>
                </h3>
                {
                    numItemsSelected > 0 &&
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
                        ctaText={ctaText}
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
