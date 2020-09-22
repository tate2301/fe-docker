import React from 'react';
import renderer from 'react-test-renderer';

import Loader from '../../Consonant/Loader';

const PROPS = [
    { hidden: true },
    { size: '' },
    { size: 'medium' },
    { size: 'big' },
    { absolute: true, size: 'medium' },
    { absolute: true, size: 'big' },
];

describe('Consonant/Loader', () => {
    describe('Check snapshots', () => {
        test('should renders correctly', () => {
            PROPS.forEach((props) => {
                const tree = renderer
                    .create(<Loader {...props} />)
                    .toJSON();

                expect(tree).toMatchSnapshot();
            });
        });
    });
});
