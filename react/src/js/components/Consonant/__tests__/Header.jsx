import React from 'react';
import renderer from 'react-test-renderer';

import Header from '../Header';

describe('Consonant/Header', () => {
    describe('Check snapshots', () => {
        test('should renders correctly', () => {
            const tree = renderer
                .create(<Header />)
                .toJSON();

            expect(tree).toMatchSnapshot();
        });
    });
});
