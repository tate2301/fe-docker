import React, { Fragment } from 'react';
import ConsonantCardCollection from '../Consonant/Collection';
import ConsonantFiltersPanel from '../Consonant/FiltersPanel';
import ConsonantPagination from '../Consonant/Pagination';
import ConsonantHeader from '../Consonant/Header';

const ConsonantPage = () => (
    <Fragment>
        <ConsonantHeader />
        <section className="consonant-page">
            <div className="consonant-page--inner">
                <ConsonantFiltersPanel />
                <div>
                    <ConsonantCardCollection />
                    <ConsonantPagination />
                </div>
            </div>
        </section>
    </Fragment>
);

export default ConsonantPage;
