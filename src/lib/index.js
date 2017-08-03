import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './slide.css';
import './fade.css';

class Slideshow extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
      const allImages = document.querySelectorAll(`.fade div`);
      allImages.forEach(eachImage => {
        eachImage.style.transition = `all ${this.props.transitionDuration/1000}s`;
      });
    }

    render() {
        const { images, type, duration } = this.props;
        setInterval(() => {
            const slideShow = document.querySelector(`.${type}`);
            const allImages = document.querySelectorAll(`.${type} div`);
            if (type === 'slide') {
                this.slideImages(slideShow, allImages);
            } else if (type === 'fade') {
                this.fadeImages(slideShow, allImages);
            }
        }, duration)
        return (
            <div className={`slideshow-wrapper ${type}`}>
                {
                    images.map((each, key) => (
                        <div data-index={key} key={key}><img src={each} /></div>
                        )
                    )
                }
            </div>
        );
    }

    slideImages(slideShow, allImages) {
        allImages[0].style.marginLeft = "-100%";
        setTimeout(() => {
            allImages[0].style.marginLeft = "0%";
            slideShow.appendChild(allImages[0]);
        }, 1000);
    }

    fadeImages(slideShow, allImages) {
      allImages[allImages.length-1].style.opacity = "0";
        setTimeout(() => {
            allImages[allImages.length-1].style.opacity = "1";
            slideShow.insertBefore(allImages[allImages.length-1], allImages[0]);
        }, this.props.transitionDuration);
    }
}


Slideshow.defaultProps = {
    duration: 5000,
    transitionDuration: 1000,
    type: 'slide'
}

Slideshow.PropTypes = {
    images: PropTypes.array.isRequired,
    duration: PropTypes.number,
    transitionDuration: PropTypes.transitionDuration,
    type: PropTypes.string
}
export default Slideshow;