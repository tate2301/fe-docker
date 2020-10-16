import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import mockconfig from '../../Helpers/Testing/Mocks/consonant.json';
import ContextProvider from '../../Helpers/Testing/Utils/ContextProvider';
import Group from '../Group';

const ProvidedComponent = props => (
    <ContextProvider context={mockconfig}>
        <Group {...props} />
    </ContextProvider>
);

const GROUPS = [
    { type: 'price', price: 'price', term: 'term' },
    { type: 'button' },
    { type: 'icon-with-text' },
    { type: 'link-with-icon', href: '/some/href/', text: 'text' },
    { type: 'text', text: 'text' },
    { type: 'icon', src: 'icon' },
    { type: 'link', href: '/some/href/', text: 'text' },
    { type: 'progress-bar' },
    {
        type: 'rating',
        label: 'label',
        totalStars: 5,
        startsFilled: 3,
    },
    {
        type: 'bookmark',
        cardId: '1',
        onClick: jest.fn,
        disableBookmarkIco: true,
    },
    {
        type: 'date-interval',
        startTime: '',
        endTime: '',
        locale: '',
        dateFormat: '{LLL} {dd} | {timeRange} {timeZone}',
    },
];

describe('Consonant/Bookmarks', () => {
    test('should correct render', async () => {
        const tree = renderer
            .create(<ProvidedComponent renderList={GROUPS} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('should correct render not array', async () => {
        const tree = renderer
            .create(<ProvidedComponent renderList={{ type: 'price', price: 'price', term: 'term' }} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
