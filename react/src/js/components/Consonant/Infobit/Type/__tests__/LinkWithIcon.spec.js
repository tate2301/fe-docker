import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

import LinkWithIcon from '../LinkWithIcon';

const props = {
    href: '/some/valid/uri',
    openInNewTab: false,
    src: '/some/valid/uri',
    stcAltText: 'text',
    text: 'text',
};

describe('Consonant/Bookmarks', () => {
    test('should correct render', async () => {
        const tree = renderer
            .create(<LinkWithIcon {...props} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('should correct render with icon', async () => {
        const tree = renderer
            .create(<LinkWithIcon {...props} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
