import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

import Link from '../Link';

const props = {
    href: '/some/valid/uri',
    openInNewTab: false,
    text: 'text',
};

describe('Consonant/Bookmarks', () => {
    test('should correct render', async () => {
        const tree = renderer
            .create(<Link {...props} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('should correct render with current tab', async () => {
        const tree = renderer
            .create(<Link {...props} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
