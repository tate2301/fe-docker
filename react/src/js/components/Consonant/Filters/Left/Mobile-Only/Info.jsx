import React from 'react';
import classNames from 'classnames';
import {
    func,
    string,
    number,
} from 'prop-types';

import { If } from '../../../Common';

const InfoType = {
    selectedFiltersQty: number,
    mobileFilterBtnLabel: string,
    onMobileFiltersToggleClick: func.isRequired,
};

const defaultProps = {
    selectedFiltersQty: 0,
    mobileFilterBtnLabel: '',
};

const Info = ({
    selectedFiltersQty,
    mobileFilterBtnLabel,
    onMobileFiltersToggleClick,
}) => {
    const atleastOneSelectedFilter = selectedFiltersQty > 0;
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
                onClick={onMobileFiltersToggleClick}
                className={selectedFiltersQtyClassName}>
                <span
                    className="consonant-filters-info--btn-ico" />
                <span
                    className="consonant-filters-info--btn-text">
                    {mobileFilterBtnLabel}
                </span>
                <If condition={Boolean(atleastOneSelectedFilter)}>
                    <span
                        data-testid="btn-selected"
                        className="consonant-filters-info--btn-selected">
                        {selectedFiltersQty}
                    </span>
                </If>
            </button>
        </div>
    );
};

Info.propTypes = InfoType;
Info.defaultProps = defaultProps;

/* eslint-disable-next-line import/prefer-default-export */
export { Info };
