'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./slide.css');

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
    return _this;
  }

  _createClass(Slideshow, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.allImages = document.querySelectorAll('.images-wrap div');
      this.width = document.querySelector('.react-slideshow-wrapper').clientWidth;
      this.setWidth();
      this.addResizeListener();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
      this.setState({ unmounted: true });
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
        _this2.width = document.querySelector('.react-slideshow-wrapper').clientWidth;
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
          duration = _props.duration;
      var index = this.state.index;

      var style = {
        transform: 'translate(-' + (index + 1) * this.width + 'px)'
      };
      this.timeout = setTimeout(function () {
        return _this4.slideImages('next');
      }, duration);
      return _react2.default.createElement(
        'div',
        { className: 'react-slideshow-container' },
        _react2.default.createElement(
          'div',
          { className: 'nav', onClick: function onClick() {
              return _this4.slideImages('prev');
            } },
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
                return _this4.imageContainer = wrap;
              }
            },
            _react2.default.createElement(
              'div',
              { 'data-index': '-1' },
              _react2.default.createElement('img', { alt: '', src: images[images.length - 1] })
            ),
            images.map(function (each, key) {
              return _react2.default.createElement(
                'div',
                {
                  'data-index': key,
                  key: key,
                  className: key === index ? 'active' : ''
                },
                _react2.default.createElement('img', { alt: '', src: each })
              );
            }),
            _react2.default.createElement(
              'div',
              { 'data-index': '-1' },
              _react2.default.createElement('img', { alt: '', src: images[0] })
            )
          )
        ),
        _react2.default.createElement(
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
      if (this.state.unmounted || !this.imageContainer) return;
      index = type === 'next' ? index + 1 : index - 1;
      this.imageContainer.style.transition = 'all ' + this.props.transitionDuration / 1000 + 's';
      this.imageContainer.style.transform = 'translate(-' + this.width * (index + 1) + 'px)';
      setTimeout(function () {
        if (_this5.state.unmounted || !_this5.imageContainer) return;
        _this5.imageContainer.style.transition = 'none';
        _this5.setState({
          index: index < 0 ? images.length - 1 : index >= images.length ? 0 : index
        });
      }, this.props.transitionDuration);
    }
  }]);

  return Slideshow;
}(_react.Component);

Slideshow.defaultProps = {
  duration: 5000,
  transitionDuration: 1000
};

Slideshow.propTypes = {
  images: _propTypes2.default.array.isRequired,
  duration: _propTypes2.default.number,
  transitionDuration: _propTypes2.default.number
};
exports.default = Slideshow;