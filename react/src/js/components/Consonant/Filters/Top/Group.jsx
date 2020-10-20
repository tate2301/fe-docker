import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useConfig, useExpandable } from '../../../../utils/hooks';
import { Footer } from './Footer';
import { Items } from './Items';
import { stopPropagation } from '../../../../utils/general';

const clipWrapperItemsCount = 9;
const Group = ({
    name,
    id,
    items,
    numItemsSelected,
    onCheck,
    onClearAll,
    results,
    clearFilterText,
}) => {
    const getConfig = useConfig();
    const [openDropdown, handleToggle] = useExpandable(id);
    const isOpened = openDropdown === id;

    const mobileGroupTotalResultsText =
        getConfig('filterPanel', 'i18n.topPanel.mobile.group.totalResultsText').replace('{total}', results);
    const mobileGroupApplyBtnText = getConfig('filterPanel', 'i18n.topPanel.mobile.group.applyBtnText');
    const mobileGroupDoneBtnText = getConfig('filterPanel', 'i18n.topPanel.mobile.group.doneBtnText');
    const mobileFooterBtnText =
        numItemsSelected > 0 ? mobileGroupApplyBtnText : mobileGroupDoneBtnText;

    const handleClear = (e) => {
        e.stopPropagation();
        onClearAll(id);
    };

    const handleCheck = (e) => {
        e.stopPropagation();
        onCheck(id, e.target.value, e.target.checked);
    };

    const containerClassnames = classNames({
        'consonant-top-filter': true,
        'consonant-top-filter_opened': isOpened,
        'consonant-top-filter_selected': items.filter(i => i.selected).length > 0 && !isOpened,
    });

    window.items = items;

    return (
        <div
            data-testid="filter-item"
            className={containerClassnames}>
            <div
                className="consonant-top-filter--inner">
                <h3
                    className="consonant-top-filter--name">
                    <button
                        type="button"
                        className="consonant-top-filter--link"
                        data-testid="filter-group-btn"
                        onClick={handleToggle}
                        tabIndex="0">
                        {name}
                        <span
                            className="consonant-top-filter--selcted-items-qty">
                            {items.filter(item => item.selected).length || ''}
                        </span>
                    </button>
                </h3>
                <div
                    className="consonant-top-filter--selcted-items">
                    <div
                        className="consonant-top-filter--absolute-wrapper">
                        {
                            <Items
                                clipWrapperItemsCount={clipWrapperItemsCount}
                                handleCheck={handleCheck}
                                stopPropagation={stopPropagation}
                                items={items} />
                        }
                        {items.length >= clipWrapperItemsCount &&
                            <aside className="consonant-top-filter--bg" />
                        }
                        {
                            <Footer
                                mobileFooterBtnText={mobileFooterBtnText}
                                handleToggle={handleToggle}
                                clearFilterText={clearFilterText}
                                handleClear={handleClear}
                                numItemsSelected={numItemsSelected}
                                mobileGroupTotalResultsText={mobileGroupTotalResultsText} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

/* eslint-disable-next-line import/prefer-default-export */
export { Group };

Group.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onCheck: PropTypes.func.isRequired,
    onClearAll: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    numItemsSelected: PropTypes.number,
    results: PropTypes.number.isRequired,
    clearFilterText: PropTypes.string,
};

Group.defaultProps = {
    numItemsSelected: 0,
    clearFilterText: '',
};
