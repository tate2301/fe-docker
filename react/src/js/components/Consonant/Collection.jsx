import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import LoadMore from '../Consonant/LoadMore';

const PARAMS = {
    LOAD_POSTS_URL: 'http://caas-publi-aa3c8qnjxs09-336471204.us-west-1.elb.amazonaws.com/api/v3/caas',
    SHOW_ITEMS_PER_STEP: 7,
};
let prevTimer;

export default class Collection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            initialScrollPos: 0,
            showItemsPerPage: PARAMS.SHOW_ITEMS_PER_STEP,
            pages: 1,
        };

        this.loadCards = this.loadCards.bind(this);
        this.getWrapperScrollPos = this.getWrapperScrollPos.bind(this);
        this.setInitialScrollPos = this.setInitialScrollPos.bind(this);
        this.handleInitialScrollPos = this.handleInitialScrollPos.bind(this);
        this.loadPosts = this.loadPosts.bind(this);
    }

    componentDidMount() {
        this.setInitialScrollPos();
        window.addEventListener('resize', this.handleInitialScrollPos);

        // Load cards on init;
        this.loadPosts().then((res) => {
            if (!res || !res.cards) return;

            this.setState(prevState => ({
                cards: [...prevState.cards, ...res.cards],
            }));
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleInitialScrollPos);
    }

    setInitialScrollPos() {
        this.setState({ initialScrollPos: Math.abs(this.getWrapperScrollPos()) });
    }

    getWrapperScrollPos() {
        return parseInt(this.cardsWrapper.getBoundingClientRect().top, 10);
    }

    async loadPosts() {
        const response = await fetch(PARAMS.LOAD_POSTS_URL);
        const json = await response.json();
        return json;
    }

    handleInitialScrollPos() {
        const awaitTime = 100;

        window.clearTimeout(prevTimer);
        prevTimer = window.setTimeout(() => {
            window.scrollTo(0, 0);
            this.setInitialScrollPos();
        }, awaitTime);
    }

    // Temporary, will be changed;
    loadCards() {
        const currentPos = this.getWrapperScrollPos();
        this.setState(prevState => ({
            pages: prevState.pages + 1,
        }), () => {
            window.scrollTo(0, Math.abs(currentPos) + this.state.initialScrollPos);
        });
    }

    render() {
        const { showItemsPerPage, pages } = this.state;
        let cards = [...this.state.cards];
        let cardsToShow = showItemsPerPage * pages;

        if (cardsToShow > cards.length) cardsToShow = cards.length;
        if (cards.length > cardsToShow) cards = cards.slice(0, cardsToShow);

        return (
            <Fragment>
                <div
                    className="consonant-card-collection"
                    ref={(collection) => { this.cardsWrapper = collection; }}>
                    {cards.map(card => <Card key={card.id} {...card} />)}
                    <div className="consonant-card consonant-card_placeholder" />
                    <div className="consonant-card consonant-card_placeholder" />
                </div>
                <LoadMore
                    onClick={this.loadCards}
                    shown={cardsToShow}
                    total={this.state.cards.length} />
            </Fragment>
        );
    }
}

Collection.propTypes = {
    loadCards: PropTypes.bool,
};

Collection.defaultProps = {
    loadCards: false,
};
