import PropTypes from 'prop-types';
import classNames from 'classnames';
import sum from 'lodash/sum';
import React from 'react';
import ChosenFilter from './ChosenItem';
import { getAtleastOneFilterSelected } from '../../../../utils/general';
import { useConfig } from '../../../../utils/hooks';
import Item from './Item';
import { Title as MobileTitle } from './Mobile/Title';
import { Footer as MobileFooter } from './Mobile/Footer';
import { Title as DesktopTitle } from './Desktop/Title';
import { ClearBtn as DesktopClearBtn } from './Desktop/ClearButton';
import {
    DESKTOP_SCREEN_SIZE,
    NOT_DESKTOP_SCREEN_SIZE,
} from '../../../../constants';

const LeftFilterPanel = ({
    filters,
    selectedFiltersQty,
    showMobileFilters,
    onFilterClick,
    onClearAllFilters,
    onClearFilterItems,
    onCheckboxClick,
    onMobileFiltersToggleClick,
    onSelectedFilterClick,
    resQty,
    searchComponent,
    bookmarkComponent,
}) => {
    const getConfig = useConfig();

    const showTotalResults = getConfig('collection', 'showTotalResults');
    const clearAllFiltersText = getConfig('filterPanel', 'i18n.leftPanel.clearAllFiltersText');
    const bookmarksEnabled = getConfig('bookmarks', 'leftFilterPanel.showBookmarksFilter');
    const searchEnabled = getConfig('search', 'enabled');
    const panelHeader = getConfig('filterPanel', 'i18n.leftPanel.header');
    const showTotalResultsText = getConfig('filterPanel', 'i18n.leftPanel.mobile.panel.totalResultsText');
    const clearFilterText = getConfig('filterPanel', 'i18n.leftPanel.mobile.panel.clearFilterText');
    const leftPanelMobileHeader = getConfig('filterPanel', 'i18n.leftPanel.mobile.panel.header');
    const applyText = getConfig('filterPanel', 'i18n.leftPanel.mobile.panel.applyBtnText');
    const doneText = getConfig('filterPanel', 'i18n.leftPanel.mobile.panel.doneBtnText');

    const atleastOneFilterSelected = getAtleastOneFilterSelected(filters);

    const mobileFiltersClass = classNames({
        'consonant-left-filters': true,
        'consonant-left-filters_opened': showMobileFilters,
    });

    return (
        <div
            data-testid="consonant-filters__left"
            className={mobileFiltersClass}>
            <div
                className="consonant-left-filters--header">
                {NOT_DESKTOP_SCREEN_SIZE &&
                    <MobileTitle
                        onClick={onMobileFiltersToggleClick}
                        leftPanelMobileHeader={leftPanelMobileHeader} />
                }
                {DESKTOP_SCREEN_SIZE &&
                    <DesktopTitle
                        panelHeader={panelHeader} />
                }
                {DESKTOP_SCREEN_SIZE &&
                    <DesktopClearBtn
                        clearAllFiltersText={clearAllFiltersText}
                        onClearAllFilters={onClearAllFilters}
                        panelHeader={panelHeader} />
                }
            </div>
            {DESKTOP_SCREEN_SIZE && searchEnabled && searchComponent}
            {bookmarksEnabled && bookmarkComponent}
            {DESKTOP_SCREEN_SIZE && selectedFiltersQty > 0 &&
                <div
                    className="consonant-left-filters--chosen-filters">
                    {filters.map(el => (
                        el.items.map(filter => (
                            filter.selected &&
                            <ChosenFilter
                                key={filter.id}
                                name={filter.label}
                                id={filter.id}
                                parentId={el.id}
                                onClick={onSelectedFilterClick} />
                        ))
                    ))}
                </div>
            }
            {filters.length > 0 && (
                <div className="consonant-left-filters--list">
                    {filters.map(filter => (
                        <Item
                            key={filter.id}
                            name={filter.group}
                            icon={filter.icon}
                            items={filter.items}
                            numItemsSelected={sum(filter.items.map(i => i.selected))}
                            results={resQty}
                            id={filter.id}
                            isOpened={filter.opened}
                            onCheck={onCheckboxClick}
                            onClick={onFilterClick}
                            onClearAll={onClearFilterItems}
                            clearFilterText={clearFilterText} />
                    ))}
                </div>
            )}
            {NOT_DESKTOP_SCREEN_SIZE &&
                <MobileFooter
                    doneText={doneText}
                    applyText={applyText}
                    someFiltersAreSelected={atleastOneFilterSelected}
                    showTotalResultsText={showTotalResultsText}
                    onMobileFiltersToggleClick={onMobileFiltersToggleClick}
                    clearAllFiltersText={clearAllFiltersText}
                    onClearAllFilters={onClearAllFilters}
                    resQty={resQty}
                    showTotalResults={showTotalResults} />
            }
        </div>
    );
};

export default LeftFilterPanel;

LeftFilterPanel.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.object),
    selectedFiltersQty: PropTypes.number,
    showMobileFilters: PropTypes.bool,
    onFilterClick: PropTypes.func.isRequired,
    onClearAllFilters: PropTypes.func.isRequired,
    onClearFilterItems: PropTypes.func.isRequired,
    onCheckboxClick: PropTypes.func.isRequired,
    onMobileFiltersToggleClick: PropTypes.func.isRequired,
    onSelectedFilterClick: PropTypes.func.isRequired,
    resQty: PropTypes.number,
    searchComponent: PropTypes.node.isRequired,
    bookmarkComponent: PropTypes.node.isRequired,
};

LeftFilterPanel.defaultProps = {
    filters: [],
    selectedFiltersQty: 0,
    showMobileFilters: false,
    resQty: 0,
};
