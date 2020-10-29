import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Items } from './Items';
import { GroupFooter } from './Mobile-Only/GroupFooter';
import { SelectedItem as DesktopSelectedItem } from './Desktop-Only/SelectedItem';

import { useConfig } from '../../Helpers/hooks';

/**
 * Left filter
 *
 * @component
 * @example
 * const props= {
    name: String,
    icon: String,
    id: String,
    items: Array,
    numItemsSelected: Number,
    isOpened: Boolean,
    onCheck: Function,
    onClick: Function,
    onClearAll: Function,
    results: Number,
    clearFilterText: String,
 * }
 * return (
 *   <Item {...props}/>
 * )
 */
const Item = (props) => {
    const {
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
    } = props;

    const getConfig = useConfig();

    /**
     **** Authored Configs ****
     */
    const mobileGroupTotalResultsText =
        getConfig('filterPanel', 'i18n.leftPanel.mobile.group.totalResultsText').replace('{total}', results);
    const applyBtnText = getConfig('filterPanel', 'i18n.leftPanel.mobile.group.applyBtnText');
    const doneBtnText = getConfig('filterPanel', 'i18n.leftPanel.mobile.group.doneBtnText');

    /**
     **** Constants ****
     */

    /**
     * Text of the left filter footer button on the mobile and tablet breakpoints:
     * whether the "Apply changes" text should be shown or "Done"
     * @type {String}
     */
    const buttonText = numItemsSelected > 0 ? applyBtnText : doneBtnText;

    /**
     * Text indicating the quantity of the selected left filter options
     * @type {String}
     */
    const dataQtyTxt = numItemsSelected > 0 ? `+${numItemsSelected}` : '';

    /**
     * Whether the left filter selected options badge should be shown on desktop breakpoint
     * @type {Boolean}
     */
    const shouldRenderSelectedBadge = numItemsSelected > 0;

    /**
     * Array of the left filter selected options
     * @type {Array}
     */
    const selectedFilters = items.filter(item => item.selected);

    /**
     * Array of the selected filters labels shown on mobile and tablet breakpoints
     * @type {Array}
     */
    const mobileTagsSelectedText = selectedFilters.map((item, index) => {
        const lastItem = index === selectedFilters.length - 1;
        return (!lastItem ? `${item.label}, ` : item.label);
    });

    /**
     * Handles toggling the opened/closed state of the left filter
     * when the filter is clicked
     * @param {ClickEvent} e
     * @listens ClickEvent
     */
    const handleClick = (e) => {
        e.preventDefault();
        onClick(id);
    };

    /**
     * Handles unselection of the left filter options
     * when the "Clear filter options" button is clicked
     * @param {ClickEvent} e
     * @listens ClickEvent
     */
    const handleClear = () => onClearAll(id);

    /**
     * Handles toggling the selected/unselected state of the left filter option
     * when the filter option is checked/unchecked
     * @param {ChangeEvent} e
     * @listens ChangeEvent
     */
    const handleCheck = (evt) => {
        evt.stopPropagation();
        onCheck(id, evt.target.value, evt.target.checked);
    };

    /**
     * Class name for the left filter:
     * whether the left filter is opened
     * @type {String}
     */
    const leftFilterClassName = classNames({
        'consonant-left-filter': true,
        'consonant-left-filter_opened': isOpened,
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

export default Item;
