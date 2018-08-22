'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tween = require('@tweenjs/tween.js');

var TWEEN = _interopRequireWildcard(_tween);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./slide.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    _this.moveSlides = _this.moveSlides.bind(_this);
    _this.resizeListener = _this.resizeListener.bind(_this);
    _this.goToSlide = _this.goToSlide.bind(_this);
    return _this;
  }

  _createClass(Slideshow, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.allImages = document.querySelectorAll('.images-wrap div');
      this.width = document.querySelector('.react-slideshow-wrapper').clientWidth;
      this.setWidth();
      window.addEventListener('resize', this.resizeListener);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
      window.removeEventListener('resize', this.resizeListener);
    }
  }, {
    key: 'setWidth',
    value: function setWidth() {
      var fullwidth = this.width * (this.props.children.length + 2);
      this.imageContainer.style.width = fullwidth + 'px';
      this.imageContainer.style.transform = 'translate(-' + this.width * (this.state.index + 1) + 'px)';
      this.applySlideStyle();
    }
  }, {
    key: 'resizeListener',
    value: function resizeListener() {
      this.width = document.querySelector('.react-slideshow-wrapper').clientWidth;
      this.setWidth();
    }
  }, {
    key: 'applySlideStyle',
    value: function applySlideStyle() {
      var _this2 = this;

      this.allImages.forEach(function (eachImage, index) {
        eachImage.style.width = _this2.width + 'px';
      });
    }
  }, {
    key: 'moveSlides',
    value: function moveSlides(_ref) {
      var target = _ref.target;

      //check if there's disabled class
      if (target.className.includes('disabled')) {
        return;
      }
      this.preSlide(target.dataset.type);
    }
  }, {
    key: 'goToSlide',
    value: function goToSlide(_ref2) {
      var target = _ref2.target;

      this.slideImages(parseInt(target.dataset.key));
    }
  }, {
    key: 'preSlide',
    value: function preSlide(type) {
      var index = this.state.index;

      index = type === 'next' ? index + 1 : index - 1;
      this.slideImages(index);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          children = _props.children,
          duration = _props.duration,
          infinite = _props.infinite,
          indicators = _props.indicators;
      var index = this.state.index;

      var style = {
        transform: 'translate(-' + (index + 1) * this.width + 'px)'
      };
      if (infinite) {
        this.timeout = setTimeout(function () {
          return _this3.preSlide('next');
        }, duration);
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'react-slideshow-container' },
          _react2.default.createElement(
            'div',
            { className: 'nav ' + (index <= 0 && !infinite ? 'disabled' : ''), 'data-type': 'prev', onClick: this.moveSlides },
            ' ',
            '<',
            ' '
          ),
          _react2.default.createElement(
            'div',
            { className: 'react-slideshow-wrapper slide' },
            _react2.default.createElement(
              'div',
              {
                className: 'images-wrap',
                style: style,
                ref: function ref(wrap) {
                  return _this3.imageContainer = wrap;
                } },
              _react2.default.createElement(
                'div',
                { 'data-index': '-1' },
                children[children.length - 1]
              ),
              children.map(function (each, key) {
                return _react2.default.createElement(
                  'div',
                  {
                    'data-index': key,
                    key: key,
                    className: key === index ? 'active' : ''
                  },
                  each
                );
              }),
              _react2.default.createElement(
                'div',
                { 'data-index': '-1' },
                children[0]
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'nav ' + (index === children.length - 1 && !infinite ? 'disabled' : ''), 'data-type': 'next', onClick: this.moveSlides },
            ' ',
            '>',
            ' '
          )
        ),
        indicators && _react2.default.createElement(
          'div',
          { className: 'indicators' },
          children.map(function (each, key) {
            return _react2.default.createElement('div', {
              key: key,
              'data-key': key,
              className: index === key ? 'active' : '',
              onClick: _this3.goToSlide });
          })
        )
      );
    }
  }, {
    key: 'slideImages',
    value: function slideImages(index) {
      var _this4 = this;

      var _props2 = this.props,
          children = _props2.children,
          transitionDuration = _props2.transitionDuration;

      var existingTweens = TWEEN.default.getAll();
      if (!existingTweens.length) {
        var _animate = function _animate() {
          requestAnimationFrame(_animate);
          TWEEN.default.update();
        };

        clearTimeout(this.timeout);
        var value = { margin: -this.width * (this.state.index + 1) };
        var tween = new TWEEN.Tween(value).to({ margin: -this.width * (index + 1) }, transitionDuration).onUpdate(function (value) {
          _this4.imageContainer.style.transform = 'translate(' + value.margin + 'px)';
        }).start();
        _animate();

        setTimeout(function () {
          _this4.setState({
            index: index < 0 ? children.length - 1 : index >= children.length ? 0 : index
          });
        }, transitionDuration);
      }
    }
  }]);

  return Slideshow;
}(_react.Component);

Slideshow.defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  infinite: false,
  indicators: false
};

Slideshow.propTypes = {
  duration: _propTypes2.default.number,
  transitionDuration: _propTypes2.default.number,
  infinite: _propTypes2.default.bool,
  indicators: _propTypes2.default.bool
};
exports.default = Slideshow;