import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './slide.css';
import './fade.css';

class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.width;
    this.imageContainer;
    this.getImageDim = this.getImageDim.bind(this);
    this.slideImages = this.slideImages.bind(this);
  }

  getImageDim({ target }) {
    this.width = target.clientWidth;
    const fullwidth = this.width * (this.props.images.length + 2);
    document.querySelector('.images-wrap').style.width = `${fullwidth}px`;
    document.querySelector('.images-wrap').style.transform = `translate(-${this
      .width *
      (this.state.index + 1)}px)`;
    this.applySlideStyle();
  }

  componentDidMount() {
    this.imageContainer = document.querySelector(`.images-wrap`);
    this.allImages = document.querySelectorAll(`.images-wrap div`);
  }

  applySlideStyle() {
    const allImagesDiv = document.querySelectorAll(`.images-wrap div`);
    allImagesDiv.forEach((eachImage, index) => {
      eachImage.style.width = `${this.width}px`;
    });
  }

  render() {
    const { images, type, duration } = this.props;
    const { index } = this.state;
    console.log(index);
    const style = {
      transform: `translate(-${(index + 1) * this.width}px)`
    };
    setTimeout(() => this.slideImages('next'), duration);
    return (
      <div>
        <div className={`slideshow-wrapper ${type}`}>
          <div className="images-wrap" style={style}>
            <div onLoad={this.getImageDim} data-index="-1">
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
        <input
          type="button"
          onClick={() => this.slideImages('prev')}
          value="Prev"
        />
        <input
          type="button"
          onClick={() => this.slideImages('next')}
          value="Next"
        />
      </div>
    );
  }

  nav(type) {
    if (type === 'next') {
      this.index++;
      this.slideImages();
    }
  }

  slideImages(type) {
    let { index } = this.state;
    let { images } = this.props;
    index = type === 'next' ? index + 1 : index - 1;
    this.imageContainer.style.transition = `all ${this.props
      .transitionDuration / 1000}s`;
    this.imageContainer.style.transform = `translate(-${this.width *
      (index + 1)}px)`;
    setTimeout(() => {
      this.imageContainer.style.transition = `none`;
      this.setState({
        index:
          index < 0 ? images.length - 1 : index >= images.length ? 0 : index
      });
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
