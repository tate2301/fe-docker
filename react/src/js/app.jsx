import React from 'react';
import ReactDOM, { render } from 'react-dom';

import { DOMRegistry } from 'react-dom-components';
// import SearchPageDOM from "./components/Page/SearchPageDOM";
// import CollectionPageDOM from "./components/Page/CollectionPageDOM";
// import ConsonantPageDOM from './components/Page/ConsonantPageDOM';
import ConsonantWrapper from './components/Page/ConsonantWrapper';
import consonantPageRDC from './components/Page/ConsonantPageDOM';

// // const searchPage = new SearchPageDOM();
// const collectionPage = new CollectionPageDOM();
// const consonantPage = new ConsonantPageDOM();

const domRegistry = new DOMRegistry(React, render);
domRegistry.register({
    consonantPageRDC,
});


class WrapperCardCollectionComponent {
    constructor(config, element) {
        ReactDOM.render((
            <React.Fragment>
                <ConsonantWrapper config={config} />
            </React.Fragment>), element);
    }
}

window.WrapperCardCollectionComponent = WrapperCardCollectionComponent;

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
