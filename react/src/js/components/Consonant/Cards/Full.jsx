/*eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { useLazyLoading } from '../../../utils/hooks';

const FullCard = (props) => {
    const {
        id,
        styles: {
            backgroundImage: image,
        },
        contentArea: {
            title,
            detailText: label,

        },
        overlays: {
            banner: {
                description: bannerDescription,
                fontColor: bannerFontColor,
                backgroundColor: bannerBackgroundColor,
                icon: bannerIcon,
            },
            videoButton: {
                url: videoURL,
            },
            logo: {
                src: logoSrc,
                alt: logoAlt,
                backgroundColor: logoBg,
                borderColor: logoBorderBg,
            },
            label: {
                description: badgeText,
            }
        },
    } = props;

    const imageRef = React.useRef();
    const [ lazyLoadedImage ] = useLazyLoading(imageRef, image);

    return (
        <div
            className="consonant-full-card"
            data-testid="consonant-full-card"
            id={id}>
            <div
                data-testid="consonant-card--img"
                className="consonant-full-card--img"
                ref={imageRef}
                style={{ backgroundImage: `url("${lazyLoadedImage}")` }}>
                {bannerDescription && bannerFontColor && bannerBackgroundColor &&
                    <span
                        data-testid="consonant-card--banner"
                        className="consonant-full-card--banner"
                        style={({
                            backgroundColor: bannerBackgroundColor,
                            color: bannerFontColor,
                        })}>
                        {
                            bannerIcon && (
                                <div
                                    className="consonant-full-card--banner-icon-wrapper">
                                    <img
                                        alt=""
                                        loading="lazy"
                                        src={bannerIcon}
                                        data-testid="consonant-card--banner-icon" />
                                </div>
                            )
                        }
                        <span>
                            {bannerDescription}
                        </span>
                    </span>
                }
                {badgeText &&
                    <span
                        className="consonant-full-card--badge">
                        {badgeText}
                    </span>
                }
                {videoURL &&
                    <a
                        href={videoURL}
                        target="_blank"
                        rel="noreferrer"
                        className="consonant-full-card--video-ico"
                        tabIndex="0"/>
                }
                {logoSrc &&
                    <div
                        style={({
                            backgroundColor: logoBg,
                            borderColor: logoBorderBg,
                        })}
                        className="consonant-full-card--logo">
                        <img
                            src={logoSrc}
                            alt={logoAlt}
                            loading="lazy"
                            width="32"
                        />
                    </div>}
            </div>
            <a
                href="ctaLink"
                target="_blank"
                rel="noreferrer"
                title=""
                className="consonant-full-card--inner"
                tabIndex="0">
                {label &&
                    <span
                        className="consonant-full-card--label">
                        {label}
                    </span>
                }
                <h2
                    className="consonant-full-card--title">
                    {title}
                </h2>
            </a>
        </div>
    );
};

export default FullCard;

FullCard.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    label: PropTypes.string,
    image: PropTypes.string,
    bannerDescription: PropTypes.string,
    bannerFontColor: PropTypes.string,
    bannerBackgroundColor: PropTypes.string,
    bannerIcon: PropTypes.string,
    badgeText: PropTypes.string,
    ctaLink: PropTypes.string,
    videoURL: PropTypes.string,
    logoSrc: PropTypes.string,
    logoAlt: PropTypes.string,
    logoBg: PropTypes.string,
    logoBorderBg: PropTypes.string,
};

FullCard.defaultProps = {
    bannerIcon: '',
    bannerDescription: '',
    bannerFontColor: '',
    bannerBackgroundColor: '',
    badgeText: '',
    label: '',
    ctaLink: '',
    videoURL: '',
    logoSrc: '',
    logoAlt: '',
    logoBg: '',
    logoBorderBg: '',
};
