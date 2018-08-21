import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './slide.css';

class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.width = 0;
    this.imageContainer = null;
    this.timeout = null;
  }

  componentDidMount() {
    this.allImages = document.querySelectorAll(`.images-wrap div`);
    this.width = document.querySelector('.react-slideshow-wrapper').clientWidth;
    this.setWidth();
    this.addResizeListener();
  }
  
  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.setState({ unmounted: true });
  }

  setWidth() {
    const fullwidth = this.width * (this.props.images.length + 2);
    this.imageContainer.style.width = `${fullwidth}px`;
    this.imageContainer.style.transform = `translate(-${this.width *
      (this.state.index + 1)}px)`;
    this.applySlideStyle();
  }

  addResizeListener() {
    window.addEventListener('resize', () => {
      this.width = document.querySelector('.react-slideshow-wrapper').clientWidth;
      this.setWidth();
    });
  }

  applySlideStyle() {
    this.allImages.forEach((eachImage, index) => {
      eachImage.style.width = `${this.width}px`;
    });
  }

  render() {
    const { images, duration } = this.props;
    const { index } = this.state;
    const style = {
      transform: `translate(-${(index + 1) * this.width}px)`
    };
    this.timeout = setTimeout(() => this.slideImages('next'), duration);
    return (
      <div className="react-slideshow-container">
        <div className="nav" onClick={() => this.slideImages('prev')}>
          {' '}&lt;{' '}
        </div>
        <div className={`react-slideshow-wrapper slide`}>
          <div
            className="images-wrap"
            style={style}
            ref={wrap => (this.imageContainer = wrap)}
          >
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
            <div data-index="-1">
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
    if (this.state.unmounted || !this.imageContainer) return;
    index = type === 'next' ? index + 1 : index - 1;
    this.imageContainer.style.transition = `all ${this.props
      .transitionDuration / 1000}s`;
    this.imageContainer.style.transform = `translate(-${this.width *
      (index + 1)}px)`;
    setTimeout(() => {
      if (this.state.unmounted || !this.imageContainer) return;
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
  transitionDuration: 1000
};

Slideshow.propTypes = {
  images: PropTypes.array.isRequired,
  duration: PropTypes.number,
  transitionDuration: PropTypes.number
};
export default Slideshow;
