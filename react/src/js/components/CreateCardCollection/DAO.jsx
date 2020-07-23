/* eslint-disable */
export default class DAO {
    constructor(){}

    static shuffle(array) {
        let currentIndex = array.length,
            temporaryValue,
            randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    /**
     * Get JSON data from the server with provided parameters
     *
     * @returns {Promise} Promise Object with server json data
     * @memberof CardCollectionDAO
     */
    static async getJsonData({ baseURL, pageName, sortBy, pageNumber = 1, resultsPerPage = 10, activeFilters = [] }) {
        /**
         * This is true solution
         * */

        let fetchStr = baseURL + `${pageName}.collection.json/sort-${sortBy}/`;
        if (activeFilters.length !== 0) {
            const filterStr = activeFilters.join('/');
            fetchStr += `${filterStr}/`;
        }
        fetchStr += `results-${resultsPerPage}.${pageNumber}.json`;
        console.log(fetchStr);
        const response = await fetch(fetchStr, { credentials: 'same-origin' });
        return response.json();

        /**
         * This is hack to get code working on windows machine
         * */
        // const cardCollectionMock = window.cardCollectionMock;
        // return cardCollectionMock;

    }
}