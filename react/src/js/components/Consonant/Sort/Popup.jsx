import React from 'react';
import classNames from 'classnames';
import {
    shape,
    func,
    arrayOf,
    bool,
    string,
} from 'prop-types';

import { useExpandable } from '../Helpers/hooks';
import { sortOptionType } from '../types/config';

const popupType = {
    autoWidth: bool,
    id: string.isRequired,
    optionsAlignment: string,
    onSelect: func.isRequired,
    val: shape({
        label: string,
        sort: string,
    }).isRequired,
    values: arrayOf(shape(sortOptionType)).isRequired,
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
        'Select': true,
        'Select--autoWidth': autoWidth,
    });

    const openButtonClass = classNames({
        'Select-btn': true,
        'Select-btn.is-active': opened,
    });

    return (
        <div
            className={shouldAutoWidthSortClass}>
            <button
                data-testid="Select-btn"
                type="button"
                onClick={handleToggle}
                className={openButtonClass}
                tabIndex="0">
                {val.label}
            </button>
            { opened &&
                <div
                    data-testid="Select-options"
                    className={`Select-options Select-options--${optionsAlignment}`}>
                    {values.map(item => (
                        <button
                            data-testid="Select-option"
                            key={item.label}
                            type="button"
                            className={item.label === val.label ?
                                'Select-option is-selected' :
                                'Select-option'
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

Popup.propTypes = popupType;
Popup.defaultProps = defaultProps;

export default Popup;
