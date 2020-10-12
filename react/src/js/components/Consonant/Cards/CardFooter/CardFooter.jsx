import React from 'react';
import PropTypes from 'prop-types';
import Group from '../../Infobit/Group';

const CardFooter = (props) => {
    const { left, center, right } = props;

    return (
        <div className="consonant-card-footer">
            <div className="consonant-card-footer--row">
                {left && left.length > 0 &&
                <div className="consonant-card-footer--cell">
                    <Group renderList={left} />
                </div>}
                {center && center.length > 0 &&
                <div className="consonant-card-footer--cell">
                    <Group renderList={center} />
                </div>}
                {right && right.length > 0 &&
                <div className="consonant-card-footer--cell">
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
};

CardFooter.defaultProps = {
    left: [],
    center: [],
    right: [],
};
