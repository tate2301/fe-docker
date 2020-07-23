/* eslint-disable guard-for-in,no-restricted-syntax */
import PropTypes from 'prop-types';
import shortid from 'shortid';
import React from 'react';
import Card from './Card';
import DAO from './DAO';

const REVERSE_PROXY_PORT = 9080;

const defaultState = {
    cards: [],
    currentPage: 1,
    totalResults: 300,
    totalPages: 100,
};

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoadCards = this.handleLoadCards.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    state = {
        ...defaultState,
        searchQuery: '',
    };

    async componentWillMount() {
        const jsonData = await DAO.getJsonData({
            baseURL: `http://localhost:${REVERSE_PROXY_PORT}/content/www/us/en/create/search/`,
            pageName: this.props.pageName,
            sortBy: this.props.sortBy,
            pageNumber: 1,
            resultsPerPage: this.props.resultsPerPage,
            activeFilters: [],
            searchQuery: '',
        });

        const tagsRoot = jsonData.tags.create.tags;
        const { totalResults } = jsonData;
        const flatTags = {
            ...Object.entries(tagsRoot).map(pair => pair[1].tags),
        };
        this.setState({
            cards: jsonData.cards.map(card => ({
                ...card,
                id: shortid.generate(),
            })),
            flatTags,
            totalResults,
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

    handleKeyPress(pressEvt) {
        const keyCode = pressEvt.key;
        const searchQuery = pressEvt.target.value;

        if (keyCode !== 'Enter' ||
            searchQuery.toLowerCase() === this.state.searchQuery.toLowerCase()) return;

        this.setState({
            ...defaultState,
            searchQuery,
            currentPage: 0, // handleLoadCards will already increment count by 1
        }, () => { this.handleLoadCards(); });
    }

    async handleLoadCards() {
        const nextPage = await DAO.getJsonData({
            baseURL: `http://localhost:${REVERSE_PROXY_PORT}/content/www/us/en/create/search/`,
            pageName: this.props.pageName,
            sortBy: this.props.sortBy,
            pageNumber: this.state.currentPage + 1,
            resultsPerPage: this.props.resultsPerPage,
            activeFilters: [],
            searchQuery: this.state.searchQuery,
        });

        const { totalResults, totalPages, cards } = nextPage;

        this.setState(prevState => ({
            currentPage: prevState.currentPage + 1,
            totalResults,
            totalPages,
            cards: [...this.state.cards, ...cards.map(card => ({
                ...card,
                id: shortid.generate(),
            }))],
        }));
    }

    renderBody = () => (
        <div className="create-search">
            <div
                id={shortid.generate()}
                className="create-search__collection-wrapper"
                role="region">
                <div className="create-search__columns-wrapper">
                    <div className="create-search__left-col">
                        <div className="create-search__title-wrapper">
                            <h2 className="create-search__title">{this.props.searchResultsHeader}</h2>
                        </div>
                        <p className="create-search__subtitle">{this.state.totalResults} results</p>
                        <div className="create-search__input-wrapper">
                            <input
                                className="create-search__input"
                                type="search"
                                onKeyUp={this.handleKeyPress}
                                placeholder={this.props.searchPlaceholderText} />
                        </div>
                    </div>
                    <div className="create-search__right-col">
                        <a href={this.props.whatAreYouIntoLink} className="create-search__button">
                            <img className="create-search__button-img" src="./img/star.svg" width="26" alt="" />
                            <span className="create-search__button-text">{this.props.whatAreYouIntoButtonText}</span>
                        </a>
                    </div>
                </div>
                <div className="create-search__create-cards">
                    {this.state.cards.map(card => (
                        <Card
                            url={card.url}
                            key={card.id}
                            title={card.cardTitle}
                            backgroundImage={card.background}
                            categories={this.getTag(card.tags)} />
                    ))}
                    <div className="create-search__create-card-placeholder" />
                    <div className="create-search__create-card-placeholder" />
                </div>
                <div className="create-search__load-more-btn-wrapper">
                    {this.state.currentPage < this.state.totalPages &&
                        <button
                            className="create-search__load-more-btn"
                            type="button"
                            onClick={this.handleLoadCards}>
                            {this.props.loadMoreText}
                        </button>}
                </div>
            </div>
        </div>
    );

    render() {
        return (
            this.renderBody()
        );
    }
}

Search.propTypes = {
    loadMoreText: PropTypes.string,
    searchResultsHeader: PropTypes.string,
    resultsPerPage: PropTypes.number,
    sortBy: PropTypes.string,
    pageName: PropTypes.string,
    whatAreYouIntoLink: PropTypes.string,
    whatAreYouIntoButtonText: PropTypes.string,
    searchPlaceholderText: PropTypes.string,
};

Search.defaultProps = {
    loadMoreText: '',
    searchResultsHeader: '',
    resultsPerPage: 3,
    sortBy: 'name',
    pageName: '',
    whatAreYouIntoLink: '',
    whatAreYouIntoButtonText: '',
    searchPlaceholderText: '',
};
