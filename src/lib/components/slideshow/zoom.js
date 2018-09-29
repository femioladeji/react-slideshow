import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as TWEEN from '@tweenjs/tween.js';

import './zoom.css';

class Zoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: [],
      index: 0
    };
    this.divRefs = [];
    this.width = 0;
    this.height = 0;
    this.timeout = null;
    this.divsContainer = null;
    this.getImageDim = this.getImageDim.bind(this);
    this.resizeListener = this.resizeListener.bind(this);
    this.goto = this.goto.bind(this);
  }

  componentWillMount() {
    this.timeout = setTimeout(
      () => this.zoomTo(1),
      this.props.duration
    );
    this.setState({
      children: this.props.children
    });
  }

  componentDidMount() {
    this.width = document.querySelector('.react-slideshow-zoom-wrapper').clientWidth;
    window.addEventListener('resize', this.resizeListener)
  }

  componentWillUnmount() {
    this.willUnmount = true;
    clearTimeout(this.timeout);
    window.removeEventListener('resize', this.resizeListener);
  }

  getImageDim() {
    this.height = this.divsContainer.children[0].clientHeight;
    this.divsContainer.style.height = `${this.height}px`;
    this.applyStyle();
  }

  resizeListener() {
    this.width = document.querySelector('.react-slideshow-zoom-wrapper').clientWidth;
    this.height = this.divsContainer.children[0].clientHeight;
    this.divsContainer.style.height = `${this.height}px`;
    this.applyStyle();
  }

  applyStyle() {
    this.divRefs.forEach((eachDiv, index) => {
      if (eachDiv) {
        eachDiv.style.width = `${this.width}px`;
        eachDiv.style.height = `${this.height}px`;
      }
    });
  }

  goto({ target }) {
    this.zoomTo(parseInt(target.dataset.key));
  }

  render() {
    const { indicators } = this.props;
    const { children, index } = this.state;
    return (
      <div>
        <div className="react-slideshow-container">
          <div className="nav" onClick={() => this.zoomTo(index === 0 ? children.length - 1 : index - 1)}>
            {' '}&lt;{' '}
          </div>
          <div className="react-slideshow-zoom-wrapper">
            <div
              className="zoom-wrapper"
              ref={wrap => (this.divsContainer = wrap)}
            >
              {children.map((each, key) =>
                <div
                  style={{opacity: key === index ? '1' : '0'}}
                  ref={el => {
                    this.divRefs.push(el);
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
          <div className="nav" onClick={() => this.zoomTo((index + 1) % children.length)}>
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

  zoomTo(newIndex) {
    let { children, index } = this.state;
    const { scale, onChange } = this.props;
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
      .to({opacity: 1, scale}, this.props.transitionDuration)
      .onUpdate((value) => {
        this.divsContainer.children[newIndex].style.opacity = value.opacity;
        this.divsContainer.children[index].style.opacity = 1 - value.opacity;
        this.divsContainer.children[index].style.transform = `scale(${value.scale})`;
      }).start();

    tween.onComplete(() => {
      if (this.willUnmount) {
        return;
      }
      this.setState({
        index: newIndex
      }, () => {
        this.divsContainer.children[index].style.transform = `scale(1)`;
      });
      this.timeout = setTimeout(() => {
        this.zoomTo((newIndex + 1) % children.length);
      }, this.props.duration);
      
      try{
        if(typeof(onChange) === "function"){
          onChange(index);
        }
      }
      catch(e){ console.error(e) }
    });
  }
}

Zoom.defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  indicators: false
};

Zoom.propTypes = {
  duration: PropTypes.number,
  transitionDuration: PropTypes.number,
  indicators: PropTypes.bool,
  scale: PropTypes.number.isRequired
};
export default Zoom;
