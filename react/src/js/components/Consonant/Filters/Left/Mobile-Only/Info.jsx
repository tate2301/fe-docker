import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Info = (props) => {
    const {
        onMobileFiltersToggleClick,
        mobileFilterBtnLabel,
        selectedFiltersQty,
    } = props;

    const selectedFiltersQtyClassName = classNames({
        'consonant-filters-info--btn': true,
        'consonant-filters-info--btn_with-filters': selectedFiltersQty > 0,
    });

    return (
        <div
            data-testid="btn-wrapper"
            className="consonant-filters-info--btn-wrapper">
            <button
                type="button"
                data-testid="info-btn"
                className={selectedFiltersQtyClassName}
                onClick={onMobileFiltersToggleClick}>
                <span
                    className="consonant-filters-info--btn-ico" />
                <span
                    className="consonant-filters-info--btn-text">
                    {mobileFilterBtnLabel}
                </span>
                {
                    selectedFiltersQty > 0 &&
                    <span
                        data-testid="btn-selected"
                        className="consonant-filters-info--btn-selected">
                        {selectedFiltersQty}
                    </span>
                }
            </button>
        </div>
    );
};

/* eslint-disable-next-line import/prefer-default-export */
export { Info };

Info.propTypes = {
    mobileFilterBtnLabel: PropTypes.string,
    selectedFiltersQty: PropTypes.number,
    onMobileFiltersToggleClick: PropTypes.func.isRequired,
};

Info.defaultProps = {
    mobileFilterBtnLabel: '',
    selectedFiltersQty: 0,
};
