import React, { Component, createRef } from 'react';
import TWEEN from '@tweenjs/tween.js';
import ResizeObserver from 'resize-observer-polyfill';
import { validatePropTypes, propTypes, getProps } from './props';
import {
  getUnhandledProps,
  showNextArrow,
  showPreviousArrow,
  showIndicators,
  getEasing
} from './helpers.js';

class Slideshow extends Component {
  constructor(props) {
    super();
    this.state = {
      index:
        props.defaultIndex && props.defaultIndex < props.children.length
          ? props.defaultIndex
          : 0
    };
    this.width = 0;
    this.dragging = false;
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
    this.startSwipe = this.startSwipe.bind(this);
    this.endSwipe = this.endSwipe.bind(this);
    this.swipe = this.swipe.bind(this);
    this.distanceSwiped = 0;
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
    if (this.reactSlideshowWrapper.current) {
      this.resizeObserver.observe(this.reactSlideshowWrapper.current);
    }
  }

  componentWillUnmount() {
    this.willUnmount = true;
    clearTimeout(this.timeout);
    this.removeResizeObserver();
  }

  startSwipe(e) {
    const { canSwipe } = getProps(this.props);
    if (canSwipe) {
      this.startingClientX = e.touches ? e.touches[0].pageX : e.clientX;
      clearTimeout(this.timeout);
      this.dragging = true;
    }
  }

  endSwipe() {
    const { canSwipe } = getProps(this.props);
    if (canSwipe) {
      this.dragging = false;
      if (Math.abs(this.distanceSwiped) / this.width > 0.2) {
        if (this.distanceSwiped < 0) {
          this.goNext();
        } else {
          this.goBack();
        }
      } else {
        if (Math.abs(this.distanceSwiped) > 0) {
          this.slideImages(this.state.index, 300);
        }
      }
    }
  }

  swipe(e) {
    const { canSwipe, slidesToShow } = getProps(this.props);
    if (canSwipe) {
      const clientX = e.touches ? e.touches[0].pageX : e.clientX;
      if (this.dragging) {
        let translateValue = this.width * (this.state.index + slidesToShow);
        this.distanceSwiped = clientX - this.startingClientX;
        translateValue -= this.distanceSwiped;
        this.imageContainer.style.transform = `translate(-${translateValue}px)`;
      }
    }
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
    this.allImages =
      (this.wrapper &&
        Array.prototype.slice.call(
          this.wrapper.querySelectorAll(`.images-wrap > div`),
          0
        )) ||
      [];
    const { slidesToShow } = getProps(this.props);
    this.width =
      ((this.wrapper && this.wrapper.clientWidth) || 0) / slidesToShow;
    const numberOfSlides = React.Children.count(this.props.children);
    const fullwidth = this.width * (numberOfSlides + slidesToShow * 2);
    if (this.imageContainer) {
      this.imageContainer.style.width = `${fullwidth}px`;
      this.imageContainer.style.transform = `translate(-${this.width *
        (this.state.index + slidesToShow)}px)`;
    }
    this.applySlideStyle();
  }

