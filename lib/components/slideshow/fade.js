'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./fade.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fade = function (_Component) {
  _inherits(Fade, _Component);

  function Fade(props) {
    _classCallCheck(this, Fade);

    var _this = _possibleConstructorReturn(this, (Fade.__proto__ || Object.getPrototypeOf(Fade)).call(this, props));

    _this.state = {
      images: []
    };
    _this.imageRefs = [];
    _this.width = 0;
    _this.height = 0;
    _this.timeout = null;
    _this.imageContainer = null;
    _this.getImageDim = _this.getImageDim.bind(_this);
    return _this;
  }

  _createClass(Fade, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.timeout = setTimeout(function () {
        return _this2.fadeImages('next');
      }, this.props.duration);
      this.setState({
        images: this.props.images.reverse()
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.width = document.querySelector('.react-slideshow-fade-wrapper').clientWidth;
      this.applyStyle();
      this.addResizeListener();
    }
  }, {
    key: 'getImageDim',
    value: function getImageDim() {
      this.height = this.imageContainer.children[0].clientHeight;
      this.imageContainer.style.height = this.height + 'px';
    }
  }, {
    key: 'addResizeListener',
    value: function addResizeListener() {
      var _this3 = this;

      window.addEventListener('resize', function () {
        _this3.width = document.querySelector('.react-slideshow-fade-wrapper').clientWidth;
        _this3.applyStyle();
      });
    }
  }, {
    key: 'applyStyle',
    value: function applyStyle() {
      var _this4 = this;

      this.imageRefs.forEach(function (eachImage, index) {
        eachImage.style.width = _this4.width + 'px';
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var type = this.props.type;
      var images = this.state.images;

      return _react2.default.createElement(
        'div',
        { className: 'react-slideshow-container' },
        _react2.default.createElement(
          'div',
          { className: 'nav', onClick: function onClick() {
              return _this5.fadeImages('prev');
            } },
          ' ',
          '<',
          ' '
        ),
        _react2.default.createElement(
          'div',
          { className: 'react-slideshow-fade-wrapper ' + type },
          _react2.default.createElement(
            'div',
            {
              className: 'images-wrap',
              ref: function ref(wrap) {
                return _this5.imageContainer = wrap;
              }
            },
            images.map(function (each, key) {
              return _react2.default.createElement(
                'div',
                {
                  ref: function ref(el) {
                    _this5.imageRefs.push(el);
                  },
                  onLoad: key === 0 ? _this5.getImageDim : null,
                  'data-index': key,
                  key: key
                },
                _react2.default.createElement('img', { alt: '', src: each })
              );
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'nav', onClick: function onClick() {
              return _this5.fadeImages('next');
            } },
          ' ',
          '>',
          ' '
        )
      );
    }
  }, {
    key: 'fadeImages',
    value: function fadeImages(type) {
      var _this6 = this;

      var images = this.state.images;

      var newImageArr = [];
      clearTimeout(this.timeout);
      var lastImage = this.imageContainer.children[images.length - 1];
      if (type === 'prev') {
        newImageArr = images.slice(1);
        newImageArr.splice(newImageArr.length - 1, 0, images[0]);
        this.setState({ images: newImageArr });
        newImageArr = images.slice(1, images.length);
        newImageArr.splice(newImageArr.length, 0, images[0]);
      } else {
        newImageArr = [images[images.length - 1]].concat(images.slice(0, images.length - 1));
      }
      lastImage.style.transition = 'all ' + this.props.transitionDuration / 1000 + 's';
      lastImage.style.opacity = '0';
      setTimeout(function () {
        lastImage.style.opacity = '1';
        lastImage.style.transition = 'none';
        _this6.timeout = setTimeout(function () {
          return _this6.fadeImages('next');
        }, _this6.props.duration);
        _this6.setState({ images: newImageArr });
      }, this.props.transitionDuration);
    }
  }]);

  return Fade;
}(_react.Component);

Fade.defaultProps = {
  duration: 5000,
  transitionDuration: 1000
};

Fade.propTypes = {
  images: _propTypes2.default.array.isRequired,
  duration: _propTypes2.default.number,
  transitionDuration: _propTypes2.default.number
};
exports.default = Fade;