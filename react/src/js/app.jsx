/* eslint-disable */
import "./polyfills";
import React from 'react';
import ReactDOM, { render } from 'react-dom';

import { DOMRegistry } from 'react-dom-components';
import { parseToPrimitive } from './components/Consonant/Helpers/general';
// import SearchPageDOM from "./components/Page/SearchPageDOM";
// import CollectionPageDOM from "./components/Page/CollectionPageDOM";
// import ConsonantPageDOM from './components/Page/ConsonantPageDOM';
import Container from './components/Consonant/Container/Container';
import consonantPageRDC from './components/Page/ConsonantPageDOM';

// // const searchPage = new SearchPageDOM();
// const collectionPage = new CollectionPageDOM();
// const consonantPage = new ConsonantPageDOM();

const domRegistry = new DOMRegistry(React, render);
domRegistry.register({
    consonantPageRDC,
});


class ConsonantCardCollection {
    constructor(config, element) {
        ReactDOM.render((
            <React.Fragment>
                <Container config={parseToPrimitive(config)} />
            </React.Fragment>), element);
    }
}

window.ConsonantCardCollection = ConsonantCardCollection;

const initReact = (element) => {
    domRegistry.init(element);
};

// Initialize React
initReact(document);

// Add to DXF Registry
window.dexter = {};
window.dexter.dxf = { apps: [] };
window.dexter.dxf.registerApp = (app) => {
    window.dexter.dxf.apps.push(app);
};

window.dexter.dxf.registerApp(initReact);

export default initReact;
