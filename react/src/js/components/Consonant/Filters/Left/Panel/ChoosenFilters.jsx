import React from 'react';

import { If } from '../../../Common';
import { ChoosenFiltersType } from './types';
import ChosenFilter from '../Desktop-Only/ChosenItem';

const ChoosenFilters = ({ filters, onClick }) => (
    <div
        className="consonant-left-filters--chosen-filters">
        {filters.map(({ id: parentId, items }) => (
            items.map(({ id, label, selected }) => (
                <If key={id} condition={Boolean(selected)}>
                    <ChosenFilter
                        id={id}
                        name={label}
                        onClick={onClick}
                        parentId={parentId} />
                </If>
            ))
        ))}
    </div>
);

ChoosenFilters.propTypes = ChoosenFiltersType;

export default ChoosenFilters;
