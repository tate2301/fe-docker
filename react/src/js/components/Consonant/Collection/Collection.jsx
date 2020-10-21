/*eslint-disable */
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
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
        resultsPerPage,
        pages,
        onCardBookmark,
        cards,
    } = props;

    const getConfig = useConfig();
    const cardsStyle = getConfig('collection', 'cardStyle');
    const dateFormat = getConfig('collection', 'i18n.prettyDateIntervalFormat');
    const locale = getConfig('language', '');
    const paginationType = getConfig('pagination', 'type');

    let shownCards;

    if (paginationType === 'paginator') {
        shownCards = cards.slice(resultsPerPage * (pages - 1), resultsPerPage * pages);
    }
    else {
        shownCards = cards.slice(0, resultsPerPage * pages);
    }

    return shownCards.length > 0 && (
        <div data-testid="consonant-collection" className="consonant-card-collection">
            {shownCards.map((card) => {
                const type = cardsStyle && cardsStyle.toLowerCase() !== 'none' ? cardsStyle : get(card, 'styles.typeOverride');

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
    resultsPerPage: PropTypes.number,
    pages: PropTypes.number,
    cards: PropTypes.arrayOf(PropTypes.object),
    onCardBookmark: PropTypes.func.isRequired,
};

Collection.defaultProps = {
    resultsPerPage: DEFAULT_SHOW_ITEMS_PER_PAGE,
    pages: 1,
    cards: [],
};
