import React, {
    useMemo,
    useCallback,
} from 'react';
import classNames from 'classnames';

import { Items } from '../Items';
import { Footer } from '../Footer';
import { selector } from './utils';
import { GroupType } from './types';
import { If } from '../../../Common';
import {
    defaultProps,
    clipWrapperItemsCount,
} from './constants';
import {
    template,
    stopPropagation,
} from '../../../Helpers/general';
import {
    useExpandable,
    useConfigSelector,
} from '../../../Helpers/hooks';


/**
 * Top filter
 *
 * @component
 * @example
 * const props= {
    name: String,
    id: String,
    items: Array,
    numItemsSelected: Number,
    onCheck: Function,
    onClearAll: Function,
    results: Number,
    clearFilterText: String,
 * }
 * return (
 *   <Group {...props}/>
 * )
 */
const Group = ({
    id,
    name,
    items,
    onCheck,
    results,
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
        totalResultTextTemplate,
    } = useConfigSelector(selector);

    const totalResultText = template(totalResultTextTemplate, { total: results });

    /**
     **** Hooks ****
     */

    /**
     * @typedef {String} openDropdownState -  Id of the top filter
     * @description — defined in the component props
     *
     * @typedef {Function} ToggleSetter - Handles toggling opened/closed state of
     * the top filter
     * @description
     *
     * @type {[String, Function]} openDropdown
     */
    const [openDropdown, handleToggle] = useExpandable(id);

    /**
     **** Constants ****
     */

    /**
     * Whether the top filter is opened
     * @type {Boolean}
     */
    const isOpened = openDropdown === id;

    /**
     * Whether at least one top filter option is selected
     * @type {Boolean}
     */
    const atleastOneItemSelected = numItemsSelected > 0;

    /**
     * Text of the top filter footer button:
     * whether the "Apply changes" text should be shown or "Done"
     * @type {String}
     */
    const mobileFooterBtnText =
        atleastOneItemSelected ? applyButtonText : doneButtonText;

    /**
     * Handles unselection of the top filter options
     * when the "Clear filter options" link is clicked
     * @param {ClickEvent} e
     * @listens ClickEvent
     */
    const handleClear = useCallback((event) => {
        event.stopPropagation();
        onClearAll(id);
    }, [id, onClearAll]);

    /**
     * Handles toggling the selected/unselected state of the top filter option
     * when the filter option is checked/unchecked
     * @param {ChangeEvent} e
     * @listens ChangeEvent
     */
    const handleCheck = useCallback((event) => {
        const { target: { value, checked } } = event;

        event.stopPropagation();

        onCheck(id, value, checked);
    }, [id, onCheck]);

    /**
     * Array of the top filter selected options
     * @type {Array}
     */
    const selectedFilters = useMemo(() => items.filter(item => item.selected), [items]);

    /**
     * Whether at least one top filter option is selected
     * @type {Boolean}
     */
    const atleastOneFilterSelected = selectedFilters.length > 0;

    /**
     * Text indicating the quantity of the selected top filter options
     * @type {String}
     */
    const selectedItemQtyText = selectedFilters.length > 0 ? `${selectedFilters.length}` : '';

    /**
     * Whether the top filter is opened
     * @type {Boolean}
     */
    const filterGroupOpened = isOpened;

    /**
     * Whether the top filter is closed
     * @type {Boolean}
     */
    const filterGroupNotOpened = !isOpened;

    /**
     * Whether the top filter options should be blurred at the bottom of the parent container
     * @type {Boolean}
     */
    const shouldClipFilters = items.length >= clipWrapperItemsCount;

    /**
     * Class name for the top filter:
     * whether the top filter is opened
     * whether the top filter contains at least one selected option
     * @type {String}
     */
    const containerClassname = classNames({
        'consonant-top-filter': true,
        'consonant-top-filter_opened': filterGroupOpened,
        'consonant-top-filter_selected': atleastOneFilterSelected && filterGroupNotOpened,
    });

    return (
        <div
            data-testid="filter-item"
            className={containerClassname}>
            <div
                className="consonant-top-filter--inner">
                <h3
                    className="consonant-top-filter--name">
                    <button
                        tabIndex="0"
                        type="button"
                        onClick={handleToggle}
                        data-testid="filter-group-btn"
                        className="consonant-top-filter--link">
                        {name}
                        <span
                            className="consonant-top-filter--selcted-items-qty">
                            {selectedItemQtyText}
                        </span>
                    </button>
                </h3>
                <div
                    className="consonant-top-filter--selcted-items">
                    <div
                        className="consonant-top-filter--absolute-wrapper">
                        <Items
                            items={items}
                            handleCheck={handleCheck}
                            stopPropagation={stopPropagation}
                            clipWrapperItemsCount={clipWrapperItemsCount} />
                        <If condition={Boolean(shouldClipFilters)}>
                            <aside
                                className="consonant-top-filter--bg" />
                        </If>
                        <Footer
                            handleClear={handleClear}
                            handleToggle={handleToggle}
                            clearFilterText={clearFilterText}
                            numItemsSelected={numItemsSelected}
                            mobileFooterBtnText={mobileFooterBtnText}
                            mobileGroupTotalResultsText={totalResultText} />
                    </div>
                </div>
            </div>
        </div>
    );
};

Group.propTypes = GroupType;
Group.defaultProps = defaultProps;

/* eslint-disable-next-line import/prefer-default-export */
export { Group };
