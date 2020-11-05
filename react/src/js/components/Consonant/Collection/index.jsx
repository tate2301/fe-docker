import React, { useMemo } from 'react';

import { If } from '../Common';
import { CollectionType } from './types';
import { defaultProps } from './constants';
import { CARD_STYLES } from '../Helpers/constants';
import { useConfigSelector } from '../Helpers/hooks';
import { getFlatternProps, selector } from './utils';
import {
    FullCard,
    WideCard,
    SquareCard,
} from '../Cards';

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
const Collection = ({
    pages,
    cards,
    resultsPerPage,
    onCardBookmark,
}) => {
    /**
     **** Authored Configs ****
     */
    const {
        cardStyle,
        paginationType,
    } = useConfigSelector(selector);

    /**
     * The final cards to show in the collection
     * @type {Array}
     */
    const cardsToShow = useMemo(() => {
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
         * Current page (used if paginator component is authored)
         * @type {Number}
         */
        const currentPage = resultsPerPage * (pages - 1);

        if (isPaginator) {
            return cards.slice(currentPage, totalPages);
        }

        /**
         * Current page (used if load more button is authored)
         * @type {Number}
         */
        if (isLoadMore) {
            return cards.slice(0, resultsPerPage * pages);
        }

        return cards;
    }, [paginationType, resultsPerPage, pages, cards]);

    const renderCard = (card) => {
        const { id, styles: { typeOverride } } = card;

        const type = cardStyle || typeOverride;
        const props = {
            ...getFlatternProps(card),
            key: id,
        };

        switch (type) {
            case CARD_STYLES.FULL:
                return <FullCard {...props} />;
            case CARD_STYLES.SQUARE:
                return <SquareCard {...props} />;
            default:
                return <WideCard {...props} onClick={onCardBookmark} />;
        }
    };

    return (
        <If condition={Boolean(cardsToShow.length)}>
            <div
                data-testid="consonant-collection"
                className="consonant-card-collection">
                <div className="consonant-card-collection--inner">
                    {cardsToShow.map(renderCard)}
                    <div className="consonant-card-collection--placeholder" />
                    <div className="consonant-card-collection--placeholder" />
                </div>
            </div>
        </If>
    );
};

Collection.propTypes = CollectionType;
Collection.defaultProps = defaultProps;

export default Collection;

