import React from 'react';
import classNames from 'classnames';
import {
    string,
    number,
    func,
} from 'prop-types';

const infoType = {
    selectedFiltersQty: number,
    mobileFilterBtnLabel: string,
    onMobileFiltersToggleClick: func.isRequired,
};

const defaultProps = {
    selectedFiltersQty: 0,
    mobileFilterBtnLabel: '',
};

/**
 * Button with the count of selected filters
 * for mobile and tablet breakpoints
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
const Info = ({
    selectedFiltersQty,
    mobileFilterBtnLabel,
    onMobileFiltersToggleClick,
}) => {
    const atleastOneSelectedFilter = selectedFiltersQty > 0;

    /**
     * Class name for the button:
     * whether the button should display the quantity of the selected filters or not
     * @type {String}
     */
    const selectedFiltersQtyClassName = classNames({
        'consonant-FiltersInfo-btn': true,
        'consonant-FiltersInfo-btn--withFilters': atleastOneSelectedFilter,
    });

    return (
        <div
            data-testid="btn-wrapper"
            className="consonant-FiltersInfo-btnWrapper">
            <button
                type="button"
                data-testid="info-btn"
                className={selectedFiltersQtyClassName}
                onClick={onMobileFiltersToggleClick}>
                <span
                    className="consonant-FiltersInfo-btnIco" />
                <span
                    className="consonant-FiltersInfo-btnText">
                    {mobileFilterBtnLabel}
                </span>
                {atleastOneSelectedFilter &&
                    <span
                        data-testid="btn-selected"
                        className="consonant-FiltersInfo-btnSelected">
                        {selectedFiltersQty}
                    </span>
                }
            </button>
        </div>
    );
};

Info.propTypes = infoType;
Info.defaultProps = defaultProps;

/* eslint-disable-next-line import/prefer-default-export */
export { Info };
