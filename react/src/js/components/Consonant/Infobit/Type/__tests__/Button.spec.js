import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Button from '../Button';

describe('Consonant/Bookmarks', () => {
    test('should have cta classname', async () => {
        render(<Button {...{ style: 'call-to-action' }} />);

        const buttonElement = screen.getByTestId('consonant-btn-infobit');

        expect(buttonElement).toHaveClass('consonant-btn-infobit_cta');
    });
    test('shouldn`t have cta classname', async () => {
        render(<Button {...{ style: '' }} />);

        const buttonElement = screen.getByTestId('consonant-btn-infobit');

        expect(buttonElement).not.toHaveClass('consonant-btn-infobit_cta');
    });
});
