import React, { useCallback } from 'react';
import classNames from 'classnames';

import Option from './Option';
import { If } from '../Common';
import { PopupType } from './types';
import { useExpandable } from '../Helpers/hooks';

const defaultProps = {
    autoWidth: false,
    optionsAlignment: 'right',
};

/**
 * Sort popup
 *
 * @component
 * @example
 * const props= {
    val: Object,
    values: Array,
    onSelect: Function,
    autoWidth: Boolean,
    optionsAlignment: String,
    id: String,
 * }
 * return (
 *   <Select {...props}/>
 * )
 */
const Popup = ({
    id,
    val,
    values,
    onSelect,
    autoWidth,
    optionsAlignment,
}) => {
    /**
     * @typedef {String} OpenDropdownState - Id of a selected dropdown
     * @description — Passed in Context Provider So All Nested Components can be in sync
     *
     * @typedef {Function} Handles toggling popup
     * @description
     *
     * @type {[String, Function]} OpenDropdown
     */
    const [openDropdown, handleToggle] = useExpandable(id);

    /**
     * Handles whether the sort dropdown is visible or not
     * @type {Boolean}
     */
    const opened = openDropdown === id;

    /**
     * Handles choosing of a sort option
     *
     * @param {ClickEvent} event
     * @listens ClickEvent
     */
    const handleOptionClick = useCallback((event, item) => {
        onSelect(item);
        handleToggle(event);
    }, []);

    const shouldAutoWidthSortClass = classNames({
        'consonant-select': true,
        'consonant-select_auto-width': autoWidth,
    });

    const openButtonClass = classNames({
        'consonant-select--btn': true,
        'consonant-select--btn_active': opened,
    });

    return (
        <div
            className={shouldAutoWidthSortClass}>
            <button
                tabIndex="0"
                type="button"
                onClick={handleToggle}
                data-testid="select-button"
                className={openButtonClass}>
                {val.label}
            </button>
            <If condition={Boolean(opened)}>
                <div
                    data-testid="consonant-select--options"
                    className={`consonant-select--options consonant-select--options_${optionsAlignment}`}>
                    {values.map(option => (
                        <Option
                            option={option}
                            key={option.label}
                            selectedOption={val}
                            onClick={handleOptionClick} />
                    ))}
                </div>
            </If>
        </div>
    );
};

Popup.propTypes = PopupType;
Popup.defaultProps = defaultProps;

export default Popup;
