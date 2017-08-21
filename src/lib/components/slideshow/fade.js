import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './slide.css';

class Fade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.width = 0;
    this.height = 0;
    this.imageContainer = null;
    this.timeout = null;
  }

  componentDidMount() {
    console.log(document.querySelector('.images-wrap img').clientHeight);
    this.imageContainer = document.querySelector(`.images-wrap`);
    this.allImages = document.querySelectorAll(`.images-wrap div`);
    this.width = document.querySelector('.fade-wrapper').clientWidth;
    this.applySlideStyle();
    this.addResizeListener();
  }

  addResizeListener() {
    window.addEventListener('resize', () => {
      this.width = document.querySelector('.fade-wrapper').clientWidth;
      this.applySlideStyle();
    });
  }

  applySlideStyle() {
    this.allImages.forEach((eachImage, index) => {
      eachImage.style.width = `${this.width}px`;
    });
  }

  render() {
    const { images, type, duration } = this.props;
    const { index } = this.state;
    // this.timeout = setTimeout(() => this.slideImages('next'), duration);
    return (
      <div className="container">
        <div className="nav" onClick={() => this.slideImages('prev')}>
          {' '}&lt;{' '}
        </div>
        <div className={`fade-wrapper ${type}`}>
          <div className="images-wrap">
            <div data-index="-1">
              <img alt="" src={images[images.length - 1]} />
            </div>
            {images.map((each, key) =>
              <div
                data-index={key}
                key={key}
                className={key === index ? 'active' : ''}
              >
                <img alt="" src={each} />
              </div>
            )}
            <div onLoad={this.getImageDim} data-index="-1">
              <img alt="" src={images[0]} />
            </div>
          </div>
        </div>
        <div className="nav" onClick={() => this.slideImages('next')}>
          {' '}&gt;{' '}
        </div>
      </div>
    );
  }

  slideImages(type) {
    let { index } = this.state;
    let { images } = this.props;
    clearTimeout(this.timeout);
    index = type === 'next' ? index + 1 : index - 1;
  }
}

Fade.defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  type: 'slide'
};

Fade.PropTypes = {
  images: PropTypes.array.isRequired,
  duration: PropTypes.number,
  transitionDuration: PropTypes.transitionDuration,
  type: PropTypes.string
};
export default Fade;
