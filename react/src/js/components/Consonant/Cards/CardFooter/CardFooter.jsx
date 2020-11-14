import React from 'react';
import classNames from 'classnames';

import Group from '../../Infobit/Group';
import { footerType } from '../../types/card';

const defaultProps = {
    left: [],
    center: [],
    right: [],
    divider: false,
    isFluid: false,
};

/**
 * The footer that is displayed for 3:2 cards
 *
 * @component
 * @example
 * const props= {
    divider: Boolean,
    left: Array,
    center: Array,
    right: Array,
    isFluid: Boolean,
 * }
 * return (
 *   <CardFooter {...props}/>
 * )
 */
const CardFooter = (props) => {
    const {
        divider,
        left,
        center,
        right,
        isFluid,
    } = props;

    /**
     * Class name for the card footer:
     * whether the card footer should have a horizontal divider
     * @type {Number}
     */
    const footerClassName = classNames({
        'consonant-card-footer': true,
        'consonant-card-footer_divider': divider,
    });

    /**
     * Class name for the card footer row:
     * whether the the card footer row should be fluid or of fixed width
     * @type {Number}
     */
    const rowClassName = classNames({
        'consonant-card-footer--row': true,
        'consonant-card-footer--row_fluid': isFluid,
    });

    /**
     * How many groups are displayed in the footer
     * @type {Number}
     */
    let dataCells = 0;

    [left, center, right].forEach((footerGroup) => {
        if (footerGroup.length > 0) {
            dataCells += 1;
        }
    });

    /**
     * Whether the left footer infobits should render
     * @type {Boolean}
     */
    const shouldRenderLeft = left && left.length > 0;

    /**
     * Whether the center footer infobits should render
     * @type {Boolean}
     */
    const shouldRenderCenter = center && center.length > 0;

    /**
     * Whether the center footer infobits should render
     * @type {Boolean}
     */
    const shouldRenderRight = right && right.length > 0;

    return (
        <div
            className={footerClassName}>
            <div
                className={rowClassName}
                data-cells={dataCells}>
                {shouldRenderLeft &&
                    <div
                        className="consonant-card-footer--cell consonant-card-footer--cell_left">
                        <Group renderList={left} />
                    </div>
                }
                {shouldRenderCenter &&
                    <div
                        className="consonant-card-footer--cell consonant-card-footer--cell_center">
                        <Group renderList={center} />
                    </div>
                }
                {shouldRenderRight &&
                    <div
                        className="consonant-card-footer--cell consonant-card-footer--cell_right">
                        <Group renderList={right} />
                    </div>
                }
            </div>
        </div>
    );
};

CardFooter.propTypes = footerType;
CardFooter.defaultProps = defaultProps;

export default CardFooter;
