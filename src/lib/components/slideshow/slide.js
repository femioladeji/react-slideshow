import React, { Component } from 'react';
import TWEEN from '@tweenjs/tween.js';
import PropTypes from 'prop-types';
import { getUnhandledProps } from '../../helpers.js';

import './slide.css';

class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index:
        props.defaultIndex && props.defaultIndex < props.children.length
          ? props.defaultIndex
          : 0
    };
    this.width = 0;
    this.imageContainer = null;
    this.wrapper = null;
    this.timeout = null;
    this.moveSlides = this.moveSlides.bind(this);
    this.pauseSlides = this.pauseSlides.bind(this);
    this.startSlides = this.startSlides.bind(this);
    this.resizeListener = this.resizeListener.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.tweenGroup = new TWEEN.Group();
  }

  componentDidMount() {
    this.setWidth();
    window.addEventListener('resize', this.resizeListener);
    const { autoplay, duration } = this.props;
    if (autoplay) {
      this.timeout = setTimeout(() => this.goNext(), duration);
    }
  }

  componentWillUnmount() {
    this.willUnmount = true;
    clearTimeout(this.timeout);
    window.removeEventListener('resize', this.resizeListener);
  }

  setWidth() {
    // the .slice.call was needed to support ie11
    this.allImages = Array.prototype.slice.call(
      this.wrapper.querySelectorAll(`.images-wrap > div`),
      0
    );
    this.width = this.wrapper.clientWidth;
    const fullwidth = this.width * (this.props.children.length + 2);
    this.imageContainer.style.width = `${fullwidth}px`;
    this.imageContainer.style.transform = `translate(-${this.width *
      (this.state.index + 1)}px)`;
    this.applySlideStyle();
  }

  componentDidUpdate(props) {
    if (this.props.autoplay !== props.autoplay) {
      if (this.props.autoplay) {
        this.timeout = setTimeout(() => this.goNext(), this.props.duration);
      } else {
        clearTimeout(this.timeout);
      }
    }
    if (this.props.children.length != props.children.length) {
      this.setWidth();
    }
  }

  resizeListener() {
    this.setWidth();
  }

  applySlideStyle() {
    this.allImages.forEach((eachImage, index) => {
      eachImage.style.width = `${this.width}px`;
    });
  }

  pauseSlides() {
    if (this.props.pauseOnHover) {
      clearTimeout(this.timeout);
    }
  }

  startSlides() {
    const { pauseOnHover, autoplay } = this.props;
    if (pauseOnHover && autoplay) {
      this.timeout = setTimeout(() => this.goNext(), this.props.duration);
    }
  }

  moveSlides({ currentTarget: { dataset } }) {
    if (dataset.type === 'next') {
      this.goNext();
    } else {
      this.goBack();
    }
  }

  goToSlide({ currentTarget }) {
    this.goTo(parseInt(currentTarget.dataset.key));
  }

  goTo(index) {
    this.slideImages(index);
  }

  goNext() {
    const { index } = this.state;
    const { children, infinite } = this.props;
    if (!infinite && index === children.length - 1) {
      return;
    }
    this.slideImages(index + 1);
  }

  goBack() {
    const { index } = this.state;
    const { infinite } = this.props;
    if (!infinite && index === 0) {
      return;
    }
    this.slideImages(index - 1);
  }

  showIndicators() {
    const isCustomIndicator = typeof this.props.indicators !== 'boolean';
    const className = !isCustomIndicator && 'each-slideshow-indicator';
    return (
      <div className="indicators">
        {this.props.children.map((_, key) => (
          <div
            key={key}
            data-key={key}
            className={`${className} ${this.state.index === key && 'active'}`}
            onClick={this.goToSlide}
          >
            {isCustomIndicator && this.props.indicators(key)}
          </div>
        ))}
      </div>
    );
  }

  showPreviousArrow() {
    const { arrows, prevArrow, infinite } = this.props;
    return (
      arrows && (
        <div
          className={
            !prevArrow &&
            `nav ${this.state.index <= 0 && !infinite && 'disabled'}`
          }
          data-type="prev"
          onClick={this.moveSlides}
        >
          {prevArrow ? prevArrow : <span />}
        </div>
      )
    );
  }

  showNextArrow() {
    const { arrows, nextArrow, infinite, children } = this.props;
    return (
      arrows && (
        <div
          className={
            !nextArrow &&
            `nav ${this.state.index === children.length - 1 &&
              !infinite &&
              'disabled'}`
          }
          data-type="next"
          onClick={this.moveSlides}
        >
          {nextArrow ? nextArrow : <span />}
        </div>
      )
    );
  }

  render() {
    const { children, infinite, indicators, arrows } = this.props;
    const unhandledProps = getUnhandledProps(Slideshow.propTypes, this.props);
    const { index } = this.state;
    const style = {
      transform: `translate(-${(index + 1) * this.width}px)`
    };

    return (
      <div {...unhandledProps}>
        <div
          className="react-slideshow-container"
          onMouseEnter={this.pauseSlides}
          onMouseLeave={this.startSlides}
        >
          {this.showPreviousArrow()}
          <div
            className={`react-slideshow-wrapper slide`}
            ref={ref => (this.wrapper = ref)}
          >
            <div
              className="images-wrap"
              style={style}
              ref={ref => (this.imageContainer = ref)}
            >
              <div data-index="-1">{children[children.length - 1]}</div>
              {children.map((each, key) => (
                <div
                  data-index={key}
                  key={key}
                  className={key === index ? 'active' : ''}
                >
                  {each}
                </div>
              ))}
              <div data-index="-1">{children[0]}</div>
            </div>
          </div>
          {this.showNextArrow()}
        </div>
        {indicators && this.showIndicators()}
      </div>
    );
  }

  slideImages(index) {
    let {
      children,
      transitionDuration,
      autoplay,
      infinite,
      duration,
      onChange
    } = this.props;
    const existingTweens = this.tweenGroup.getAll();
    if (!existingTweens.length) {
      clearTimeout(this.timeout);
      const value = { margin: -this.width * (this.state.index + 1) };
      const tween = new TWEEN.Tween(value, this.tweenGroup)
        .to({ margin: -this.width * (index + 1) }, transitionDuration)
        .onUpdate(value => {
          this.imageContainer.style.transform = `translate(${value.margin}px)`;
        })
        .start();

      let animate = () => {
        if (this.willUnmount) {
          this.tweenGroup.removeAll();
          return;
        }
        requestAnimationFrame(animate);
        this.tweenGroup.update();
      };

      animate();

      tween.onComplete(() => {
        const newIndex =
          index < 0
            ? children.length - 1
            : index >= children.length
            ? 0
            : index;
        if (this.willUnmount) {
          return;
        }
        if (typeof onChange === 'function') {
          onChange(this.state.index, newIndex);
        }
        this.setState(
          {
            index: newIndex
          },
          () => {
            if (autoplay && (infinite || this.state.index < children.length)) {
              this.timeout = setTimeout(() => this.goNext(), duration);
            }
          }
        );
      });
    }
  }
}

Slideshow.defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  defaultIndex: 0,
  infinite: true,
  autoplay: true,
  indicators: false,
  arrows: true,
  pauseOnHover: false
};

Slideshow.propTypes = {
  duration: PropTypes.number,
  transitionDuration: PropTypes.number,
  defaultIndex: PropTypes.number,
  infinite: PropTypes.bool,
  indicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  autoplay: PropTypes.bool,
  arrows: PropTypes.bool,
  onChange: PropTypes.func,
  pauseOnHover: PropTypes.bool
};
export default Slideshow;
