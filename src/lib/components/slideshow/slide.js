import React, { Component } from 'react';
import * as TWEEN from '@tweenjs/tween.js';
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
    this.moveSlides = this.moveSlides.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
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
    const fullwidth = this.width * (this.props.children.length + 2);
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

  moveSlides({ target }) {
    //check if there's disabled class
    if (target.className.includes('disabled')) {
      return;
    }
    this.preSlide(target.dataset.type);
  }

  goToSlide({ target }) {
    this.slideImages(parseInt(target.dataset.key));
  }

  preSlide(type) {
    let { index } = this.state;
    index = type === 'next' ? index + 1 : index - 1;
    this.slideImages(index);
  }

  render() {
    const { children, duration, infinite, indicators } = this.props;
    const { index } = this.state;
    const style = {
      transform: `translate(-${(index + 1) * this.width}px)`
    };
    if(infinite) {
      this.timeout = setTimeout(() => this.preSlide('next'), duration);
    }
    return (
      <div>
        <div className="react-slideshow-container">
          <div className={`nav ${index <= 0 && !infinite ? 'disabled': ''}`} data-type="prev" onClick={this.moveSlides}>
            {' '}&lt;{' '}
          </div>
          <div className={`react-slideshow-wrapper slide`}>
            <div
              className="images-wrap"
              style={style}
              ref={wrap => (this.imageContainer = wrap)}>
              <div data-index="-1">
                { children[children.length - 1] }
              </div>
              {children.map((each, key) =>
                <div
                  data-index={key}
                  key={key}
                  className={key === index ? 'active' : ''}
                >
                  {each}
                </div>
              )}
              <div data-index="-1">
                {children[0]}
              </div>
            </div>
          </div>
          <div className={`nav ${index === children.length - 1 && !infinite ? 'disabled': ''}`} data-type="next" onClick={this.moveSlides}>
            {' '}&gt;{' '}
          </div>
        </div>
        {
          indicators &&
          <div className="indicators">
            {
              children.map((each, key) => (
                <div
                  key={key}
                  data-key={key}
                  className={index === key ? 'active' : ''}
                  onClick={this.goToSlide}/>
              ))
            }
          </div>
        }
      </div>
    );
  }

  slideImages(index) {
    let { children, transitionDuration } = this.props;
    const existingTweens = TWEEN.default.getAll();
    if (!existingTweens.length) {
      clearTimeout(this.timeout);
      const value = {margin: -this.width * (this.state.index + 1)};
      const tween = new TWEEN.Tween(value)
        .to({margin: -this.width * (index + 1)}, transitionDuration)
        .onUpdate((value) => {
          this.imageContainer.style.transform = `translate(${value.margin}px)`;
        }).start();
      animate();
      function animate() {
        requestAnimationFrame(animate);
        TWEEN.default.update();
      }
      setTimeout(() => {
        this.setState({
          index:
            index < 0 ? children.length - 1 : index >= children.length ? 0 : index
        });
      }, transitionDuration);
    }
  }
}

Slideshow.defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  infinite: false,
  indicators: false
};

Slideshow.propTypes = {
  duration: PropTypes.number,
  transitionDuration: PropTypes.number,
  infinite: PropTypes.bool,
  indicators: PropTypes.bool
};
export default Slideshow;