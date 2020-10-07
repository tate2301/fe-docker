import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
    const {
        opened,
        val,
        values,
        onSelect,
        // onOpen,
        autoWidth,
        optionsAlignment,
    } = props;

    return (
        <div className={
            autoWidth ?
                'consonant-select consonant-select_auto-width' :
                'consonant-select'
        }>
            <button
                data-testid="select-button"
                type="button"
                // onClick={onOpen}
                className={opened ?
                    'consonant-select--btn consonant-select--btn_active' :
                    'consonant-select--btn'
                }
                tabIndex="0">{val.label || 'Please select'}
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
                        onClick={() => { onSelect(item); }}
                        tabIndex="0">
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Select;

Select.propTypes = {
    opened: PropTypes.bool,
    val: PropTypes.shape({
        label: PropTypes.string,
        sort: PropTypes.string,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
    values: PropTypes.arrayOf(PropTypes.object).isRequired,
    autoWidth: PropTypes.bool,
    optionsAlignment: PropTypes.string,
    // onOpen: PropTypes.func.isRequired,
};

Select.defaultProps = {
    opened: false,
    autoWidth: false,
    optionsAlignment: 'right',
};
