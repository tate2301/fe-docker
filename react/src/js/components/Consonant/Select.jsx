import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
    const {
        opened,
        val,
        values,
        onOpen,
        onSelect,
    } = props;

    return (
        <div className="consonant-select">
            <button
                type="button"
                className={opened ?
                    'consonant-select--btn consonant-select--btn_active' :
                    'consonant-select--btn'
                }
                onBlur={onOpen}
                onClick={onOpen}>{val.label || 'Please select'}
            </button>
            <div className="consonant-select--options">
                {values.map(item => (
                    <button
                        key={item.label}
                        type="button"
                        className={item.label === val.label ?
                            'consonant-select--option consonant-select--option_selected' :
                            'consonant-select--option'
                        }
                        onClick={() => { onSelect(item); }}>
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
    onOpen: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    values: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Select.defaultProps = {
    opened: false,
};
