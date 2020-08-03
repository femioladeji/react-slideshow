import React, { Component, createRef } from 'react';
import TWEEN from '@tweenjs/tween.js';
import ResizeObserver from 'resize-observer-polyfill';
import {
  getUnhandledProps,
  showNextArrow,
  showPreviousArrow,
  showIndicators
} from './helpers.js';
import { validatePropTypes, propTypes, getProps } from './props';

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
    this.handleResize = this.handleResize.bind(this);
    this.initResizeObserver = this.initResizeObserver.bind(this);
    this.reactSlideshowWrapper = createRef();
    this.goToSlide = this.goToSlide.bind(this);
    this.tweenGroup = new TWEEN.Group();
  }

  componentDidMount() {
    this.setWidth();
    this.initResizeObserver();
    validatePropTypes(this.props);
    const { autoplay, duration } = getProps(this.props);
    if (autoplay) {
      this.timeout = setTimeout(() => this.goNext(), duration);
    }
  }

  initResizeObserver() {
    this.resizeObserver = new ResizeObserver(entries => {
      if (!entries) return;
      this.handleResize();
    });
    this.resizeObserver.observe(this.reactSlideshowWrapper.current);
  }

  componentWillUnmount() {
    this.willUnmount = true;
    clearTimeout(this.timeout);
    this.removeResizeObserver();
  }

  removeResizeObserver() {
    if (
      this.resizeObserver &&
      this.reactSlideshowWrapper &&
      this.reactSlideshowWrapper.current
    ) {
      this.resizeObserver.unobserve(this.reactSlideshowWrapper.current);
    }
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
    const { autoplay, duration, children } = getProps(this.props);
    if (autoplay !== props.autoplay) {
      if (autoplay) {
        this.timeout = setTimeout(() => this.goNext(), duration);
      } else {
        clearTimeout(this.timeout);
      }
    }
    if (children.length != props.children.length) {
      this.setWidth();
    }
  }

  handleResize() {
    this.setWidth();
  }

  applySlideStyle() {
    this.allImages.forEach((eachImage, index) => {
      eachImage.style.width = `${this.width}px`;
    });
  }

  pauseSlides() {
    if (getProps(this.props).pauseOnHover) {
      clearTimeout(this.timeout);
    }
  }

  startSlides() {
    const { pauseOnHover, autoplay, duration } = getProps(this.props);
    if (pauseOnHover && autoplay) {
      this.timeout = setTimeout(() => this.goNext(), duration);
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
    const { children, infinite } = getProps(this.props);
    if (!infinite && index === children.length - 1) {
      return;
    }
    this.slideImages(index + 1);
  }

  goBack() {
    const { index } = this.state;
    const { infinite } = getProps(this.props);
    if (!infinite && index === 0) {
      return;
    }
    this.slideImages(index - 1);
  }

  render() {
    const { children, indicators, arrows } = getProps(this.props);
    const unhandledProps = getUnhandledProps(propTypes, this.props);
    const { index } = this.state;
    const style = {
      transform: `translate(-${(index + 1) * this.width}px)`
    };

    return (
      <div aria-roledescription="carousel" {...unhandledProps}>
        <div
          className="react-slideshow-container"
          onMouseEnter={this.pauseSlides}
          onMouseLeave={this.startSlides}
          ref={this.reactSlideshowWrapper}
        >
          {arrows &&
            showPreviousArrow(
              getProps(this.props),
              this.state.index,
              this.moveSlides
            )}
          <div
            className={`react-slideshow-wrapper slide`}
            ref={ref => (this.wrapper = ref)}
          >
            <div
              className="images-wrap"
              style={style}
              ref={ref => (this.imageContainer = ref)}
            >
              <div
                data-index="-1"
                aria-roledescription="slide"
                aria-hidden="false"
              >
                {children[children.length - 1]}
              </div>
              {children.map((each, key) => (
                <div
                  data-index={key}
                  key={key}
                  className={key === index ? 'active' : ''}
                  aria-roledescription="slide"
                  aria-hidden={key === index ? 'false' : 'true'}
                >
                  {each}
                </div>
              ))}
              <div
                data-index="-1"
                aria-roledescription="slide"
                aria-hidden="false"
              >
                {children[0]}
              </div>
            </div>
          </div>
          {arrows &&
            showNextArrow(
              getProps(this.props),
              this.state.index,
              this.moveSlides
            )}
        </div>
        {indicators &&
          showIndicators(
            getProps(this.props),
            this.state.index,
            this.goToSlide
          )}
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
    } = getProps(this.props);
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

export default Slideshow;
