import React, { Component, createRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import PropTypes from 'prop-types';
import TWEEN from '@tweenjs/tween.js';
import {
  getUnhandledProps,
  showNextArrow,
  showPreviousArrow,
  showIndicators
} from './helpers.js';

class Zoom extends Component {
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
    this.preZoom = this.preZoom.bind(this);
    this.pauseSlides = this.pauseSlides.bind(this);
    this.startSlides = this.startSlides.bind(this);
    this.tweenGroup = new TWEEN.Group();
    this.initResizeObserver = this.initResizeObserver.bind(this);
    this.reactSlideshowWrapper = createRef();
  }

  componentDidMount() {
    this.setWidth();
    this.play();
    this.initResizeObserver();
  }

  initResizeObserver() {
    this.resizeObserver = new ResizeObserver(entries => {
      if (!entries) return;
      this.handleResize();
    });
    this.resizeObserver.observe(this.reactSlideshowWrapper.current);
  }

  play() {
    const { autoplay, children } = this.props;
    const { index } = this.state;
    if (autoplay && children.length > 1) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(
        () => this.zoomTo(index + 1),
        this.props.duration
      );
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

  componentDidUpdate(props) {
    if (this.props.autoplay !== props.autoplay) {
      if (this.props.autoplay) {
        this.play();
      } else {
        clearTimeout(this.timeout);
      }
    }
    if (this.props.children.length != props.children.length) {
      this.applyStyle();
      this.play();
    }
  }

  setWidth() {
    this.width = this.wrapper.clientWidth;
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

  goNext() {
    const { index } = this.state;
    const { children, infinite } = this.props;
    if (!infinite && index === children.length - 1) {
      return;
    }
    this.zoomTo((index + 1) % children.length);
  }

  goBack() {
    const { index } = this.state;
    const { children, infinite } = this.props;
    if (!infinite && index === 0) {
      return;
    }
    this.zoomTo(index === 0 ? children.length - 1 : index - 1);
  }

  goTo(index) {
    this.zoomTo(index);
  }

  navigate({ currentTarget: { dataset } }) {
    if (dataset.key != this.state.index) {
      this.goTo(parseInt(dataset.key));
    }
  }

  preZoom({ currentTarget }) {
    if (currentTarget.dataset.type === 'prev') {
      this.goBack();
    } else {
      this.goNext();
    }
  }

  render() {
    const { indicators, arrows, children } = this.props;
    const { index } = this.state;
    const unhandledProps = getUnhandledProps(Zoom.propTypes, this.props);
    return (
      <div aria-roledescription="carousel" {...unhandledProps}>
        <div
          className="react-slideshow-container"
          onMouseEnter={this.pauseSlides}
          onMouseLeave={this.startSlides}
          ref={this.reactSlideshowWrapper}
        >
          {arrows &&
            showPreviousArrow(this.props, this.state.index, this.preZoom)}
          <div
            className="react-slideshow-zoom-wrapper"
            ref={ref => (this.wrapper = ref)}
          >
            <div
              className="zoom-wrapper"
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
          {arrows && showNextArrow(this.props, this.state.index, this.preZoom)}
        </div>
        {indicators &&
          showIndicators(this.props, this.state.index, this.navigate)}
      </div>
    );
  }

  zoomTo(newIndex) {
    const { index } = this.state;
    const {
      children,
      scale,
      autoplay,
      infinite,
      transitionDuration,
      duration,
      onChange
    } = this.props;
    const existingTweens = this.tweenGroup.getAll();
    if (!existingTweens.length) {
      if (!this.divsContainer.children[newIndex]) {
        newIndex = 0;
      }
      clearTimeout(this.timeout);
      const value = {
        opacity: 0,
        scale: 1
      };

      let animate = () => {
        if (this.willUnmount) {
          this.tweenGroup.removeAll();
          return;
        }
        requestAnimationFrame(animate);
        this.tweenGroup.update();
      };

      animate();

      const tween = new TWEEN.Tween(value, this.tweenGroup)
        .to({ opacity: 1, scale }, transitionDuration)
        .onUpdate(value => {
          this.divsContainer.children[newIndex].style.opacity = value.opacity;
          this.divsContainer.children[index].style.opacity = 1 - value.opacity;
          this.divsContainer.children[
            index
          ].style.transform = `scale(${value.scale})`;
        })
        .start();

      tween.onComplete(() => {
        if (this.willUnmount) {
          return;
        }
        if (typeof onChange === 'function') {
          onChange(index, newIndex);
        }
        this.setState(
          {
            index: newIndex
          },
          () => {
            this.divsContainer.children[index].style.transform = `scale(1)`;
          }
        );
        if (autoplay && (infinite || newIndex < children.length - 1)) {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.zoomTo((newIndex + 1) % children.length);
          }, duration);
        }
      });
    }
  }
}

Zoom.defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  defaultIndex: 0,
  indicators: false,
  arrows: true,
  autoplay: true,
  infinite: true,
  pauseOnHover: true
};

Zoom.propTypes = {
  duration: PropTypes.number,
  transitionDuration: PropTypes.number,
  defaultIndex: PropTypes.number,
  indicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  scale: PropTypes.number.isRequired,
  arrows: PropTypes.bool,
  autoplay: PropTypes.bool,
  infinite: PropTypes.bool,
  onChange: PropTypes.func,
  pauseOnHover: PropTypes.bool,
  prevArrow: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  nextArrow: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};
export default Zoom;
