export const trackClearAllClicked = function(){
    console.log('Clear All Clicked');
}

export const trackAllCardsLoaded = function(cards){
    console.log('All Cards Loaded');
    console.log(cards);
}

export const trackFilterClicked = function(isChecked, itemId, filters){
    console.log('Item id ' + itemId);
    console.log(isChecked);
    console.log(filters);
}

export const trackFilterAdded = function(filterId){
    console.log('Filter with filterId' + ' ' + filterId + 'removed');
}

export const trackFavoritesSelected = function(selected){
    console.log('Favorites Selected');
    console.log(selected);
}

export const trackPageChange = function(currentPage){
    console.log('Page Change ' + currentPage);
}

export const trackSortChange = function(sortOption){
    console.log('Sort Changed');
    console.log(sortOption);
}

export const trackCardSave = function(cardId, isBookmarked){
    console.log('Card Save');
    console.log(cardId);
    console.log(isBookmarked);
}

export const trackSearchInputChange = function(val){
    console.log("Search");
    console.log(val);
}

export const trackClearSearchInput = function() {
    console.log("Clear Search Selected");
}

export const trackCardCtaClicked = function(cardId){
    console.log('Card CTA Clicked');
    console.log(cardId);
    console.log(isBookmarked);
}