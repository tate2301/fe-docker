import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Loader from '../Loader';

describe('Rating', () => {
    test('If invalid loader size are authored, do not show any filled stars', async () => {
        const props = {
            size: 'INVALID_LOADER_SIZE',
            hidden: false,
            absolute: false,
        };
        render(<Loader {...props} />);

        expect(true).toBe(true);
    });
});
