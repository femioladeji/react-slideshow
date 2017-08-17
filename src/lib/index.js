import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './slide.css';
import './fade.css';

class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.getImageDim = this.getImageDim.bind(this);
    this.transition = this.transition.bind(this);
  }

  getImageDim({ target }) {
    document.querySelector(
      `.slideshow-wrapper`
    ).style.height = `${target.clientHeight}px`;
  }

  componentDidMount() {
    this.applyTransitionDuration();
  }

  applySlideStyle() {
    // const allImages = document.querySelectorAll(`.slide div`);
    // const lastIndex = allImages.length - 1;
    // allImages.forEach((eachImage, index) => {
    //   eachImage.style.left = 100*(index) + '%';
    // });
  }

  applyTransitionDuration() {
    const allImages = document.querySelectorAll(`.slideshow-wrapper div`);
    allImages.forEach(eachImage => {
      eachImage.style.transition = `all ${this.props.transitionDuration /
        1000}s`;
    });
  }

  transition() {
    const { type } = this.props;
    const slideShow = document.querySelector(`.${type}`);
    const allImages = document.querySelectorAll(`.${type} div`);
    if (type === 'slide') {
      this.slideImages(slideShow, allImages);
    } else if (type === 'fade') {
      this.fadeImages(slideShow, allImages);
    } else if (type === 'zoom') {
      this.zoomImages(slideShow, allImages);
    }
  }

  render() {
    const { images, type, duration } = this.props;
    setInterval(this.transition, duration);
    return (
      <div className={`slideshow-wrapper ${type}`}>
        {images.reverse().map((each, key) =>
          <div
            onLoad={key === 0 ? this.getImageDim : null}
            data-index={key}
            key={key}
          >
            <img alt="" src={each} />
          </div>
        )}
      </div>
    );
  }

  slideImages(slideShow, allImages) {
    const width = allImages[0].clientWidth;
    allImages[allImages.length - 1].style.transform = `translate(-${width}px)`;
    setTimeout(() => {
      allImages[allImages.length - 1].style.transform = 'translate(0)';
      slideShow.insertBefore(allImages[allImages.length - 1], allImages[0]);
    }, this.props.transitionDuration);
  }

  fadeImages(slideShow, allImages) {
    allImages[allImages.length - 1].style.opacity = '0';
    setTimeout(() => {
      allImages[allImages.length - 1].style.opacity = '1';
      slideShow.insertBefore(allImages[allImages.length - 1], allImages[0]);
    }, this.props.transitionDuration);
  }

  zoomImages(slideShow, allImages) {
    const scale = this.props.direction === 'in' ? 0.7 : 1.3;
    allImages[allImages.length - 1].style.opacity = '0';
    allImages[allImages.length - 1].style.transform = `scale(${scale})`;
    setTimeout(() => {
      allImages[allImages.length - 1].style.opacity = '1';
      allImages[allImages.length - 1].style.transform = 'scale(1)';
      slideShow.insertBefore(allImages[allImages.length - 1], allImages[0]);
    }, this.props.transitionDuration);
  }
}

Slideshow.defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  type: 'slide'
};

Slideshow.PropTypes = {
  images: PropTypes.array.isRequired,
  duration: PropTypes.number,
  transitionDuration: PropTypes.transitionDuration,
  type: PropTypes.string
};
export default Slideshow;
