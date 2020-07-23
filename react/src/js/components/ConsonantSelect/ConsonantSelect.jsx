import React from 'react';
import PropTypes from 'prop-types';

const ConsonantSelect = (props) => {
    const { val, values, onSelect } = props;

    const handleSelect = (evt) => {
        onSelect(evt.target.innerText);
    };

    const checkValuesAreSame = value => value.toLowerCase() === val.toLowerCase();

    return (
        <div className="consonant-select">
            <input
                type="text"
                value={val || 'Please select'}
                readOnly />
            <div className="consonant-select--options">
                {values.map(item => (
                    <button
                        key={item}
                        type="button"
                        className={checkValuesAreSame(item) ?
                            'consonant-select--option consonant-select--option_selected' :
                            'consonant-select--option'
                        }
                        onClick={handleSelect}>
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ConsonantSelect;

ConsonantSelect.propTypes = {
    val: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
};
