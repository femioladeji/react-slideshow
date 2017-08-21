import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './slide.css';

class Fade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.imageRefs = [];
    this.width = 0;
    this.height = 0;
    this.timeout = null;
    this.getImageDim = this.getImageDim.bind(this);
  }

  componentDidMount() {
    this.width = document.querySelector('.fade-wrapper').clientWidth;
    this.applyStyle();
    this.addResizeListener();
  }

  getImageDim() {
    this.height = document.querySelector('.images-wrap div').clientHeight;
    document.querySelector('.images-wrap').style.height = `${this.height}px`;
  }

  addResizeListener() {
    window.addEventListener('resize', () => {
      this.width = document.querySelector('.fade-wrapper').clientWidth;
      this.applyStyle();
    });
  }

  applyStyle() {
    this.imageRefs.forEach((eachImage, index) => {
      eachImage.style.width = `${this.width}px`;
      // eachImage.style.transition = `all ${this.props.transitionDuration/1000}s`;
      // eachImage.style.opacity = (index === 0) ? 1 : 0;
    });
  }

  render() {
    const { images, type, duration } = this.props;
    const { index } = this.state;
    // this.timeout = setTimeout(() => this.fadeImages('next'), duration);
    return (
      <div className="container">
        <div className="nav" onClick={() => this.fadeImages('prev')}>
          {' '}&lt;{' '}
        </div>
        <div className={`fade-wrapper ${type}`}>
          <div className="images-wrap">
            {images.reverse().map((each, key) =>
              <div
                ref={el => {
                  this.imageRefs.push(el);
                }}
                onLoad={key === 0 ? this.getImageDim : null}
                data-index={key}
                key={key}
                className={key === index ? 'active' : ''}
              >
                <img alt="" src={each} />
              </div>
            )}
          </div>
        </div>
        <div className="nav" onClick={() => this.fadeImages('next')}>
          {' '}&gt;{' '}
        </div>
      </div>
    );
  }

  fadeImages(type) {
    let { images } = this.props;
    clearTimeout(this.timeout);
    const lastImage = document.querySelectorAll('.images-wrap div')[
      images.length - 1
    ];
    const firstImage = document.querySelectorAll('.images-wrap div')[0];
    if (type === 'prev') {
      document
        .querySelector('.images-wrap')
        .insertBefore(firstImage, lastImage);
    }
    lastImage.style.transition = `all ${this.props.transitionDuration / 1000}s`;
    lastImage.style.opacity = '0';
    setTimeout(() => {
      lastImage.style.opacity = '1';
      lastImage.style.transition = 'none';
      document
        .querySelector('.images-wrap')
        .insertBefore(lastImage, firstImage);
    }, this.props.transitionDuration);
  }
}

Fade.defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  type: 'slide'
};

Fade.PropTypes = {
  images: PropTypes.array.isRequired,
  duration: PropTypes.number,
  transitionDuration: PropTypes.transitionDuration,
  type: PropTypes.string
};
export default Fade;
