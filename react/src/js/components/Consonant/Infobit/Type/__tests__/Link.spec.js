import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
    render,
    screen
} from '@testing-library/react';

import Link from '../Link';

const props = {
    href: 'https://www.someTestUrl.com/',
    openInNewTab: false,
    linkHint: 'Some Link Hint',
    text: 'Click Here',
};

describe('Consonant/Infobits/Link', () => {
    test('Loads with default props', async () => {
        const propsToUse = props;
        const { getByText } = render(<Link {...propsToUse} />);

        const linkWithIcon = screen.getByTestId('link-infobit');
        expect(linkWithIcon).not.toBeNull();
        expect(linkWithIcon.target).toBe('_self');
        expect(getByText('Click Here').innerHTML).toContain('Click Here');

    });

    test('Can be authored to open in a new tab', async () => {
        const propsToUse = props;
        propsToUse.openInNewTab = true;
        render(<Link {...propsToUse} />);

        const linkWithIcon = screen.getByTestId('link-infobit');

        expect(linkWithIcon.target).toBe('_blank');
    });
});
