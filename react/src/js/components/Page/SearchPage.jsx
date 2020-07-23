import React, { Fragment } from 'react';
import GlobalNavigation from '../GlobalNavigation/GlobalNavigation';
import Search from '../CreateSearch/Search';

const SearchPage = () => (
    <Fragment>
        <GlobalNavigation />
        <Search
            whatAreYouIntoButtonText="What are you into?"
            whatAreYouIntoLink="https://www.google.com/link-to-somewhere"
            loadMoreText="Load more"
            sortBy="name"
            pageName="archive"
            resultsPerPage={3}
            searchPlaceholderText="design techniques"
            searchResultsHeader="Search results" />
    </Fragment>
);

export default SearchPage;
