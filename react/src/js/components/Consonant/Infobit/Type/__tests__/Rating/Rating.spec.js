import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

import Rating from '../../Rating/Rating';

describe('Consonant/Rating', () => {
    test('should correct render', async () => {
        const tree = renderer
            .create(<Rating />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('should correct render with totalStars', async () => {
        const tree = renderer
            .create(<Rating totalStars={10} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('should correct render with totalStars < 0', async () => {
        const tree = renderer
            .create(<Rating totalStars={-1} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
