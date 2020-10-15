import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useExpandable } from '../../../utils/hooks';

const Select = ({
    val,
    values,
    onSelect,
    autoWidth,
    optionsAlignment,
    id,
}) => {
    const [openDropdown, handleToggle] = useExpandable(id);
    const opened = openDropdown === id;

    const handleOptionClick = useCallback((e, item) => {
        onSelect(item);
        handleToggle(e);
    }, [handleToggle, onSelect]);

    return (
        <div className={autoWidth ? 'consonant-select consonant-select_auto-width' : 'consonant-select'}>
            <button
                data-testid="select-button"
                type="button"
                onClick={handleToggle}
                className={opened ? 'consonant-select--btn consonant-select--btn_active' : 'consonant-select--btn'}
                tabIndex="0">
                {val.label || 'Please select'}
            </button>
            <div data-testid="consonant-select--options" className={`consonant-select--options consonant-select--options_${optionsAlignment}`}>
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
                        tabIndex={opened ? '0' : '-1'}>
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Select;

Select.propTypes = {
    val: PropTypes.shape({
        label: PropTypes.string,
        sort: PropTypes.string,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
    values: PropTypes.arrayOf(PropTypes.object).isRequired,
    autoWidth: PropTypes.bool,
    optionsAlignment: PropTypes.string,
    id: PropTypes.string.isRequired,
};

Select.defaultProps = {
    autoWidth: false,
    optionsAlignment: 'right',
};
