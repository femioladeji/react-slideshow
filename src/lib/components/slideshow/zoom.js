import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as TWEEN from '@tweenjs/tween.js';
import { getUnhandledProps } from '../../helpers.js';

import './zoom.css';

class Zoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.width = 0;
    this.timeout = null;
    this.divsContainer = null;
    this.setWidth = this.setWidth.bind(this);
    this.resizeListener = this.resizeListener.bind(this);
    this.navigate = this.navigate.bind(this);
    this.preZoom = this.preZoom.bind(this);
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
        () => this.zoomTo(index + 1),
        this.props.duration
      );
    }
  }

  componentWillUnmount() {
    this.willUnmount = true;
    clearTimeout(this.timeout);
    window.removeEventListener('resize', this.resizeListener);
  }

  componentDidUpdate(props) {
    if (this.props.children.length != props.children.length) {
      this.applyStyle();
      this.play();
    }
  }

  setWidth() {
    this.width = document.querySelector(
      '.react-slideshow-zoom-wrapper'
    ).clientWidth;
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

  navigate({ target: { dataset } }) {
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
    const { indicators, arrows, infinite, children } = this.props;
    const { index } = this.state;
    const unhandledProps = getUnhandledProps(Zoom.propTypes, this.props);
    return (
      <div {...unhandledProps}>
        <div className="react-slideshow-container">
          {arrows && (
            <div
              className={`nav ${index <= 0 && !infinite ? 'disabled' : ''}`}
              data-type="prev"
              onClick={this.preZoom}
            >
              <span />
            </div>
          )}
          <div className="react-slideshow-zoom-wrapper">
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
                >
                  {each}
                </div>
              ))}
            </div>
          </div>
          {arrows && (
            <div
              className={`nav ${
                index === children.length - 1 && !infinite ? 'disabled' : ''
              }`}
              data-type="next"
              onClick={this.preZoom}
            >
              <span />
            </div>
          )}
        </div>
        {indicators && (
          <div className="indicators">
            {children.map((each, key) => (
              <div
                key={key}
                data-key={key}
                className={index === key ? 'active' : ''}
                onClick={this.navigate}
              />
            ))}
          </div>
        )}
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
        TWEEN.default.removeAll();
        return;
      }
      requestAnimationFrame(animate);
      TWEEN.default.update();
    };

    animate();

    const tween = new TWEEN.Tween(value)
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

Zoom.defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  indicators: false,
  arrows: true,
  autoplay: true,
  infinite: true
};

Zoom.propTypes = {
  duration: PropTypes.number,
  transitionDuration: PropTypes.number,
  indicators: PropTypes.bool,
  scale: PropTypes.number.isRequired,
  arrows: PropTypes.bool,
  autoplay: PropTypes.bool,
  infinite: PropTypes.bool,
  onChange: PropTypes.func
};
export default Zoom;
