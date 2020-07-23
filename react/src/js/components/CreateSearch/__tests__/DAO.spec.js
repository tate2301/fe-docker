import 'isomorphic-fetch';
import DAO from '../DAO';


const mockResponse = (status, statusText, response) => new window.Response(response, {
    status,
    statusText,
    headers: {
        'Content-type': 'application/json',
    },
});

describe('DAO tests', () => {
    const defaultParams = {
        baseURL: 'https://www.example.com/',
        pageName: 'thePage',
        sortBy: 'size',
        pageNumber: 1,
        resultsPerPage: 10,
        activeFilters: [],
        searchQuery: 'myQuery',
    };

    beforeEach(() => {
        window.savedFetch = window.fetch;
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, '{}')));
    });

    afterEach(() => {
        window.fetch = window.savedFetch;
    });

    it('correctly uses the same origin credentials when getting data', () => {
        const params = {
            ...defaultParams,
        };

        DAO.getJsonData(params).catch((err) => {
            throw new Error(err);
        });

        expect(window.fetch).toBeCalledWith(expect.anything(), { credentials: 'same-origin' });
    });

    it('correctly formats the fetch string when all arguments are passed, and active filters is []', () => {
        const params = {
            ...defaultParams,
        };

        DAO.getJsonData(params).catch((err) => {
            throw new Error(err);
        });

        const correctFetchString = 'https://www.example.com/thePage.collection.json/sort-size/results-10.1.json?query=myQuery';
        expect(window.fetch).toBeCalledWith(correctFetchString, expect.anything());
    });

    it('correctly formats the fetch string when all arguments are passed, including active filters', () => {
        const params = {
            ...defaultParams,
            activeFilters: ['filterA', 'filterB'],
        };

        DAO.getJsonData(params).catch((err) => {
            throw new Error(err);
        });

        const correctFetchString = 'https://www.example.com/thePage.collection.json/sort-size/filterA/filterB/results-10.1.json?query=myQuery';
        expect(window.fetch).toBeCalledWith(correctFetchString, expect.anything());
    });

    it('correctly formats other parameters such as sortBy, pageNumber and resultsPerPage', () => {
        const params = {
            baseURL: 'https://www.example.com/',
            pageName: 'thePage',
            sortBy: 'size',
        };

        DAO.getJsonData(params).catch((err) => {
            throw new Error(err);
        });

        const correctFetchString = 'https://www.example.com/thePage.collection.json/sort-size/results-10.1.json?query=';
        expect(window.fetch).toBeCalledWith(correctFetchString, expect.anything());
    });

    it('does no thing when instantiated', () => {
        // Only exists to improve % funcs coverage, due to the empty constructor function.
        // Constructor function, along with this test, should be removed.
        const dao = new DAO();
        expect(dao.tests).toBe(undefined);
    });
});
