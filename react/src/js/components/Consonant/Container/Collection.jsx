import React from 'react';
import {
    func,
    shape,
    number,
    arrayOf,
} from 'prop-types';
import Collection from '@bit/fe-docker.consonant.collection';
import { cardType } from '../types/card';
import { useConfig } from '../Helpers/hooks';
import { DEFAULT_SHOW_ITEMS_PER_PAGE } from '../Helpers/constants';

import CustomCard from './CustomCard';

const collectionType = {
    pages: number,
    resultsPerPage: number,
    cards: arrayOf(shape(cardType)),
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
const CollectionContainer = ({
    cards,
    pages,
    resultsPerPage,
    onCardBookmark,
}) => {
    /**
     **** Authored Configs ****
     */
    const getConfig = useConfig();
    // const cardStyle = getConfig('collection', 'cardStyle');
    const dateFormat = getConfig('collection', 'i18n.prettyDateIntervalFormat');
    const locale = getConfig('language', '');
    const paginationType = getConfig('pagination', 'type');

    return (
        <Collection
            cards={cards}
            total={pages}
            locale={locale}
            cardStyle="custom"
            limit={resultsPerPage}
            dateFormat={dateFormat}
            CustomCard={CustomCard}
            paginationType={paginationType}
            onCardBookmark={onCardBookmark} />
    );
};

CollectionContainer.propTypes = collectionType;
CollectionContainer.defaultProps = defaultProps;

export default CollectionContainer;

