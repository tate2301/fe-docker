import React from 'react';
import renderer from 'react-test-renderer';

import Header from '../../Consonant/Header';

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
