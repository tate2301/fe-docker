import {
    bool,
    func,
    string,
} from 'prop-types';

export const SearchType = {
    name: string,
    value: string,
    autofocus: bool,
    placeholderText: string,
    onSearch: func.isRequired,
};

export const SearchIconType = {
    onClick: func.isRequired,
};
