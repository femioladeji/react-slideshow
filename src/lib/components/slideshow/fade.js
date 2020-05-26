import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TWEEN from '@tweenjs/tween.js';
import { getUnhandledProps } from '../../helpers.js';
import './fade.css';

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
    this.resizeListener = this.resizeListener.bind(this);
    this.navigate = this.navigate.bind(this);
    this.preFade = this.preFade.bind(this);
    this.pauseSlides = this.pauseSlides.bind(this);
    this.startSlides = this.startSlides.bind(this);
    this.tweenGroup = new TWEEN.Group();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.setWidth();
    this.play();
  }

  play() {
    const { autoplay, children } = this.props;
    const { index } = this.state;
    if (autoplay && children.length > 1) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(
        () => this.fadeImages(index + 1),
        this.props.duration
      );
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

  componentWillUnmount() {
    this.willUnmount = true;
    clearTimeout(this.timeout);
    window.removeEventListener('resize', this.resizeListener);
  }

  setWidth() {
    this.width = this.wrapper.clientWidth;
    this.applyStyle();
  }

  resizeListener() {
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
    this.fadeImages((index + 1) % children.length);
  }

  goBack() {
    const { index } = this.state;
    const { children, infinite } = this.props;
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

  showIndicators() {
    const isCustomIndicator = typeof this.props.indicators !== 'boolean';
    const className = !isCustomIndicator && 'each-slideshow-indicator';
    return (
      <div className="indicators">
        {this.props.children.map((each, key) => (
          <div
            key={key}
            data-key={key}
            className={`${className} ${this.state.index === key && 'active'}`}
            onClick={this.navigate}
          >
            {isCustomIndicator && this.props.indicators(key)}
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { indicators, arrows, infinite, children } = this.props;
    const { index } = this.state;
    const unhandledProps = getUnhandledProps(Fade.propTypes, this.props);
    return (
      <div {...unhandledProps}>
        <div
          className="react-slideshow-container"
          onMouseEnter={this.pauseSlides}
          onMouseLeave={this.startSlides}
        >
          {arrows && (
            <div
              className={`nav ${index <= 0 && !infinite && 'disabled'}`}
              data-type="prev"
              onClick={this.preFade}
            >
              <span />
            </div>
          )}
          <div
            className="react-slideshow-fade-wrapper"
            ref={ref => (this.wrapper = ref)}
          >
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
                >
                  {each}
                </div>
              ))}
            </div>
          </div>
          {arrows && (
            <div
              className={`nav ${index === children.length - 1 &&
                !infinite &&
                'disabled'}`}
              data-type="next"
              onClick={this.preFade}
            >
              <span />
            </div>
          )}
        </div>
        {indicators && this.showIndicators()}
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
      onChange
    } = this.props;
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

Fade.defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  defaultIndex: 0,
  indicators: false,
  arrows: true,
  autoplay: true,
  infinite: true,
  pauseOnHover: false
};

Fade.propTypes = {
  duration: PropTypes.number,
  transitionDuration: PropTypes.number,
  defaultIndex: PropTypes.number,
  indicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  arrows: PropTypes.bool,
  autoplay: PropTypes.bool,
  infinite: PropTypes.bool,
  onChange: PropTypes.func,
  pauseOnHover: PropTypes.bool
};
export default Fade;
