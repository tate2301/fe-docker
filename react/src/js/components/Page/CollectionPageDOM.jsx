import { DOMModel, DOMComponent } from 'react-dom-components';
import CollectionPage from './CollectionPage';

class CollectionPageModel extends DOMModel {
    constructor(element) {
        super(element);
        this.getAttribute('data-background-color', 'backgroundColor');
        this.getAttribute('data-by-text', 'byText');
        this.getAttribute('data-default-sort', 'defaultSort');
        this.getAttribute('data-first-page-text', 'firstPageText');
        this.getAttribute('data-last-page-text', 'lastPageText');
        this.getAttribute('data-name-sort-text', 'nameSortText');
        this.getAttribute('data-page-text', 'pageText');
        this.getAttribute('data-page-type', 'pageType');
        this.getAttribute('data-pagination-type', 'paginationType');
        this.getAttribute('data-popular-sort-text', 'popularSortText');
        this.getAttribute('data-prev-text', 'prevText');
        this.getAttribute('data-results-per-page', 'resultsPerPage');
        this.getAttribute('data-results-text', 'resultsText');
        this.getAttribute('data-next-text', 'nextText');
        this.getAttribute('data-no-results', 'noResultsText');
        this.getAttribute('data-sort-by-text', 'sortByText');
        this.getAttribute('data-show-more-text', 'showMoreText');
        this.getAttribute('data-show-more-label', 'showMoreLabel');
        this.getAttribute('data-show-more-type', 'showMoreType');
        this.getAttribute('data-show-more-position', 'showMorePosition');
        this.getAttribute('data-filters-root', 'filtersRoot');
        this.getAttribute('data-filters-text', 'filtersText');
        this.getAttribute('data-filters-close-text', 'filtersCloseText');
        this.getAttribute('data-clearfilters-text', 'clearText');
        this.getAttribute('data-enable-filter-panel', 'enableFilterPanel');
        this.getAttribute('data-new-results-loaded-text', 'newResultsLoadedText');
        this.getAttribute('id', 'id');
        this.getAttribute('data-sorting-options-text', 'sortingOptionsText');
        this.getAttribute('data-search-results-label', 'searchResultsLabel');
        this.getAttribute('data-search-filter-label', 'searchFiltersLabel');
        this.getAttribute('data-pagination-label', 'paginationLabel');
    }
}

export default class SearchPageDOM extends DOMComponent {
    constructor() {
        super();
        this.nodeName = 'collection-page-hook';
        this.model = CollectionPageModel;
        this.component = CollectionPage;
    }
}
