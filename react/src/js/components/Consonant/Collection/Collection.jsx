import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import { useConfig } from '../Helpers/hooks';
import AspectRatio1to1Card from '../Cards/1-1';
import AspectRatio3to2Card from '../Cards/3-2';
import FullCard from '../Cards/Full';
import {
    DEFAULT_SHOW_ITEMS_PER_PAGE,
    CARD_STYLES,
} from '../Helpers/constants';

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
     * @type {Int}
     */
    const totalPages = resultsPerPage * pages;

    /**
     * The final cards to show in the collection
     * @type {Array}
     */
    let cardsToshow = cards;

    /**
     * Current page (used if paginator component is authored)
     * @type {Int}
     */
    const currentPage = resultsPerPage * (pages - 1);

    if (isPaginator) {
        cardsToshow = cards.slice(currentPage, totalPages);
    }

    /**
     * Current page (used if load more button is authored)
     * @type {Int}
     */
    if (isLoadMore) {
        cardsToshow = cards.slice(0, resultsPerPage * pages);
    }

    return cardsToshow.length > 0 && (
        <div
            data-testid="consonant-collection"
            className="consonant-card-collection">
            <div className="consonant-card-collection--inner">
                {cardsToshow.map((card) => {
                    const cardStyleOverride = get(card, 'styles.typeOverride');
                    const cardStyle = collectionStyleOverride || cardStyleOverride;
                    if (cardStyle === CARD_STYLES.FULL) {
                        return (
                            <FullCard
                                key={card.id}
                                {...card} />
                        );
                    } else if (cardStyle === CARD_STYLES.SQUARE) {
                        return (
                            <AspectRatio1to1Card
                                key={card.id}
                                {...card} />
                        );
                    }
                    return (
                        <AspectRatio3to2Card
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
