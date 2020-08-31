import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
    const { val, values, onSelect } = props;

    return (
        <div className="consonant-select">
            <input
                type="text"
                value={val.label || 'Please select'}
                readOnly />
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
    val: PropTypes.shape({
        label: PropTypes.string,
        sort: PropTypes.string,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
    values: PropTypes.arrayOf(PropTypes.object).isRequired,
};
