import React, {
    useMemo,
    useCallback,
} from 'react';
import classNames from 'classnames';

import { Items } from '../Items';
import { selector } from './utils';
import { ItemType } from './types';
import { If } from '../../../Common';
import { template } from '../../../Helpers/general';
import { GroupFooter } from '../Mobile-Only/GroupFooter';
import { useConfigSelector } from '../../../Helpers/hooks';
import { SelectedItem as DesktopSelectedItem } from '../Desktop-Only/SelectedItem';

const defaultProps = {
    icon: '',
    isOpened: false,
    numItemsSelected: 0,
    clearFilterText: '',
};

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
const Item = ({
    id,
    name,
    icon,
    items,
    onCheck,
    onClick,
    results,
    isOpened,
    onClearAll,
    clearFilterText,
    numItemsSelected,
}) => {
    /**
     **** Authored Configs ****
     */

    const {
        doneButtonText,
        applyButtonText,
        totalResultsTextTemplate,
    } = useConfigSelector(selector);

    const totalResultsText = template(totalResultsTextTemplate, { total: results });

    /**
     **** Constants ****
     */

    /**
     * Text of the left filter footer button on the mobile and tablet breakpoints:
     * whether the "Apply changes" text should be shown or "Done"
     * @type {String}
     */
    const buttonText = numItemsSelected > 0 ? doneButtonText : applyButtonText;

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
    const selectedFilters = useMemo(() => items.filter(({ selected }) => selected), [items]);

    /**
     * Array of the selected filters labels shown on mobile and tablet breakpoints
     * @type {Array}
     */
    const mobileTagsSelectedText = useMemo(() => selectedFilters.map(({ label }, index) => {
        const lastItem = index === selectedFilters.length - 1;

        return `${label}${lastItem ? '' : ', '}`;
    }), [selectedFilters]);

    /**
     * Handles toggling the opened/closed state of the left filter
     * when the filter is clicked
     * @param {ClickEvent} event
     * @listens ClickEvent
     */
    const handleClick = useCallback((event) => {
        event.preventDefault();

        onClick(id);
    }, [id, onClick]);

    /**
     * Handles unselection of the left filter options
     * when the "Clear filter options" button is clicked
     */
    const handleClear = useCallback(() => {
        onClearAll(id);
    }, [id, onClearAll]);

    /**
     * Handles toggling the selected/unselected state of the left filter option
     * when the filter option is checked/unchecked
     * @param {ChangeEvent} event
     * @listens ChangeEvent
     */
    const handleCheck = useCallback((event) => {
        const { target: { value, checked } } = event;

        event.stopPropagation();

        onCheck(id, value, checked);
    }, [id, onCheck]);

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
                    <If condition={Boolean(icon)}>
                        <img
                            alt=""
                            src={icon}
                            width="16"
                            loading="lazy" />
                    </If>
                    <button
                        tabIndex="0"
                        type="button"
                        onClick={handleClick}
                        data-testid="filter-item-link"
                        className="consonant-left-filter--link">
                        {name}
                        <div
                            data-qty={dataQtyTxt}
                            className="consonant-left-filter--selected-items-qty">
                            {mobileTagsSelectedText}
                        </div>
                    </button>
                </h3>
                <If condition={Boolean(shouldRenderSelectedBadge)}>
                    <DesktopSelectedItem
                        handleClear={handleClear}
                        numItemsSelected={numItemsSelected} />
                </If>
                <Items
                    items={items}
                    handleCheck={handleCheck} />
                <GroupFooter
                    ctaText={buttonText}
                    handleClick={handleClick}
                    handleClear={handleClear}
                    clearFilterText={clearFilterText}
                    numItemsSelected={numItemsSelected}
                    mobileGroupTotalResultsText={totalResultsText} />
            </div>
        </div>
    );
};

Item.propTypes = ItemType;
Item.defaultProps = defaultProps;

export default Item;
