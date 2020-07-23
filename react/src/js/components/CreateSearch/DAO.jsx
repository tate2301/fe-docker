/* eslint-disable */
export default class DAO {
    constructor(){}

    /**
     * Get JSON data from the server with provided parameters
     *
     * @returns {Promise} Promise Object with server json data
     * @memberof CardCollectionDAO
     */
    static async getJsonData({
                                 baseURL,
                                 pageName,
                                 sortBy,
                                 pageNumber = 1,
                                 resultsPerPage = 10,
                                 activeFilters = [],
                                 searchQuery = '' }) {
        /**
         * This is true solution
         * */

        let fetchStr = baseURL + `${pageName}.collection.json/sort-${sortBy}/`;
        if (activeFilters.length !== 0) {
            const filterStr = activeFilters.join('/');
            fetchStr += `${filterStr}/`;
        }
        fetchStr += `results-${resultsPerPage}.${pageNumber}.json`;
        fetchStr += `?query=${searchQuery}`;
        const response = await fetch(fetchStr, { credentials: 'same-origin' });
        return response.json();
    }
}