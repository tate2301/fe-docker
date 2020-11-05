import React, { useCallback } from 'react';
import classNames from 'classnames';

import { OptionType } from './types';

const defaultProps = {
    selectedValue: {},
};

/**
 * @component
 * @description Option component for popup dropdown
 * @param {Object} props
 * @param {Object} props.option - Current option's data.
 * @param {Object} props.selectedValue - Current selected value.
 * @param {Function} props.onClick - Click handler.
 */
const Option = ({
    option,
    onClick,
    selectedValue,
    option: { label },
}) => {
    /**
     * Handles choosing of a sort option
     *
     * @param {ClickEvent} event
     * @listens ClickEvent
     */
    const handleClick = useCallback((event) => {
        onClick(event, option);
    }, [onClick, option]);

    const className = classNames({
        'consonant-select--option': true,
        'consonant-select--option_selected': label === selectedValue.label,
    });

    return (
        <button
            key={label}
            tabIndex={0}
            type="button"
            onClick={handleClick}
            className={className}
            data-testid="select-option">
            {label}
        </button>
    );
};

Option.propTypes = OptionType;
Option.defaultProps = defaultProps;

export default Option;
