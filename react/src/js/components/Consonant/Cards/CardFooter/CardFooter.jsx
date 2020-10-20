import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Group from '../../Infobit/Group';

const CardFooter = (props) => {
    const {
        divider, left, center, right, isFluid,
    } = props;
    const className = classNames('consonant-card-footer', { 'consonant-card-footer_divider': divider });
    const rowClassName = classNames('consonant-card-footer--row', { 'consonant-card-footer--row_fluid': isFluid });
    let colsWithData = 0;

    [left, center, right].forEach((el) => { colsWithData += el.length > 0 ? 1 : 0; });

    return (
        <div className={className}>
            <div className={rowClassName} data-cells={colsWithData}>
                {left && left.length > 0 &&
                <div className="consonant-card-footer--cell consonant-card-footer--cell_left">
                    <Group renderList={left} />
                </div>}
                {center && center.length > 0 &&
                <div className="consonant-card-footer--cell consonant-card-footer--cell_center">
                    <Group renderList={center} />
                </div>}
                {right && right.length > 0 &&
                <div className="consonant-card-footer--cell consonant-card-footer--cell_right">
                    <Group renderList={right} />
                </div>}
            </div>
        </div>
    );
};

export default CardFooter;

CardFooter.propTypes = {
    left: PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string })),
    center: PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string })),
    right: PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string })),
    divider: PropTypes.bool,
    isFluid: PropTypes.bool,
};

CardFooter.defaultProps = {
    left: [],
    center: [],
    right: [],
    divider: false,
    isFluid: false,
};
