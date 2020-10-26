import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { SelectedItem } from '../Desktop-Only/SelectedItem';


describe('Consonant/Left/Selected Filters', () => {
    test('If no filters are selected, filter count should not appear ', async () => {
        const props = {
            numItemsSelected: 0,
            handleClear: () => {},
        };

        render(<SelectedItem {...props} />);
        const itemBadge = screen.queryByTestId('item-badge');
        expect(itemBadge.innerHTML).toBe('');
    });
});
