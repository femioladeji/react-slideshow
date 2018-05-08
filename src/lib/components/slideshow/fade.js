import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as TWEEN from '@tweenjs/tween.js';

import './fade.css';

class Fade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      index: 0
    };
    this.imageRefs = [];
    this.width = 0;
    this.height = 0;
    this.timeout = null;
    this.imageContainer = null;
    this.getImageDim = this.getImageDim.bind(this);
    this.goto = this.goto.bind(this);
  }

  componentWillMount() {
    this.timeout = setTimeout(
      () => this.fadeImages(1),
      this.props.duration
    );
    this.setState({
      children: this.props.children
    });
  }

  componentDidMount() {
    this.width = document.querySelector('.react-slideshow-fade-wrapper').clientWidth;
    this.applyStyle();
    this.addResizeListener();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.setState({ unmounted: true });
  }

  getImageDim() {
    this.height = this.imageContainer.children[0].clientHeight;
    this.imageContainer.style.height = `${this.height}px`;
  }

  addResizeListener() {
    window.addEventListener('resize', () => {
      this.width = document.querySelector('.react-slideshow-fade-wrapper').clientWidth;
      this.applyStyle();
    });
  }

  applyStyle() {
    this.imageRefs.forEach((eachImage, index) => {
      eachImage.style.width = `${this.width}px`;
    });
  }

  goto({ target }) {
    this.fadeImages(parseInt(target.dataset.key));
  }

  render() {
    const { type, indicators } = this.props;
    const { children, index } = this.state;
    return (
      <div>
        <div className="react-slideshow-container">
          <div className="nav" onClick={() => this.fadeImages(index === 0 ? children.length - 1 : index - 1)}>
            {' '}&lt;{' '}
          </div>
          <div className={`react-slideshow-fade-wrapper ${type}`}>
            <div
              className="react-slideshow-fade-images-wrap"
              ref={wrap => (this.imageContainer = wrap)}
            >
              {children.map((each, key) =>
                <div
                  style={{opacity: key === index ? '1' : '0'}}
                  ref={el => {
                    this.imageRefs.push(el);
                  }}
                  onLoad={key === 0 ? this.getImageDim : null}
                  data-index={key}
                  key={key}
                >
                  {each}
                </div>
              )}
            </div>
          </div>
          <div className="nav" onClick={() => this.fadeImages((index + 1) % children.length)}>
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
                  onClick={this.goto}/>
              ))
            }
          </div>
        }
      </div>
    );
  }

  fadeImages(newIndex) {
    let { children, index } = this.state;
    clearTimeout(this.timeout);
    const value = { opacity: 0 };
    animate();
    function animate() {
      requestAnimationFrame(animate);
      TWEEN.default.update();
    }
    const tween = new TWEEN.Tween(value)
      .to({opacity: 1}, this.props.transitionDuration)
      .onUpdate((value) => {
        this.imageContainer.children[newIndex].style.opacity = value.opacity;
        this.imageContainer.children[index].style.opacity = 1 - value.opacity;
      }).start();

    setTimeout(() => {
      this.setState({
        index: newIndex
      });
      this.timeout = setTimeout(() => {
        this.fadeImages((newIndex + 1) % children.length);
      }, this.props.duration);
    }, this.props.transitionDuration);
  }
}

Fade.defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  indicators: false
};

Fade.propTypes = {
  duration: PropTypes.number,
  transitionDuration: PropTypes.number,
  indicators: PropTypes.bool
};
export default Fade;
