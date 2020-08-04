import React, { Fragment } from 'react';
import ConsonantCardCollection from '../Consonant/Collection';
import ConsonantFiltersPanel from '../Consonant/FiltersPanel';
import ConsonantHeader from '../Consonant/Header';

const ConsonantPage = () => (
    <Fragment>
        <ConsonantHeader />
        <section className="consonant-page">
            <div className="consonant-page--inner">
                <ConsonantFiltersPanel />
                <div>
                    <ConsonantCardCollection
                        loadCards />
                </div>
            </div>
        </section>
    </Fragment>
);

export default ConsonantPage;
