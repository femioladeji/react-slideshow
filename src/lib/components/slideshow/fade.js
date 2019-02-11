import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as TWEEN from '@tweenjs/tween.js';
import { getUnhandledProps } from '../../helpers.js';
import './fade.css';

class Fade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      index: 0
    };
    this.width = 0;
    this.timeout = null;
    this.divsContainer = null;
    this.setWidth = this.setWidth.bind(this);
    this.resizeListener = this.resizeListener.bind(this);
    this.goto = this.goto.bind(this);
    this.preFade = this.preFade.bind(this);
  }

  componentWillMount() {
    if (this.props.autoplay) {
      this.timeout = setTimeout(() => this.fadeImages(1), this.props.duration);
    }
    this.setState({
      children: this.props.children
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.setWidth();
  }

  componentWillUnmount() {
    this.willUnmount = true;
    clearTimeout(this.timeout);
    window.removeEventListener('resize', this.resizeListener);
  }

  setWidth() {
    this.width = document.querySelector(
      '.react-slideshow-fade-wrapper'
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

  goto({ target }) {
    if (target.dataset.key != this.state.index) {
      this.fadeImages(parseInt(target.dataset.key));
    }
  }

  preFade({ target }) {
    if (target.className.includes('disabled')) {
      return;
    }
    const { index, children } = this.state;
    if (target.dataset.type === 'prev') {
      this.fadeImages(index === 0 ? children.length - 1 : index - 1);
    } else {
      this.fadeImages((index + 1) % children.length);
    }
  }

  render() {
    const { indicators, arrows, infinite } = this.props;
    const { children, index } = this.state;
    const unhandledProps = getUnhandledProps(Fade.propTypes, this.props);
    return (
      <div {...unhandledProps}>
        <div className="react-slideshow-container">
          {arrows && (
            <div
              className={`nav ${index <= 0 && !infinite ? 'disabled' : ''}`}
              data-type="prev"
              onClick={this.preFade}
            >
              <span />
            </div>
          )}
          <div className="react-slideshow-fade-wrapper">
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
              className={`nav ${
                index === children.length - 1 && !infinite ? 'disabled' : ''
              }`}
              data-type="next"
              onClick={this.preFade}
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
                onClick={this.goto}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  fadeImages(newIndex) {
    let { children, index } = this.state;
    const { autoplay, infinite, duration, transitionDuration } = this.props;
    clearTimeout(this.timeout);
    const value = { opacity: 0 };

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
      if (autoplay && (infinite || newIndex < children.length - 1)) {
        this.timeout = setTimeout(() => {
          this.fadeImages((newIndex + 1) % children.length);
        }, duration);
      }
    });
  }
}

Fade.defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  indicators: false,
  arrows: true,
  autoplay: true,
  infinite: true
};

Fade.propTypes = {
  duration: PropTypes.number,
  transitionDuration: PropTypes.number,
  indicators: PropTypes.bool,
  arrows: PropTypes.bool,
  autoplay: PropTypes.bool,
  infinite: PropTypes.bool
};
export default Fade;
