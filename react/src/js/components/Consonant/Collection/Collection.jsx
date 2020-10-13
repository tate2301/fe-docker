import PropTypes from 'prop-types';
import React from 'react';
import { isNullish } from '../../../utils/general';
import { useConfig } from '../../../utils/hooks';
import AspectRatio1to1Card from '../Cards/1-1';
import AspectRatio3to2Card from '../Cards/3-2';
import FullCard from '../Cards/Full';

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
        onCardBookmark,
    } = props;

    const getConfig = useConfig();
    const allowBookmarking = getConfig('bookmarks', 'leftFilterPanel.showBookmarksFilter');
    const cardsStyle = getConfig('collection', 'cardStyle');
    const dateFormat = getConfig('collection', 'i18n.prettyDateIntervalFormat');
    const locale = getConfig('language', 'current');
    let cards = [...props.cards];
    let cardsToShow = showItemsPerPage * pages;

    if (cardsToShow > cards.length) cardsToShow = cards.length;
    if (!isNullish(showItemsPerPage) && cards.length > cardsToShow) {
        cards = cards.slice(0, cardsToShow);
    }

    return cards.length > 0 && (
        <div data-testid="consonant-collection" className="consonant-card-collection">
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
                    allowBookmarking={allowBookmarking}
                    dateFormat={dateFormat}
                    locale={locale} />);
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
    onCardBookmark: PropTypes.func.isRequired,
};

Collection.defaultProps = {
    showItemsPerPage: DEFAULT_SHOW_ITEMS_PER_PAGE,
    pages: 1,
    cards: [],
};
