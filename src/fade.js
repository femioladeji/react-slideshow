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

class Fade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index:
        props.defaultIndex && props.defaultIndex < props.children.length
          ? props.defaultIndex
          : 0
    };
    this.width = 0;
    this.timeout = null;
    this.divsContainer = null;
    this.wrapper = null;
    this.setWidth = this.setWidth.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.navigate = this.navigate.bind(this);
    this.preFade = this.preFade.bind(this);
    this.pauseSlides = this.pauseSlides.bind(this);
    this.startSlides = this.startSlides.bind(this);
    this.initResizeObserver = this.initResizeObserver.bind(this);
    this.tweenGroup = new TWEEN.Group();
    this.reactSlideshowWrapper = createRef();
    this.wrapper = createRef();
  }

  componentDidMount() {
    this.setWidth();
    this.play();
    this.initResizeObserver();
    validatePropTypes(this.props);
  }

  initResizeObserver() {
    this.resizeObserver = new ResizeObserver(entries => {
      if (!entries) return;
      this.handleResize();
    });
    this.resizeObserver.observe(this.reactSlideshowWrapper.current);
  }

  play() {
    const { autoplay, children, duration } = getProps(this.props);
    const { index } = this.state;
    if (autoplay && children.length > 1) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(
        () => this.fadeImages(index + 1),
        duration
      );
    }
  }

  componentDidUpdate(props) {
    const { autoplay, children } = getProps(this.props);
    if (autoplay !== props.autoplay) {
      if (autoplay) {
        this.play();
      } else {
        clearTimeout(this.timeout);
      }
    }
    if (children.length != props.children.length) {
      this.applyStyle();
      this.play();
    }
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
    this.width = this.wrapper.current.clientWidth;
    this.applyStyle();
  }

  handleResize() {
    this.setWidth();
  }

  applyStyle() {
    const fullwidth = this.width * this.props.children.length;
    this.divsContainer.style.width = `${fullwidth}px`;
    for (let index = 0; index < this.divsContainer.children.length; index++) {
      const eachDiv = this.divsContainer.children[index];
      if (eachDiv) {
        eachDiv.style.width = `${this.width}px`;
        eachDiv.style.left = `${index * -this.width}px`;
      }
    }
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

  goNext() {
    const { index } = this.state;
    const { children, infinite } = getProps(this.props);
    if (!infinite && index === children.length - 1) {
      return;
    }
    this.fadeImages((index + 1) % children.length);
  }

  goBack() {
    const { index } = this.state;
    const { children, infinite } = getProps(this.props);
    if (!infinite && index === 0) {
      return;
    }
    this.fadeImages(index === 0 ? children.length - 1 : index - 1);
  }

  navigate({ currentTarget: { dataset } }) {
    if (dataset.key != this.state.index) {
      this.goTo(parseInt(dataset.key));
    }
  }

  goTo(index) {
    this.fadeImages(index);
  }

  preFade({ currentTarget }) {
    if (currentTarget.dataset.type === 'prev') {
      this.goBack();
    } else {
      this.goNext();
    }
  }

  render() {
    const { indicators, children, arrows } = getProps(this.props);
    const { index } = this.state;
    const unhandledProps = getUnhandledProps(propTypes, this.props);
    return (
      <div aria-roledescription="carousel" {...unhandledProps}>
        <div
          className="react-slideshow-container"
          onMouseEnter={this.pauseSlides}
          onMouseOver={this.pauseSlides}
          onMouseLeave={this.startSlides}
          ref={this.reactSlideshowWrapper}
        >
          {arrows &&
            showPreviousArrow(getProps(this.props), this.state.index, this.preFade)}
          <div className="react-slideshow-fade-wrapper" ref={this.wrapper}>
            <div
              className="react-slideshow-fade-images-wrap"
              ref={wrap => (this.divsContainer = wrap)}
            >
              {children.map((each, key) => (
                <div
                  style={{
                    opacity: key === index ? '1' : '0',
                    zIndex: key === index ? '1' : '0'
                  }}
                  data-index={key}
                  key={key}
                  aria-roledescription="slide"
                  aria-hidden={key === index ? 'false' : 'true'}
                >
                  {each}
                </div>
              ))}
            </div>
          </div>
          {arrows && showNextArrow(getProps(this.props), this.state.index, this.preFade)}
        </div>
        {indicators &&
          showIndicators(getProps(this.props), this.state.index, this.navigate)}
      </div>
    );
  }

  fadeImages(newIndex) {
    const { index } = this.state;
    const {
      autoplay,
      children,
      infinite,
      duration,
      transitionDuration,
      onChange,
      easing
    } = getProps(this.props);
    const existingTweens = this.tweenGroup.getAll();
    if (!existingTweens.length) {
      if (!this.divsContainer.children[newIndex]) {
        newIndex = 0;
      }
      clearTimeout(this.timeout);
      const value = { opacity: 0 };

      const animate = () => {
        if (this.willUnmount) {
          this.tweenGroup.removeAll();
          return;
        }
        requestAnimationFrame(animate);
        this.tweenGroup.update();
      };

      animate();

      const tween = new TWEEN.Tween(value, this.tweenGroup)
        .to({ opacity: 1 }, transitionDuration)
        .onUpdate(value => {
          this.divsContainer.children[newIndex].style.opacity = value.opacity;
          this.divsContainer.children[index].style.opacity = 1 - value.opacity;
        })
        .start();
      tween.easing(getEasing(easing));
      tween.onComplete(() => {
        if (this.willUnmount) {
          return;
        }
        this.setState({
          index: newIndex
        });
        if (typeof onChange === 'function') {
          onChange(index, newIndex);
        }
        if (autoplay && (infinite || newIndex < children.length - 1)) {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.fadeImages((newIndex + 1) % children.length);
          }, duration);
        }
      });
    }
  }
}

export default Fade;
