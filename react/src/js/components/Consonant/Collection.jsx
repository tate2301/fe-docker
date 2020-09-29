import React from 'react';
import PropTypes from 'prop-types';
import AspectRatio3to2Card from './Cards/3-2';
import AspectRatio1to1Card from './Cards/1-1';
import FullCard from './Cards/Full';

const DEFAULT_SHOW_ITEMS_PER_PAGE = 8;
const CARD_STYLE = {
    WIDE: '3:2',
    SQUARE: '1:1',
    FULL: 'full-card',
};

const Collection = (props) => {
    const {
        showItemsPerPage,
        pages,
        allowBookmarking,
        onCardBookmark,
        cardSavedIco,
        cardUnsavedIco,
        saveBookmarkText,
        unsaveBookmarkText,
        cardsStyle,
    } = props;
    let cards = [...props.cards];
    let cardsToShow = showItemsPerPage * pages;

    if (cardsToShow > cards.length) cardsToShow = cards.length;
    if (cardsToShow && cards.length > cardsToShow) cards = cards.slice(0, cardsToShow);

    return (
        <div className="consonant-card-collection">
            {cards.map((card) => {
                const type = cardsStyle && cardsStyle.toLowerCase() !== 'none' ? cardsStyle : card.cardStyle;

                if (type === CARD_STYLE.FULL) {
                    return (<FullCard
                        key={card.id}
                        {...card} />);
                } else if (type === CARD_STYLE.SQUARE) {
                    return (<AspectRatio1to1Card
                        key={card.id}
                        {...card} />);
                }

                return (<AspectRatio3to2Card
                    key={card.id}
                    {...card}
                    onClick={onCardBookmark}
                    cardSavedIco={cardSavedIco}
                    cardUnsavedIco={cardUnsavedIco}
                    allowBookmarking={allowBookmarking}
                    saveBookmarkText={saveBookmarkText}
                    unsaveBookmarkText={unsaveBookmarkText} />);
            })}
            <div className="consonant-card-collection--placeholder" />
            <div className="consonant-card-collection--placeholder" />
        </div>
    );
};

export default Collection;

Collection.propTypes = {
    showItemsPerPage: PropTypes.number,
    pages: PropTypes.number,
    cards: PropTypes.arrayOf(PropTypes.object),
    allowBookmarking: PropTypes.bool.isRequired,
    onCardBookmark: PropTypes.func.isRequired,
    cardSavedIco: PropTypes.string.isRequired,
    cardUnsavedIco: PropTypes.string.isRequired,
    saveBookmarkText: PropTypes.string,
    unsaveBookmarkText: PropTypes.string,
    cardsStyle: PropTypes.string,
};

Collection.defaultProps = {
    showItemsPerPage: DEFAULT_SHOW_ITEMS_PER_PAGE,
    pages: 1,
    cards: [],
    saveBookmarkText: 'Save card',
    unsaveBookmarkText: 'Unsave card',
    cardsStyle: 'none',
};
