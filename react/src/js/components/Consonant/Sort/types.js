import {
    func,
    bool,
    shape,
    string,
    arrayOf,
} from 'prop-types';

import { SortOptionType } from '../types/config';

const OptionItemType = {
    sort: string,
    label: string,
};

export const OptionType = {
    onClick: func.isRequired,
    selectedValue: shape(OptionItemType),
    option: shape(OptionItemType).isRequired,
};

export const PopupType = {
    autoWidth: bool,
    id: string.isRequired,
    optionsAlignment: string,
    onSelect: func.isRequired,
    val: shape(OptionItemType).isRequired,
    values: arrayOf(shape(SortOptionType)).isRequired,
};
