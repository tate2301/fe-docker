import {
    func,
    bool,
    string,
    number,
} from 'prop-types';

export const TitleType = {
    onClick: func.isRequired,
    leftPanelMobileHeader: string,
};

export const PanelFooterType = {
    resQty: number,
    doneText: string,
    applyText: string,
    showTotalResults: bool,
    clearAllFiltersText: string,
    someFiltersAreSelected: bool,
    showTotalResultsText: string,
    onClearAllFilters: func.isRequired,
    onMobileFiltersToggleClick: func.isRequired,
};

export const GroupFooterType = {
    clearFilterText: string,
    numItemsSelected: number,
    handleClear: func.isRequired,
    mobileGroupTotalResultsText: string,
};

export const InfoType = {
    selectedFiltersQty: number,
    mobileFilterBtnLabel: string,
    onMobileFiltersToggleClick: func.isRequired,
};
