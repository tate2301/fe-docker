import React from 'react';
import get from 'lodash/get';
import {
    number,
    arrayOf,
    shape,
    func,
} from 'prop-types';

import FullCard from '../Cards/Full';
import { CardType } from '../types/card';
import { useConfig } from '../Helpers/hooks';
import AspectRatio1to1Card from '../Cards/1-1';
import AspectRatio3to2Card from '../Cards/3-2';
import {
    CARD_STYLES,
    DEFAULT_SHOW_ITEMS_PER_PAGE,
} from '../Helpers/constants';


const CollectionType = {
    pages: number,
    resultsPerPage: number,
    cards: arrayOf(shape(CardType)),
    onCardBookmark: func.isRequired,
};

const defaultProps = {
    pages: 1,
    cards: [],
    resultsPerPage: DEFAULT_SHOW_ITEMS_PER_PAGE,
};

/**
 * Contains a collection of cards (of different styles)
 *
 * @component
 * @example
 * const props= {
    resultPerPage: Int,
    pages: Int,
    onCardBookmark: Boolean,
    cards: [],
 * }
 * return (
 *   <Collection {...props}/>
 * )
 */
const Collection = (props) => {
    const {
        resultsPerPage,
        pages,
        onCardBookmark,
        cards,
    } = props;

    /**
     **** Authored Configs ****
     */
    const getConfig = useConfig();
    const collectionStyleOverride = getConfig('collection', 'cardStyle');
    const dateFormat = getConfig('collection', 'i18n.prettyDateIntervalFormat');
    const locale = getConfig('language', '');
    const paginationType = getConfig('pagination', 'type');

    /**
     * Whether the paginator component is being used
     * @type {Boolean}
     */
    const isPaginator = paginationType === 'paginator';
    const isLoadMore = paginationType === 'loadMore';

    /**
     * Total pages to show (used if paginator component is set)
     * @type {Number}
     */
    const totalPages = resultsPerPage * pages;

    /**
     * The final cards to show in the collection
     * @type {Array}
     */
    let cardsToshow = cards;

    /**
     * Current page (used if paginator component is authored)
     * @type {Number}
     */
    const currentPage = resultsPerPage * (pages - 1);

    if (isPaginator) {
        cardsToshow = cards.slice(currentPage, totalPages);
    }

    /**
     * Current page (used if load more button is authored)
     * @type {Number}
     */
    if (isLoadMore) {
        cardsToshow = cards.slice(0, resultsPerPage * pages);
    }

    return cardsToshow.length > 0 && (
        <div
            data-testid="consonant-collection"
            className="consonant-card-collection">
            <div className="consonant-card-collection--inner">
                {cardsToshow.map((card, index) => {
                    const cardStyleOverride = get(card, 'styles.typeOverride');
                    const cardStyle = collectionStyleOverride || cardStyleOverride;
                    if (cardStyle === CARD_STYLES.FULL) {
                        return (
                            <FullCard
                                lh={`Card ${index} | ${card.contentArea.title}`}
                                key={card.id}
                                {...card} />
                        );
                    } else if (cardStyle === CARD_STYLES.SQUARE) {
                        return (
                            <AspectRatio1to1Card
                                lh={`Card ${index} | ${card.contentArea.title}`}
                                key={card.id}
                                {...card} />
                        );
                    }
                    return (
                        <AspectRatio3to2Card
                            lh={`Card ${index} | ${card.contentArea.title}`}
                            key={card.id}
                            {...card}
                            onClick={onCardBookmark}
                            dateFormat={dateFormat}
                            locale={locale} />
                    );
                })}
                <div className="consonant-card-collection--placeholder" />
                <div className="consonant-card-collection--placeholder" />
            </div>
        </div>
    );
};

Collection.propTypes = CollectionType;
Collection.defaultProps = defaultProps;

export default Collection;

