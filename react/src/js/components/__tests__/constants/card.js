
import { cards, bookmarks, collection } from '../mocks/consonant.json';

const { cardStyle } = collection;
const [{
    id,
    title,
    description,
    image,
    bannerDescription,
    ctaLabel,
    ctaLink,
    bannerBackgroundColor,
    bannerFontColor,
    secondaryLabelText,
    bannerIcon,
}] = cards;
const {
    enabled: allowBookmarking,
    cardUnsavedIcon,
    cardSavedIcon,
    saveBookmarkText,
    unsaveBookmarkText,
} = bookmarks;

export const DEFAULT_PROPS = {
    id,
    title,
    image,
    ctaLink,
    ctaLabel,
    cardStyle,
    bannerIcon,
    description,
    bannerFontColor,
    allowBookmarking,
    saveBookmarkText,
    bannerDescription,
    secondaryLabelText,
    unsaveBookmarkText,
    bannerBackgroundColor,

    key: id,
    isBookmarked: false,
    label: 'Some label',
    disableBookmarkIco: false,
    videoURL: 'some-video-url',
    cardSavedIco: cardSavedIcon,
    cardUnsavedIco: cardUnsavedIcon,

    onClick: jest.fn(),
};

export const CARD_STYLE = [
    '3:2',
    '1:1',
    'none',
    'full-card',
];

export const PROPS_WITHOUT_BANNER = [
    { bannerDescription: '' },
    { bannerFontColor: '' },
    { bannerBackgroundColor: '' },
];
