import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Button with the quantity of the selected filters
 * on the mobile and tablet breakpoints
 *
 * @component
 * @example
 * const props= {
    onMobileFiltersToggleClick: Function,
    mobileFilterBtnLabel: String,
    selectedFiltersQty: Number,
 * }
 * return (
 *   <Info {...props}/>
 * )
 */
const Info = (props) => {
    const {
        onMobileFiltersToggleClick,
        mobileFilterBtnLabel,
        selectedFiltersQty,
    } = props;

    /**
     **** Constants ****
     */

    /**
     * Whether at least one filter is selected
     * @type {Boolean}
     */
    const atleastOneSelectedFilter = selectedFiltersQty > 0;

    /**
     * Class name for the button:
     * whether the button should display quantity of the selected filters or not
     * @type {String}
     */
    const selectedFiltersQtyClassName = classNames({
        'consonant-filters-info--btn': true,
        'consonant-filters-info--btn_with-filters': atleastOneSelectedFilter,
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
                {atleastOneSelectedFilter &&
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

Info.propTypes = {
    mobileFilterBtnLabel: PropTypes.string,
    selectedFiltersQty: PropTypes.number,
    onMobileFiltersToggleClick: PropTypes.func.isRequired,
};

Info.defaultProps = {
    mobileFilterBtnLabel: '',
    selectedFiltersQty: 0,
};

export { Info };
