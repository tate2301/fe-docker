import {
    screen,
    waitFor,
    fireEvent,
    getByText,
    getByTestId,
    queryAllByTestId,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Container from '../Container';

import config from '../../Helpers/Testing/Mocks/consonant.json';
import cards from '../../Helpers/Testing/Mocks/cards.json';

import makeInit from '../../Helpers/Testing/Utils/Init';

// Different window sizes for different cases
const MOBILE_WIDTH = 384;
const DESKTOP_WIDTH = 1800;
const TABLET_MIN_WIDTH = 768;
const DESKTOP_MIN_WIDTH = 1200;

const init = makeInit(Container, config);

const { filterPanel: { filters }, collection: { endpoint } } = config;

const filteredCards = cards.filter(({ appliesTo }) => Boolean(appliesTo));

// Mock api to get card list
const handlers = [
    rest.get(endpoint, (req, res, ctx) => res(
        ctx.status(200),
        ctx.json({ cards }),
    )),
];

const server = setupServer(...handlers);

// Create more than 2 filter with different ids
const multipleFilters = [...filters, ...filters]
    .map((item, index) => ({ ...item, id: `${item}_${index}` }));

window.scrollTo = () => { };

describe('Consonant/FilterItem', () => {
    const originalError = console.error;
    beforeAll(() => {
        console.error = (...args) => {
            if (/Warning.*It looks like you're using the wrong/.test(args[0])) {
                return;
            }
            originalError.call(console, ...args);
        };
    });

    afterAll(() => {
        console.error = originalError;
    });

    beforeEach(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    test('should render with left filter', () => {
        // config.filterPanel.type === 'left'
        init();

        // search for FilterPanelTop in whole DOM tree
        const filtersTopElement = screen.queryByTestId('consonant-filters__top');

        // search for FilterPanelLeft FilterInfo in whole DOM tree
        const filtersLeftElement = screen.queryByTestId('consonant-filters__left');
        const filtersInfoElement = screen.queryByTestId('consonant-filters__info');

        expect(filtersTopElement).toBeNull();
        /**
         * filterPanel.type === 'left'
         * FilterPa not be exists
         * Collection component should be exists
         */
        expect(filtersLeftElement).not.toBeNull();
        expect(filtersInfoElement).not.toBeNull();
    });
    test('should render with top filter', () => {
        init({ filterPanel: { type: 'top' } });

        // search for FilterPanelTop in whole DOM tree
        const filtersTopElement = screen.queryByTestId('consonant-filters__top');

        // search for FilterPanelTop and FilterInfo in whole DOM tree
        const filtersLeftElement = screen.queryByTestId('consonant-filters__left');
        const filtersInfoElement = screen.queryByTestId('consonant-filters__info');

        expect(filtersTopElement).not.toBeNull();

        expect(filtersLeftElement).toBeNull();
        expect(filtersInfoElement).toBeNull();
    });
    test('should render card collection', async () => {
        init();

        expect(screen.queryByTestId('consonant-loader')).not.toBeNull();

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));
        /**
         * All cards was loaded
         * Loader component should not be exists
         * Collection component should be exists
         */
        expect(screen.queryByTestId('consonant-loader')).toBeNull();
        expect(screen.getByTestId('consonant-collection')).not.toBeNull();
    });
    test('should render limited count of card', async () => {
        init({ collection: { resultsPerPage: null } });

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));

        /**
         * If resultsPerPage didn't present - we should render all cards
         */
        expect(screen.queryAllByTestId('consonant-card')).toHaveLength(9);
    });
    test('should render 1 cards by default if resultsPerPage === 1', async () => {
        init({ collection: { resultsPerPage: 1 } });

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));

        expect(screen.queryAllByTestId('consonant-card')).toHaveLength(1);
    });
    test('should render all cards if limit > cards count', async () => {
        init({ collection: { totalCardLimit: 100, resultsPerPage: 100 } });

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));

        /**
         * if totalCardLimit > cards.length then we should render all cards
         */
        expect(screen.queryAllByTestId('consonant-card')).toHaveLength(18);
    });

    test('should render load more component', async () => {
        init({ pagination: { type: 'loadMore' } });

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));

        // find LoadMore in whole DOM tree
        const loadMoreElement = screen.queryByTestId('consonant-load-more');

        expect(loadMoreElement).not.toBeNull();
    });

    test('should render select with right alignment', async () => {
        global.innerWidth = DESKTOP_MIN_WIDTH;

        init({ filterPanel: { type: 'top' } });

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));

        const optionsList = screen.queryByTestId('consonant-select--options');

        expect(optionsList).toHaveClass('consonant-select--options_right');
    });

    test('should render select with left alignment', async () => {
        global.innerWidth = MOBILE_WIDTH;

        init({ filterPanel: { type: 'top' } });

        // Need wait for api response and state updating
        await waitFor(() => screen.getByTestId('consonant-collection'));

        const optionsList = screen.queryByTestId('consonant-select--options');

        expect(optionsList).toHaveClass('consonant-select--options_left');
    });
    test('shouldn`t render card collection', async () => {
        /**
         * Re-assign handlers to mocks api
         * Should return success response with empty cards array
         */
        server.use(rest
            .get(endpoint, (req, res, ctx) => res(
                ctx.status(200),
                ctx.json({ cards: [] }),
            )));

        init();

        await waitFor(() => screen.queryByTestId('consonant-collection'));

        // Collections shouldn't render if there aren't cards
        expect(screen.queryByTestId('consonant-collection')).toBeNull();
    });

    describe('Check snapshots', () => {
        test('should renders correctly with desktop width', () => {
            global.innerWidth = DESKTOP_WIDTH;
            const { tree } = init();

            expect(tree).toMatchSnapshot();
        });
        test('should renders correctly without featured cards', () => {
            const { tree } = init({ featuredCards: null });

            expect(tree).toMatchSnapshot();
        });
    });

    describe('Interaction with UI', () => {
        test('should show search input after click on search icon', async () => {
            global.innerWidth = TABLET_MIN_WIDTH;

            init({ filterPanel: { type: 'top' } });

            const iconElement = screen.getByText('Click to search');

            // SearchIco should be exists after mount
            expect(iconElement).not.toBeNull();
            // Search field should be exists after mount
            expect(screen.queryByTestId('filtersTopSearch')).toBeNull();

            fireEvent.click(iconElement);
            /**
             * After click SearchIco - Search field should be rendered
             * Need wait for it
             */
            await waitFor(() => screen.getByTestId('filtersTopSearch'));

            // SearchIco should exist after click on SearchIco
            expect(screen.queryByText('Click to search')).not.toBeNull();

            // Search field should be exists after click on SearchIco
            expect(screen.queryByTestId('filtersTopSearch')).not.toBeNull();
        });
        test('should show search icon on blur', async () => {
            global.innerWidth = TABLET_MIN_WIDTH;

            init({ filterPanel: { type: 'top' } });

            const iconElement = screen.getByText('Click to search');

            // SearchIco should be exists after mount
            expect(iconElement).not.toBeNull();
            // Search field should be exists after mount
            expect(screen.queryByTestId('filtersTopSearch')).toBeNull();

            fireEvent.click(iconElement);
            /**
             * After click SearchIco - Search field shoudl be rendered
             * Need wait for it
             */
            await waitFor(() => screen.getByTestId('filtersTopSearch'));

            // SearchIco should be exists after click on SearchIco
            expect(screen.queryByText('Click to search')).not.toBeNull();

            // Search field should be exists after click on SearchIco
            expect(screen.queryByTestId('filtersTopSearch')).not.toBeNull();

            // We should click on random element, e.g. Select field
            fireEvent.click(screen.getByTestId('select-button'));
            /**
             * After click on rendom element
             * SearchIco should be exists
             * Search field shoudn't be exists
             */
            expect(screen.queryByText('Click to search')).not.toBeNull();
            expect(screen.queryByTestId('filtersTopSearch')).toBeNull();
        });
        test('should show mobile filters', async () => {
            global.innerWidth = TABLET_MIN_WIDTH;

            init();

            const mobileFooterButton = screen.getByTestId('mobile-footer-btn');
            const filtersLeftElement = screen.getByTestId('consonant-filters__left');

            expect(filtersLeftElement).not.toHaveClass('consonant-left-filters_opened');

            fireEvent.click(mobileFooterButton);

            expect(filtersLeftElement).toHaveClass('consonant-left-filters_opened');
        });
        test('should check checkbox on left filter`s item click', async () => {
            init({ filterPanel: { filterLogic: 'xor' } });

            // Need wait for render all checkboxes
            await waitFor(() => screen.getAllByTestId('list-item-checkbox'));

            const filtersLeftElement = screen.getByTestId('consonant-filters__left');
            const [firstCheckbox] = queryAllByTestId(filtersLeftElement, 'list-item-checkbox');

            expect(firstCheckbox.checked).toBeFalsy();

            fireEvent.click(firstCheckbox);

            expect(firstCheckbox.checked).toBeTruthy();

            fireEvent.click(firstCheckbox);

            expect(firstCheckbox.checked).toBeFalsy();
        });
        test('should clear search', async () => {
            const {
                config: {
                    bookmarks: {
                        i18n: {
                            leftFilterPanel: {
                                filterTitle,
                            },
                        },
                    },
                },
            } = init({ filterPanelEnabled: true, filterPanel: { filterLogic: 'xor' } });

            await waitFor(() => screen.getByTestId('search-input'));

            const searchInput = screen.getByTestId('search-input');

            expect(searchInput.value).toEqual('');

            fireEvent.change(searchInput, { target: { value: 'Search string' } });

            expect(searchInput.value).toEqual('Search string');
        });
        test('should change search value', async () => {
            init({ filterPanel: { filterLogic: 'or' } });

            await waitFor(() => screen.getByTestId('search-input'));

            const searchInput = screen.getByTestId('search-input');

            expect(searchInput.value).toEqual('');

            fireEvent.change(searchInput, { target: { value: 'Search string' } });

            expect(searchInput.value).toEqual('Search string');
        });
        test('should change search value without sorting', async () => {
            init({ sort: null });

            await waitFor(() => screen.getByTestId('search-input'));

            const searchInput = screen.getByTestId('search-input');

            expect(searchInput.value).toEqual('');

            fireEvent.change(searchInput, { target: { value: 'Search string' } });

            expect(searchInput.value).toEqual('Search string');
        });
        test('should open select', async () => {
            init();

            await waitFor(() => screen.getByTestId('select-button'));
            const selectButton = screen.getByTestId('select-button');

            expect(selectButton).not.toHaveClass('consonant-select--btn_active');

            fireEvent.click(selectButton);
            expect(selectButton).toHaveClass('consonant-select--btn_active');
        });
        test('should change select value', async () => {
            const { config: { sort: { options, defaultSort } } } = init();

            // get labels by sort value
            const {
                dateDesc,
                featured,
                defaultLabel,
                dateAscEnding,
            } = options.reduce((accumulator, { sort, label }) => {
                if (defaultSort && sort === defaultSort) {
                    accumulator.defaultLabel = label;
                }
                switch (sort) {
                    case 'featured':
                        accumulator.featured = label;
                        break;
                    case 'dateAsc':
                        accumulator.dateAscEnding = label;
                        break;
                    case 'dateDesc':
                        accumulator.dateDesc = label;
                        break;
                    default:
                        break;
                }

                return accumulator;
            }, { defaultLabel: 'Please select' });

            // Need wait for api response and state updating
            await waitFor(() => screen.getByTestId('consonant-collection'));

            // get Select input
            const selectButton = screen.getByTestId('select-button');

            // get needed options
            const selectOptions = screen.getByTestId('consonant-select--options');

            const descOption = getByText(selectOptions, dateDesc);
            const featuredOption = getByText(selectOptions, featured);
            const dateAscEndingOption = getByText(selectOptions, dateAscEnding);

            // check if the defaultSort was selected
            expect(selectButton).toHaveTextContent(defaultLabel);

            /**
             * open Select
             * select featured option
             */
            fireEvent.click(selectButton);
            fireEvent.click(featuredOption);

            // check if the featured was selected
            expect(selectButton).toHaveTextContent(featured);

            // select dateAscEnding option
            fireEvent.click(dateAscEndingOption);

            // check if the dateAscEnding was selected
            expect(selectButton).toHaveTextContent(dateAscEnding);

            // again select the dateAscEnding option
            fireEvent.click(dateAscEndingOption);

            // check if the dateAscEnding still selected
            expect(selectButton).toHaveTextContent(dateAscEnding);

            // again select the desc option
            fireEvent.click(descOption);

            // check if the desc was selected
            expect(selectButton).toHaveTextContent(dateDesc);
        });
        test('shouldn`t set value if defaultSort didn`t present in sort.oprions', async () => {
            init({ sort: { defaultSort: 'notPresentSortOption' } });

            await waitFor(() => screen.getByTestId('consonant-collection'));

            const selectButton = screen.getByTestId('select-button');

            expect(selectButton).toHaveTextContent('Featured');
        });
        test('should change pagination range', async () => {
            init();

            await waitFor(() => screen.getByTestId('pagination--summary'));
            const paginationElement = screen.getByTestId('pagination--summary');

            const prevButton = screen.getByTestId('btn_prev');
            const nextButton = screen.getByTestId('btn_next');

            expect(paginationElement).toHaveTextContent('1 10');

            fireEvent.click(nextButton);

            if (filteredCards.length < 20) {
                expect(paginationElement).toHaveTextContent('11 18');
            } else {
                expect(paginationElement).toHaveTextContent('11 20');
            }

            fireEvent.click(prevButton);

            expect(paginationElement).toHaveTextContent('1 10');
        });
        test('should open only selected filter', async () => {
            init({ filterPanel: { type: 'top' } });

            await waitFor(() => screen.getAllByTestId('filter-item'));

            const [firstFilterItem, secondFilterItem] = screen.queryAllByTestId('filter-item');
            const [firstFilterLink, secondFilterLink] = screen.queryAllByTestId('filter-group-btn');

            fireEvent.click(firstFilterLink);

            expect(firstFilterItem).toHaveClass('consonant-top-filter_opened');

            fireEvent.click(secondFilterLink);

            expect(secondFilterItem).toHaveClass('consonant-top-filter_opened');
            expect(firstFilterItem).not.toHaveClass('consonant-top-filter_opened');
        });
        test('should open any selected filter', async () => {
            init();

            await waitFor(() => screen.getAllByTestId('filter-item'));

            const [firstFilterItem, secondFilterItem] = screen.queryAllByTestId('filter-item');
            const [firstFilterLink, secondFilterLink] = screen.queryAllByTestId('filter-item-link');

            fireEvent.click(firstFilterLink);

            expect(firstFilterItem).toHaveClass('consonant-left-filter_opened');

            fireEvent.click(secondFilterLink);

            expect(secondFilterItem).toHaveClass('consonant-left-filter_opened');
            expect(firstFilterItem).toHaveClass('consonant-left-filter_opened');
        });
        test('should toggle favourites', async () => {
            const {
                config: {
                    collection: { resultsPerPage },
                },
            } = init({ collection: { cardsStyle: '3:2' } });

            // Need wait for api response and state updating
            await waitFor(() => screen.getByTestId('consonant-collection'));

            // get first unbookmarkedButton from whole DOM tree
            const [bookmarkButton] = screen.queryAllByTestId('bookmark-button');

            // Cards isn't filtered by bookmarks
            expect(screen.queryAllByTestId('consonant-card')).toHaveLength(resultsPerPage);

            // get first unbookmarkedButton from whole DOM tree
            const [saveBookmarkButton] = screen.queryAllByTestId('bookmark-button');

            expect(saveBookmarkButton).toBeDefined();

            /**
             * bookmark first card(we get first bookmarkButton from DOM tree)
             * filter by bookmarks
             */
            fireEvent.click(saveBookmarkButton);
            fireEvent.click(bookmarkButton);

            // should render only bookmarked cards
            expect(screen.queryAllByTestId('consonant-card')).toHaveLength(10);

            // reset filter by bookmarks
            fireEvent.click(bookmarkButton);

            // should render card collection without bookmark filter
            expect(screen.queryAllByTestId('consonant-card')).toHaveLength(resultsPerPage);

            /**
             * If card is bookmarked
             * his bookmark button will change text from saveBookmarkButton to unsaveCardText
             * we should wait for this
             */
            await waitFor(() => screen.getByText('Unsave Card'));

            // get first bookmarkedButton from whole DOM tree
            const [unsaveBookmarkButton] = screen.queryAllByTestId('bookmark-button');

            expect(unsaveBookmarkButton).toBeDefined();

            /**
             * unbookmark first card(we get first bookmarkButton from DOM tree)
             * filter by bookmarks
             */
            fireEvent.click(unsaveBookmarkButton);
            fireEvent.click(bookmarkButton);

            // should render only bookmarked cards
            expect(screen.queryAllByTestId('consonant-card')).toHaveLength(10);

            // reset filter by bookmarks
            fireEvent.click(bookmarkButton);

            // should render card collection without bookmark filter
            expect(screen.queryAllByTestId('consonant-card')).toHaveLength(resultsPerPage);
        });
        // TODO: We need to revise the functionality of clearAllFilters
        // this should clear the filters, but apparently it doesn't touch them
        test('should clear all selected checkboxes', async () => {
            const { config: { filterPanel: { i18n: { topPanel: { clearAllFiltersText } } } } }
                = init({ filterPanel: { type: 'top' } });

            await waitFor(() => screen.getAllByTestId('filter-item'));

            const [firstFilter, secondFilter] = screen.queryAllByTestId('filter-item');

            const [firstFilterCheckbox] = queryAllByTestId(firstFilter, 'list-item-checkbox');
            const [secondFilterCheckbox] = queryAllByTestId(secondFilter, 'list-item-checkbox');

            fireEvent.click(firstFilterCheckbox);
            fireEvent.click(secondFilterCheckbox);

            expect(firstFilterCheckbox.checked).toBeTruthy();
            expect(secondFilterCheckbox.checked).toBeTruthy();

            const clearAllFiltersButton = screen.getByText(clearAllFiltersText);

            fireEvent.click(clearAllFiltersButton);

            expect(firstFilterCheckbox.checked).toBeFalsy();
            expect(secondFilterCheckbox.checked).toBeFalsy();
        });
        test('should clear all selected checkboxes only in the first filter', async () => {
            const {
                config: {
                    filterPanel: {
                        i18n: {
                            leftPanel: {
                                mobile: {
                                    panel: {
                                        clearFilterText,
                                    },
                                },
                            },
                        },
                    },
                },
            } = init({ filterPanel: { type: 'top', filterLogic: 'or' } });
            await waitFor(() => screen.getAllByTestId('filter-item'));

            const [firstFilter, secondFilter] = screen.queryAllByTestId('filter-item');

            const [firstFilterCheckbox] = queryAllByTestId(firstFilter, 'list-item-checkbox');
            const [secondFilterCheckbox] = queryAllByTestId(secondFilter, 'list-item-checkbox');

            fireEvent.click(firstFilterCheckbox);
            fireEvent.click(secondFilterCheckbox);

            expect(firstFilterCheckbox.checked).toBeTruthy();
            expect(secondFilterCheckbox.checked).toBeTruthy();

            await waitFor(() => getByText(firstFilter, clearFilterText));

            const firstFilterClearButton = getByText(firstFilter, clearFilterText);

            fireEvent.click(firstFilterClearButton);

            expect(firstFilterCheckbox.checked).toBeFalsy();
            expect(secondFilterCheckbox.checked).toBeTruthy();
        });
        test('should sort cards by search', async () => {
            init();

            await waitFor(() => screen.getByTestId('consonant-collection'));

            const searchInput = screen.getByTestId('search-input');

            fireEvent.change(searchInput, { target: { value: 'Some Title 5' } });

            await waitFor(() => screen.getByTestId('consonant-collection'));

            expect(screen.queryAllByTestId('consonant-card')).toHaveLength(1);
        });
        test('should search cards without filters', async () => {
            init({ sort: null, filterPanel: { type: 'top' } });

            await waitFor(() => screen.getAllByTestId('filter-item'));

            const [firstFilter] = screen.queryAllByTestId('filter-item');

            const [firstFilterCheckbox] = queryAllByTestId(firstFilter, 'list-item-checkbox');

            fireEvent.click(firstFilterCheckbox);

            expect(firstFilterCheckbox.checked).toBeTruthy();
            // expect(screen.queryAllByTestId('consonant-card')).toHaveLength(1);
        });
        test('should filter cards by filters and search', async () => {
            init();

            await waitFor(() => screen.getByTestId('consonant-collection'));

            const searchInput = screen.getByTestId('search-input');

            fireEvent.change(searchInput, { target: { value: 'Some Title 5' } });

            await waitFor(() => screen.getByTestId('consonant-collection'));

            expect(screen.queryAllByTestId('consonant-card')).toHaveLength(1);

            const [firstFilter] = screen.queryAllByTestId('filter-item');

            const [firstFilterCheckbox] = queryAllByTestId(firstFilter, 'list-item-checkbox');

            fireEvent.click(firstFilterCheckbox);

            expect(firstFilterCheckbox.checked).toBeTruthy();
            expect(screen.queryAllByTestId('consonant-card')).toHaveLength(0);
        });

        test('should filter cards withour sort select', async () => {
            init({ sort: { options: undefined }, filterPanel: { type: 'top' } });

            await waitFor(() => screen.getByTestId('consonant-collection'));

            const optionsList = screen.queryByTestId('consonant-select--options');

            expect(optionsList).toBeNull();
        });
        test('should toggle all filters', async () => {
            global.innerWidth = TABLET_MIN_WIDTH;

            const {
                config: {
                    filterPanel: {
                        i18n: {
                            topPanel: {
                                moreFiltersBtnText,
                            },
                        },
                    },
                },
            } = init({ filterPanel: { type: 'top', filters: multipleFilters } });

            await waitFor(() => screen.getByText(moreFiltersBtnText));

            screen.queryAllByTestId('consonant-filters__top__filters').forEach((element) => {
                expect(element).toHaveClass('consonant-top-filters--filters_truncated');
            });

            const showMoreButton = screen.getByText(moreFiltersBtnText);

            fireEvent.click(showMoreButton);

            screen.queryAllByTestId('consonant-filters__top__filters').forEach((element) => {
                expect(element).not.toHaveClass('consonant-top-filters--filters_truncated');
            });
        });

        test('should show more', async () => {
            const {
                config: {
                    featuredCards,
                    pagination: {
                        i18n: {
                            loadMore: {
                                btnText,
                            },
                        },
                    },
                    collection: {
                        resultsPerPage,
                    },
                },
            } = init({ pagination: { type: 'loadMore' } });

            const allCardsCount = cards.length + featuredCards.length;

            await waitFor(() => screen.getByTestId('consonant-collection'));

            const loadMoreElement = screen.queryByTestId('consonant-load-more');

            const loadMoreButton = getByText(loadMoreElement, btnText);
            const loadMoreText = getByTestId(loadMoreElement, 'consonant-load-more--text');

            expect(loadMoreText).toHaveTextContent(`${resultsPerPage} ${allCardsCount}`);

            fireEvent.click(loadMoreButton);

            expect(loadMoreText).toHaveTextContent(`${allCardsCount} ${allCardsCount}`);
        });

        test('should close filters on blur', async () => {
            global.innerWidth = DESKTOP_MIN_WIDTH;

            init({ filterPanel: { type: 'top' } });

            await waitFor(() => screen.getAllByTestId('filter-item'));

            const [firstFilterItem] = screen.queryAllByTestId('filter-item');

            const filterItemLink = getByTestId(firstFilterItem, 'filter-group-btn');

            fireEvent.click(filterItemLink);

            const selectButton = screen.getByTestId('select-button');
            fireEvent.click(selectButton);

            expect(firstFilterItem).not.toHaveClass('consonant-left-filters_opened');
        });
    });
});
