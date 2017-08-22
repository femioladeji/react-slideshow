var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './slide.css';

var Slideshow = function (_Component) {
  _inherits(Slideshow, _Component);

  function Slideshow(props) {
    _classCallCheck(this, Slideshow);

    var _this = _possibleConstructorReturn(this, (Slideshow.__proto__ || Object.getPrototypeOf(Slideshow)).call(this, props));

    _this.state = {
      index: 0
    };
    _this.width = 0;
    _this.imageContainer = null;
    _this.timeout = null;
    return _this;
  }

  _createClass(Slideshow, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.allImages = document.querySelectorAll('.images-wrap div');
      this.width = document.querySelector('.slideshow-wrapper').clientWidth;
      this.setWidth();
      this.addResizeListener();
    }
  }, {
    key: 'setWidth',
    value: function setWidth() {
      var fullwidth = this.width * (this.props.images.length + 2);
      this.imageContainer.style.width = fullwidth + 'px';
      this.imageContainer.style.transform = 'translate(-' + this.width * (this.state.index + 1) + 'px)';
      this.applySlideStyle();
    }
  }, {
    key: 'addResizeListener',
    value: function addResizeListener() {
      var _this2 = this;

      window.addEventListener('resize', function () {
        _this2.width = document.querySelector('.slideshow-wrapper').clientWidth;
        _this2.setWidth();
      });
    }
  }, {
    key: 'applySlideStyle',
    value: function applySlideStyle() {
      var _this3 = this;

      this.allImages.forEach(function (eachImage, index) {
        eachImage.style.width = _this3.width + 'px';
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          images = _props.images,
          type = _props.type,
          duration = _props.duration;
      var index = this.state.index;

      var style = {
        transform: 'translate(-' + (index + 1) * this.width + 'px)'
      };
      this.timeout = setTimeout(function () {
        return _this4.slideImages('next');
      }, duration);
      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'nav', onClick: function onClick() {
              return _this4.slideImages('prev');
            } },
          ' ',
          '<',
          ' '
        ),
        React.createElement(
          'div',
          { className: 'slideshow-wrapper ' + type },
          React.createElement(
            'div',
            {
              className: 'images-wrap',
              style: style,
              ref: function ref(wrap) {
                return _this4.imageContainer = wrap;
              }
            },
            React.createElement(
              'div',
              { 'data-index': '-1' },
              React.createElement('img', { alt: '', src: images[images.length - 1] })
            ),
            images.map(function (each, key) {
              return React.createElement(
                'div',
                {
                  'data-index': key,
                  key: key,
                  className: key === index ? 'active' : ''
                },
                React.createElement('img', { alt: '', src: each })
              );
            }),
            React.createElement(
              'div',
              { 'data-index': '-1' },
              React.createElement('img', { alt: '', src: images[0] })
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'nav', onClick: function onClick() {
              return _this4.slideImages('next');
            } },
          ' ',
          '>',
          ' '
        )
      );
    }
  }, {
    key: 'slideImages',
    value: function slideImages(type) {
      var _this5 = this;

      var index = this.state.index;
      var images = this.props.images;

      clearTimeout(this.timeout);
      index = type === 'next' ? index + 1 : index - 1;
      this.imageContainer.style.transition = 'all ' + this.props.transitionDuration / 1000 + 's';
      this.imageContainer.style.transform = 'translate(-' + this.width * (index + 1) + 'px)';
      setTimeout(function () {
        _this5.imageContainer.style.transition = 'none';
        _this5.setState({
          index: index < 0 ? images.length - 1 : index >= images.length ? 0 : index
        });
      }, this.props.transitionDuration);
    }
  }]);

  return Slideshow;
}(Component);

Slideshow.defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  type: 'slide'
};

Slideshow.PropTypes = {
  images: PropTypes.array.isRequired,
  duration: PropTypes.number,
  transitionDuration: PropTypes.transitionDuration,
  type: PropTypes.string
};
export default Slideshow;