import React from 'react';

const GlobalNavigation = () => (
    <header className="global-nav">
        <div className="global-nav__inner">
            <div className="global-nav__hamburger">
                <span />
                <span />
                <span />
            </div>
            <a href="#" className="global-nav__logo-wrapper" title="Click to navigate to home page">
                <svg width="19" height="19" x="5" xmlns="http://www.w3.org/2000/svg">
                    <use xlinkHref="#logo" />
                </svg>
            </a>
            <ul className="global-nav__menu">
                <li className="global-nav__menu-item">
                    <a href="#" className="global-nav__menu-item-link  global-nav__menu-item-link_main" title="Click to navigate">Create</a>
                </li>
                <li className="global-nav__menu-item">
                    <a href="#" className="global-nav__menu-item-link" title="Click to navigate">How-tos</a>
                </li>
                <li className="global-nav__menu-item">
                    <a href="#" className="global-nav__menu-item-link" title="Click to navigate">Live streams</a>
                </li>
                <li className="global-nav__menu-item">
                    <a href="#" className="global-nav__menu-item-link" title="Click to navigate">Challenges</a>
                </li>
                <li className="global-nav__menu-item">
                    <a href="#" className="global-nav__menu-item-link" title="Click to navigate">Inspiration</a>
                </li>
                <li className="global-nav__menu-item">
                    <a href="#" className="global-nav__menu-item-link" title="Click to navigate">Free stuff</a>
                </li>
                <li className="global-nav__menu-item">
                    <a href="#" className="global-nav__menu-item-link" title="Click to navigate">Hire Creativity</a>
                </li>
            </ul>
            <div className="global-nav__right-menu-wrapper">
                <ul className="global-nav__right-menu">
                    <li className="global-nav__right-menu-item">
                        <a href="#" className="global-nav__right-menu-item-link" title="Click for menu">
                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                <use xlinkHref="#menu" />
                            </svg>
                        </a>
                    </li>
                </ul>
                <a href="#" className="global-nav__right-menu-link">Sign in</a>
            </div>
        </div>
    </header>
);

export default GlobalNavigation;
