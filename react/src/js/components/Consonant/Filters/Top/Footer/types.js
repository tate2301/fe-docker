import {
    func,
    string,
    number,
} from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const FooterType = {
    clearFilterText: string,
    numItemsSelected: number,
    mobileFooterBtnText: string,
    handleClear: func.isRequired,
    handleToggle: func.isRequired,
    mobileGroupTotalResultsText: string,
};
