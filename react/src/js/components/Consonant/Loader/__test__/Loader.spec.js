import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Loader from '../Loader';
import { LOADER_SIZE } from '../../Helpers/constants';

describe('Consonant/Loader', () => {
    test('Loader renders correctly', async () => {
        const props = {
            size: LOADER_SIZE.BIG,
            hidden: false,
            absolute: false,
        };
        render(<Loader {...props} />);

        const loader = screen.queryByTestId('consonant-Loader');

        expect(loader).not.toBeNull()
    });
});
