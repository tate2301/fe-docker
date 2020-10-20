import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Info = (props) => {
    const {
        title,
        totalResultsText,
        sortEnabled,
        sortOptions,
        showTotalResults,
    } = props;

    const wrapperClassName = classNames({
        'consonant-filters-info--wrapper': true,
        'consonant-filters-info--wrapper_no-line': !sortEnabled || !sortOptions.length,
    });

    return (
        <div className={wrapperClassName}>
            {title &&
                <h2
                    data-testid="title"
                    className="consonant-filters-info--title">
                    {title}
                </h2>
            }
            {showTotalResults &&
                <span
                    data-testid="results"
                    className="consonant-filters-info--results">
                    {totalResultsText}
                </span>
            }
        </div>
    );
};

/* eslint-disable-next-line import/prefer-default-export */
export { Info };

Info.propTypes = {
    title: PropTypes.string,
    totalResultsText: PropTypes.string,
    sortEnabled: PropTypes.bool,
    sortOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    showTotalResults: PropTypes.bool,
};

Info.defaultProps = {
    title: '',
    totalResultsText: '',
    sortEnabled: false,
    showTotalResults: false,
};