  componentDidUpdate(props) {
    const { autoplay, duration, children } = getProps(this.props);
    const newProps = getProps(props);
    if (autoplay !== newProps.autoplay) {
      if (autoplay) {
        this.timeout = setTimeout(() => this.goNext(), duration);
      } else {
        clearTimeout(this.timeout);
      }
    }
    if (children.length != newProps.children.length) {
      this.setWidth();
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.goNext(), duration);
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
    if (this.dragging) {
      this.endSwipe();
    } else {
      if (pauseOnHover && autoplay) {
        this.timeout = setTimeout(() => this.goNext(), duration);
      }
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
    const { slidesToScroll } = getProps(this.props);
    this.goTo(parseInt(currentTarget.dataset.key * slidesToScroll));
  }

  goTo(index) {
    this.slideImages(this.calculateIndex(index));
  }

  calculateIndex(nextIndex) {
    const { children, slidesToScroll } = getProps(this.props);
    if (
      nextIndex < children.length &&
      nextIndex + slidesToScroll > children.length
    ) {
      if ((children.length - slidesToScroll) % slidesToScroll) {
        return children.length - slidesToScroll;
      }
      return nextIndex;
    }
    return nextIndex;
  }

  goNext() {
    const { index } = this.state;
    const { children, infinite, slidesToScroll } = getProps(this.props);
    if (!infinite && index === children.length - slidesToScroll) {
      return;
    }
    const nextIndex = this.calculateIndex(index + slidesToScroll);
    this.slideImages(nextIndex);
  }

  goBack() {
    const { index } = this.state;
    const { infinite, slidesToScroll } = getProps(this.props);
    if (!infinite && index === 0) {
      return;
    }
    let previousIndex = index - slidesToScroll;
    if (previousIndex % slidesToScroll) {
      previousIndex =
        Math.ceil(previousIndex / slidesToScroll) * slidesToScroll;
    }
    this.slideImages(previousIndex);
  }

  isSlideActive(key) {
    const { slidesToShow } = getProps(this.props);
    return key < this.state.index + slidesToShow && key >= this.state.index;
  }

  renderPreceedingSlides(children, slidesToShow) {
    return children.slice(-slidesToShow).map((each, index) => (
      <div
        data-index={index - slidesToShow}
        aria-roledescription="slide"
        aria-hidden="true"
        key={index - slidesToShow}
      >
        {each}
      </div>
    ));
  }

  renderTrailingSlides(children, slidesToShow) {
    return children.slice(0, slidesToShow).map((each, index) => (
      <div
        data-index={children.length + index}
        aria-roledescription="slide"
        aria-hidden="true"
        key={children.length + index}
      >
        {each}
      </div>
    ));
  }

  render() {
    const { children, indicators, arrows, cssClass, slidesToShow } = getProps(
      this.props
    );
    const unhandledProps = getUnhandledProps(propTypes, this.props);
    const { index } = this.state;
    const style = {
      transform: `translate(-${(index + slidesToShow) * this.width}px)`
    };

    return (
      <div dir="ltr" aria-roledescription="carousel" {...unhandledProps}>
        <div
          className="react-slideshow-container"
          onMouseEnter={this.pauseSlides}
          onMouseOver={this.pauseSlides}
          onMouseLeave={this.startSlides}
          onMouseDown={this.startSwipe}
          onMouseUp={this.endSwipe}
          onMouseMove={this.swipe}
          onTouchStart={this.startSwipe}
          onTouchEnd={this.endSwipe}
          onTouchCancel={this.endSwipe}
          onTouchMove={this.swipe}
          ref={this.reactSlideshowWrapper}
        >
          {arrows &&
            showPreviousArrow(
              getProps(this.props),
              this.state.index,
              this.moveSlides
            )}
          <div
            className={`react-slideshow-wrapper slide ${cssClass}`}
            ref={ref => (this.wrapper = ref)}
          >
            <div
              className="images-wrap"
              style={style}
              ref={ref => (this.imageContainer = ref)}
            >
              {this.renderPreceedingSlides(children, slidesToShow)}
              {children.map((each, key) => {
                const isSlideActive = this.isSlideActive(key);
                return (
                  <div
                    data-index={key}
                    key={key}
                    className={isSlideActive ? 'active' : ''}
                    aria-roledescription="slide"
                    aria-hidden={isSlideActive ? 'false' : 'true'}
                  >
                    {each}
                  </div>
                );
              })}
              {this.renderTrailingSlides(children, slidesToShow)}
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

  slideImages(index, animationDuration) {
    let {
      children,
      transitionDuration,
      autoplay,
      infinite,
      duration,
      onChange,
      easing,
      slidesToShow,
      slidesToScroll
    } = getProps(this.props);
    transitionDuration = animationDuration || transitionDuration;
    const existingTweens = this.tweenGroup.getAll();
    if (!existingTweens.length) {
      clearTimeout(this.timeout);
      const value = {
        margin:
          -this.width * (this.state.index + slidesToShow) + this.distanceSwiped
      };
      const tween = new TWEEN.Tween(value, this.tweenGroup)
        .to(
          { margin: -this.width * (index + slidesToShow) },
          transitionDuration
        )
        .onUpdate(value => {
          if (this.imageContainer) {
            this.imageContainer.style.transform = `translate(${value.margin}px)`;
          }
        })
        .start();
      tween.easing(getEasing(easing));
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
        if (this.willUnmount) {
          return;
        }
        this.distanceSwiped = 0;
        let newIndex = index;
        if (newIndex < 0) {
          newIndex = children.length - slidesToScroll;
        } else if (newIndex >= children.length) {
          newIndex = 0;
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
              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => this.goNext(), duration);
            }
          }
        );
      });
    }
  }
}

export default Slideshow;
