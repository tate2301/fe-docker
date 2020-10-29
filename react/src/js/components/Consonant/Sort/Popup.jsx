import React from 'react';
import classNames from 'classnames';
import { shape, func, arrayOf, bool, string } from 'prop-types';

import { useExpandable } from '../Helpers/hooks';

import { TSortOption } from '../types/config';

const TPopup = {
    autoWidth: bool,
    id: string.isRequired,
    optionsAlignment: string,
    onSelect: func.isRequired,
    val: shape({
        label: string,
        sort: string,
    }).isRequired,
    values: arrayOf(shape(TSortOption)).isRequired,
};

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
    val,
    values,
    onSelect,
    autoWidth,
    optionsAlignment,
    id,
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
     * @param {ClickEvent} e
     * @listens ClickEvent
     */
    const handleOptionClick = (e, item) => {
        onSelect(item);
        handleToggle(e);
    };

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
                data-testid="select-button"
                type="button"
                onClick={handleToggle}
                className={openButtonClass}
                tabIndex="0">
                {val.label}
            </button>
            { opened &&
                <div
                    data-testid="consonant-select--options"
                    className={`consonant-select--options consonant-select--options_${optionsAlignment}`}>
                    {values.map(item => (
                        <button
                            data-testid="select-option"
                            key={item.label}
                            type="button"
                            className={item.label === val.label ?
                                'consonant-select--option consonant-select--option_selected' :
                                'consonant-select--option'
                            }
                            onClick={e => handleOptionClick(e, item)}
                            tabIndex={0}>
                            {item.label}
                        </button>
                    ))}
                </div>
            }
        </div>
    );
};

Popup.propTypes = TPopup;
Popup.defaultProps = defaultProps;

export default Popup;
