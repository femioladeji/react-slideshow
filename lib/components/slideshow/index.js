var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './slide.css';
import './fade.css';

var Slideshow = function (_Component) {
  _inherits(Slideshow, _Component);

  function Slideshow(props) {
    _classCallCheck(this, Slideshow);

    var _this = _possibleConstructorReturn(this, (Slideshow.__proto__ || Object.getPrototypeOf(Slideshow)).call(this, props));

    _this.getImageDim = _this.getImageDim.bind(_this);
    _this.transition = _this.transition.bind(_this);
    return _this;
  }

  _createClass(Slideshow, [{
    key: 'getImageDim',
    value: function getImageDim(_ref) {
      var target = _ref.target;

      document.querySelector('.slideshow-wrapper').style.height = target.clientHeight + 'px';
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.applyTransitionDuration();
    }
  }, {
    key: 'applySlideStyle',
    value: function applySlideStyle() {
      // const allImages = document.querySelectorAll(`.slide div`);
      // const lastIndex = allImages.length - 1;
      // allImages.forEach((eachImage, index) => {
      //   eachImage.style.left = 100*(index) + '%';
      // });
    }
  }, {
    key: 'applyTransitionDuration',
    value: function applyTransitionDuration() {
      var _this2 = this;

      var allImages = document.querySelectorAll('.slideshow-wrapper div');
      allImages.forEach(function (eachImage) {
        eachImage.style.transition = 'all ' + _this2.props.transitionDuration / 1000 + 's';
      });
    }
  }, {
    key: 'transition',
    value: function transition() {
      var type = this.props.type;

      var slideShow = document.querySelector('.' + type);
      var allImages = document.querySelectorAll('.' + type + ' div');
      if (type === 'slide') {
        this.slideImages(slideShow, allImages);
      } else if (type === 'fade') {
        this.fadeImages(slideShow, allImages);
      } else if (type === 'zoom') {
        this.zoomImages(slideShow, allImages);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          images = _props.images,
          type = _props.type,
          duration = _props.duration;

      setInterval(this.transition, duration);
      return React.createElement(
        'div',
        { className: 'slideshow-wrapper ' + type },
        images.reverse().map(function (each, key) {
          return React.createElement(
            'div',
            {
              onLoad: key === 0 ? _this3.getImageDim : null,
              'data-index': key,
              key: key
            },
            React.createElement('img', { alt: '', src: each })
          );
        })
      );
    }
  }, {
    key: 'slideImages',
    value: function slideImages(slideShow, allImages) {
      var width = allImages[0].clientWidth;
      allImages[allImages.length - 1].style.transform = 'translate(-' + width + 'px)';
      setTimeout(function () {
        allImages[allImages.length - 1].style.transform = 'translate(0)';
        slideShow.insertBefore(allImages[allImages.length - 1], allImages[0]);
      }, this.props.transitionDuration);
    }
  }, {
    key: 'fadeImages',
    value: function fadeImages(slideShow, allImages) {
      allImages[allImages.length - 1].style.opacity = '0';
      setTimeout(function () {
        allImages[allImages.length - 1].style.opacity = '1';
        slideShow.insertBefore(allImages[allImages.length - 1], allImages[0]);
      }, this.props.transitionDuration);
    }
  }, {
    key: 'zoomImages',
    value: function zoomImages(slideShow, allImages) {
      var scale = this.props.direction === 'in' ? 0.7 : 1.3;
      allImages[allImages.length - 1].style.opacity = '0';
      allImages[allImages.length - 1].style.transform = 'scale(' + scale + ')';
      setTimeout(function () {
        allImages[allImages.length - 1].style.opacity = '1';
        allImages[allImages.length - 1].style.transform = 'scale(1)';
        slideShow.insertBefore(allImages[allImages.length - 1], allImages[0]);
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