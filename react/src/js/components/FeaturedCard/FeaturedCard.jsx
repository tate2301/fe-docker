import React from 'react';

const promoSliderStyles = {
    backgroundImage: 'url(./img/dog.jpg)',
};

const FeaturedCard = () => (
    <div>
        <div className="create-card-collection__title-wrapper">
            <h2 className="create-card-collection__title">What&apos;s hot now</h2>
        </div>
        <div className="promo-slider">
            <div className="promo-slider__wrapper">
                <div className="promo-slider__slide">
                    <div className="promo-slider__img-wrapper" style={promoSliderStyles}>
                        <a href="#" className="promo-slider__live-link" title="Click to navigate">Live</a>
                    </div>
                    <div className="promo-slider__info">
                        <div className="promo-slider__info-left">
                            <ul className="promo-slider__tags">
                                <li className="promo-slider__tag">
                                    <a href="#">Photography</a>
                                </li>
                                <li className="promo-slider__tag">
                                    <a href="#">Inspiration</a>
                                </li>
                            </ul>
                            <h3 className="promo-slider__title">
                                <a href="#" title="Click to navigate">Learn how to take pet portraits</a>
                            </h3>
                        </div>
                        <div className="promo-slider__info-right">
                            <a href="#" className="promo-slider__watch-btn">Link</a>
                        </div>
                    </div>
                </div>
                <div className="promo-slider__pagination">
                    <button type="button" className="promo-slider__pagination  promo-slider__pagination_left" />
                    <button type="button" className="promo-slider__pagination  promo-slider__pagination_right" />
                </div>
            </div>
        </div>
    </div>
);

export default FeaturedCard;
