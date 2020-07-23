/* eslint-disable */

const response = {
    "page": 1,
    "totalPages": 50,
    "totalResults": 150,
    "sort": "default",
    cards: [
        {
            "cardTitle": "Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis.",
            "appliesTo": "Lorem ipsum",
            "cardDescription": "Nisi ut aliquip ex ea commodo consequat.",
            "tags": [
                "create:skills/intermediate",
                "create:types/jobs"
            ],
            "primaryTagId": "create:skills/intermediate",
            "background": "https://via.placeholder.com/350",
            "url": "/content/www/us/en/create/595-pro-presets-bundle.html"
        },
        {
            "cardTitle": "Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis.",
            "appliesTo": "Lorem ipsum",
            "cardDescription": "Nisi ut aliquip ex ea commodo consequat.",
            "tags": [
                "create:skills/intermediate",
                "create:types/jobs"
            ],
            "primaryTagId": "create:skills/intermediate",
            "background": "https://via.placeholder.com/350",
            "url": "/content/www/us/en/create/595-pro-presets-bundle.html"
        },
        {
            "cardTitle": "Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis.",
            "appliesTo": "Lorem ipsum",
            "cardDescription": "Nisi ut aliquip ex ea commodo consequat.",
            "tags": [
                "create:skills/intermediate",
                "create:types/jobs"
            ],
            "primaryTagId": "create:skills/intermediate",
            "background": "https://via.placeholder.com/350",
            "url": "/content/www/us/en/create/595-pro-presets-bundle.html"
        }
    ],
    tags: {
        "create":{
            "title":"Create",
            "id":"create",
            "color":"#FF4136",
            "url":"",
            "tags":{
                "topics":{
                    "title":"Topics",
                    "id":"create:topics",
                    "url":"/content/www/us/en/cloud/topics.html",
                    "tags":{
                        "all-topics":{
                            "title":"All topics",
                            "id":"create:topics/all-topics",
                            "url":"/content/www/us/en/create/topics/all-topics.html",
                            "tags":{

                            }
                        },
                        "design":{
                            "title":"Design",
                            "id":"create:topics/design",
                            "url":"/content/www/us/en/create/topics/design.html",
                            "tags":{

                            }
                        },
                        "photography":{
                            "title":"Photography",
                            "id":"create:topics/photography",
                            "url":"/content/www/us/en/create/topics/photography.html",
                            "tags":{

                            }
                        },
                        "ui-and-ux":{
                            "title":"UI & UX",
                            "id":"create:topics/ui-and-ux",
                            "url":"/content/www/us/en/create/topics/ui-and-ux.html",
                            "tags":{

                            }
                        },
                        "video":{
                            "title":"Video",
                            "id":"create:topics/video",
                            "url":"/content/www/us/en/create/topics/video.html",
                            "tags":{

                            }
                        },
                        "illustration":{
                            "title":"Illustration",
                            "id":"create:topics/illustration",
                            "url":"/content/www/us/en/create/topics/illustration.html",
                            "tags":{

                            }
                        }
                    }
                },
                "types":{
                    "title":"Types",
                    "id":"create:types",
                    "url":"/content/www/us/en/cloud/types.html",
                    "tags":{
                        "all-types":{
                            "title":"All types",
                            "id":"create:types/all-types",
                            "url":"/content/www/us/en/create/types/all-types.html",
                            "tags":{

                            }
                        },
                        "how-tos":{
                            "title":"How-tos",
                            "id":"create:types/how-tos",
                            "url":"/content/www/us/en/cloud/types/how-tos.html",
                            "tags":{

                            }
                        },
                        "live-streams":{
                            "title":"Live streams",
                            "id":"create:types/live-streams",
                            "url":"/content/www/us/en/cloud/types/live-streams.html",
                            "tags":{

                            }
                        },
                        "challenges":{
                            "title":"Challenges",
                            "id":"create:types/challenges",
                            "url":"/content/www/us/en/cloud/types/perspectives.html",
                            "tags":{

                            }
                        },
                        "inspiration":{
                            "title":"Inspiration",
                            "id":"create:types/inspiration",
                            "url":"/content/www/us/en/cloud/types/inspiration.html",
                            "tags":{

                            }
                        },
                        "interviews":{
                            "title":"Interviews",
                            "id":"create:types/interviews",
                            "url":"/content/www/us/en/cloud/types/interviews.html",
                            "tags":{

                            }
                        },
                        "free-stuff":{
                            "title":"Free stuff",
                            "id":"create:types/free-stuff",
                            "url":"/content/www/us/en/cloud/types/free-stuff.html",
                            "tags":{

                            }
                        },
                        "jobs":{
                            "title":"Jobs",
                            "id":"create:types/jobs",
                            "url":"/content/www/us/en/cloud/types/jobs.html",
                            "tags":{

                            }
                        }
                    }
                },
                "skills":{
                    "title":"Skills",
                    "id":"create:skills",
                    "url":"/content/www/us/en/cloud/skills.html",
                    "tags":{
                        "all-skill-levels":{
                            "title":"All skill levels",
                            "id":"create:skills/all-skill-levels",
                            "url":"/content/www/us/en/create/skills/all-skill-levels.html",
                            "tags":{

                            }
                        },
                        "beginner":{
                            "title":"Beginner",
                            "id":"create:skills/beginner",
                            "url":"/content/www/us/en/cloud/skills/beginner.html",
                            "tags":{

                            }
                        },
                        "intermediate":{
                            "title":"Intermediate",
                            "id":"create:skills/intermediate",
                            "url":"/content/www/us/en/cloud/skills/intermediate.html",
                            "tags":{

                            }
                        },
                        "advanced":{
                            "title":"Advanced",
                            "id":"create:skills/advanced",
                            "url":"/content/www/us/en/cloud/skills/advanced.html",
                            "tags":{

                            }
                        }
                    }
                }
            }
        }
    },
};

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

        // let fetchStr = baseURL + `${pageName}.collection.json/sort-${sortBy}/`;
        // if (activeFilters.length !== 0) {
        //     const filterStr = activeFilters.join('/');
        //     fetchStr += `${filterStr}/`;
        // }
        // fetchStr += `results-${resultsPerPage}.${pageNumber}.json`;
        // console.log(fetchStr);
        //const response = await fetch(fetchStr, { credentials: 'same-origin' });
        return response;

        /**
         * This is hack to get code working on windows machine
         * */
        // const cardCollectionMock = window.cardCollectionMock;
        // return cardCollectionMock;

    }
}