import React from 'react';
import renderer from 'react-test-renderer';

import Tooltip from '../../Consonant/Tooltip';

describe('Consonant/Tooltip', () => {
    describe('Check snapshots', () => {
        test('should renders correctly', () => {
            const tree = renderer
                .create(<Tooltip text="Tooltip text" />)
                .toJSON();

            expect(tree).toMatchSnapshot();
        });
    });
});
