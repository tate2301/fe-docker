/* eslint-disable guard-for-in,no-restricted-syntax,no-plusplus,arrow-body-style,max-len */
import PropTypes from 'prop-types';
import shortid from 'shortid';
import React from 'react';
import Card from './Card';
import CardCollectionDAO from './DAO';
import store from '../store';

const REVERSE_PROXY_PORT = 9080;

const primaryTagGroups = [
    'create:types/how-tos',
    'create:types/challenges',
    'create:types/interviews',
    'create:types/jobs',
    'create:types/live-streams',
    'create:types/inspiration',
    'create:types/free-stuff',
];

export default class Collection extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoadMore = this.handleLoadMore.bind(this);

        window.store = store;

        store.subscribe(() => {
            // const state = store.getState();
            //
            // this.setState({
            //     shouldRender: !!state.personalizeReducer.tags
            //         .find(tag => tag === this.props.primaryTagId),
            //     activeFilters: state.personalizeReducer.tags
            //         .find((tag) => {
            //             // return tag === this.props.primaryTagId || !primaryTagGroups.includes(tag);
            //             return tag === this.props.primaryTagId;
            //         }),
            // });
        });

        const shouldRender = !!store.getState()
            .personalizeReducer.tags.find(tag => tag === this.props.primaryTagId);

        const activeFilters = store.getState()
            .personalizeReducer.tags.filter((tag) => {
                return tag === this.props.primaryTagId || !primaryTagGroups.includes(tag);
                // return tag === this.props.primaryTagId;
            });

        // activeFilters.push(this.props.primaryTagId);

        this.state = {
            cards: [],
            currentPage: 1,
            totalPages: 0,
            shouldRender,
            activeFilters,
        };
    }

    async componentWillMount() {
        const jsonData = await CardCollectionDAO.getJsonData({
            baseURL: `http://localhost:${REVERSE_PROXY_PORT}/content/www/us/en/create/`,
            pageName: this.props.pageName,
            sortBy: this.props.sortBy,
            pageNumber: 1,
            resultsPerPage: this.props.resultsPerPage,
            activeFilters: this.state.activeFilters,
        });

        const tagsRoot = jsonData.tags.create.tags;
        const { totalPages } = jsonData;
        const flatTags = {
            ...Object.entries(tagsRoot).map(pair => pair[1].tags),
        };
        this.setState({
            cards: jsonData.cards.map(card => ({
                ...card,
                id: shortid.generate(),
            })),
            flatTags,
            totalPages,
        });
    }

    getTag = (ids) => {
        const categories = Object.entries(this.state.flatTags);
        const matchingTags = [];
        for (const category in categories) {
            const tags = categories[category][1];
            for (const tag in tags) {
                const tagData = tags[tag];
                for (const someIdKey in ids) {
                    const id = ids[someIdKey];
                    if (tagData.id === id) {
                        matchingTags.push(tagData.title);
                    }
                }
            }
        }
        return matchingTags.length > 0 ? matchingTags.join(' / ') : '';
    };

    async handleLoadMore() {
        const nextPage = await CardCollectionDAO.getJsonData({
            baseURL: `http://localhost:${REVERSE_PROXY_PORT}/content/www/us/en/create/`,
            pageName: this.props.pageName,
            sortBy: this.props.sortBy,
            pageNumber: this.state.currentPage + 1,
            resultsPerPage: this.props.resultsPerPage,
            activeFilters: [this.state.activeFilters],
        });

        this.setState(prevState => ({
            currentPage: prevState.currentPage + 1,
            cards: [...this.state.cards, ...nextPage.cards.map(card => ({
                ...card,
                id: shortid.generate(),
            }))],
        }));
    }

    renderBody = () => (
        <div
            id={this.props.primaryTagId}
            className="create-card-collection__collection-wrapper"
            role="region">
            <div className="create-card-collection__title-wrapper">
                <h2 className="create-card-collection__title">{this.props.collectionHeader}</h2>
            </div>
            <div className="create-card-collection__create-cards">
                {this.state.cards.map(card => (
                    <Card
                        url={card.url}
                        key={card.id}
                        title={card.cardTitle}
                        backgroundImage={card.background}
                        categories={this.getTag(card.tags)} />
                ))}
                <div className="create-card-collection__create-card-placeholder" />
                <div className="create-card-collection__create-card-placeholder" />
            </div>
            <div className="create-card-collection__load-more-btn-wrapper">
                {this.state.currentPage < this.state.totalPages &&
                    <button
                        className="create-card-collection__load-more-btn"
                        type="button"
                        onClick={this.handleLoadMore}>
                        {this.props.loadMoreText}
                    </button>}
            </div>
        </div>);

    render() {
        return (
            this.state.shouldRender ? this.renderBody() : null
        );
    }
}

Collection.propTypes = {
    loadMoreText: PropTypes.string,
    collectionHeader: PropTypes.string,
    primaryTagId: PropTypes.string,
    resultsPerPage: PropTypes.number,
    sortBy: PropTypes.string,
    pageName: PropTypes.string,
};

Collection.defaultProps = {
    loadMoreText: '',
    collectionHeader: '',
    primaryTagId: '',
    resultsPerPage: 3,
    sortBy: 'name',
    pageName: '',
};
