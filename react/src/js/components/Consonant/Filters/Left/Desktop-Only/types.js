import {
    func,
    string,
    number,
} from 'prop-types';

export const ChosenFilterItemType = {
    id: string.isRequired,
    name: string.isRequired,
    onClick: func.isRequired,
    parentId: string.isRequired,
};

export const ClearButtonType = {
    clearAllFiltersText: string,
    onClearAllFilters: func.isRequired,
};

export const SelectedItemType = {
    numItemsSelected: number,
    handleClear: func.isRequired,
};

export const TitleType = {
    panelHeader: string,
};
