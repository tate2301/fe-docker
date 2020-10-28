import '@testing-library/jest-dom/extend-expect';

import { noOp } from '../contexts';

describe('utils/contexts', () => {
    test('should return true ', () => {
        const value = noOp();
        expect(value).toBe(undefined);
    });
});
