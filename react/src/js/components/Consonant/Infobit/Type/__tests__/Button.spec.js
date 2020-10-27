import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
    render,
    screen
} from '@testing-library/react';

import Button from '../Button';

describe('Consonant/Infobits/Type/Button', () => {
    test('Buttons should be able to render when the cta style is authored', async () => {
        render(<Button {...{ style: 'call-to-action' }} />);

        const buttonElement = screen.getByTestId('consonant-btn-infobit');

        expect(buttonElement).toHaveClass('consonant-btn-infobit_cta');
    });
    test('If no style is authored, render with the cta style', async () => {
        render(<Button {...{ style: '' }} />);

        const buttonElement = screen.getByTestId('consonant-btn-infobit');

        expect(buttonElement).not.toHaveClass('consonant-btn-infobit_cta');
    });
    test('If an icon src is authored, render ite', async () => {
        render(<Button {...{ iconSrc: 'some-icon.svg' }} />);
        expect(screen.queryByTestId('img-for-button-infobit')).not.toBeNull();
    });
});
