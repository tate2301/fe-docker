import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Group from '../../Infobit/Group';

const CardFooter = (props) => {
    const {
        divider, left, center, right,
    } = props;
    const className = classNames('consonant-card-footer', { 'consonant-card-footer_divider': divider });

    return (
        <div className={className}>
            <div className="consonant-card-footer--row">
                {left && left.length > 0 &&
                <div className="consonant-card-footer--cell consonant-card-footer--cell_left" data-max-width={left.length}>
                    <Group renderList={left} />
                </div>}
                {center && center.length > 0 &&
                <div className="consonant-card-footer--cell consonant-card-footer--cell_center" data-max-width={center.length}>
                    <Group renderList={center} />
                </div>}
                {right && right.length > 0 &&
                <div className="consonant-card-footer--cell consonant-card-footer--cell_right" data-max-width={right.length}>
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
};

CardFooter.defaultProps = {
    left: [],
    center: [],
    right: [],
    divider: false,
};
