'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tween = require('@tweenjs/tween.js');

var TWEEN = _interopRequireWildcard(_tween);

var _helpers = require('../../helpers.js');

require('./fade.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
      children: [],
      index: 0
    };
    _this.width = 0;
    _this.timeout = null;
    _this.divsContainer = null;
    _this.setWidth = _this.setWidth.bind(_this);
    _this.resizeListener = _this.resizeListener.bind(_this);
    _this.goto = _this.goto.bind(_this);
    _this.preFade = _this.preFade.bind(_this);
    return _this;
  }

  _createClass(Fade, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      if (this.props.autoplay) {
        this.timeout = setTimeout(function () {
          return _this2.fadeImages(1);
        }, this.props.duration);
      }
      this.setState({
        children: this.props.children
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this.resizeListener);
      this.setWidth();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.willUnmount = true;
      clearTimeout(this.timeout);
      window.removeEventListener('resize', this.resizeListener);
    }
  }, {
    key: 'setWidth',
    value: function setWidth() {
      this.width = document.querySelector('.react-slideshow-fade-wrapper').clientWidth;
      this.applyStyle();
    }
  }, {
    key: 'resizeListener',
    value: function resizeListener() {
      this.setWidth();
    }
  }, {
    key: 'applyStyle',
    value: function applyStyle() {
      var fullwidth = this.width * this.props.children.length;
      this.divsContainer.style.width = fullwidth + 'px';
      for (var index = 0; index < this.divsContainer.children.length; index++) {
        var eachDiv = this.divsContainer.children[index];
        if (eachDiv) {
          eachDiv.style.width = this.width + 'px';
          eachDiv.style.left = index * -this.width + 'px';
        }
      }
    }
  }, {
    key: 'goto',
    value: function goto(_ref) {
      var target = _ref.target;

      if (target.dataset.key != this.state.index) {
        this.fadeImages(parseInt(target.dataset.key));
      }
    }
  }, {
    key: 'preFade',
    value: function preFade(_ref2) {
      var target = _ref2.target;

      if (target.className.includes('disabled')) {
        return;
      }
      var _state = this.state,
          index = _state.index,
          children = _state.children;

      if (target.dataset.type === 'prev') {
        this.fadeImages(index === 0 ? children.length - 1 : index - 1);
      } else {
        this.fadeImages((index + 1) % children.length);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          indicators = _props.indicators,
          arrows = _props.arrows,
          infinite = _props.infinite;
      var _state2 = this.state,
          children = _state2.children,
          index = _state2.index;

      var unhandledProps = (0, _helpers.getUnhandledProps)(Fade.propTypes, this.props);
      return _react2.default.createElement(
        'div',
        unhandledProps,
        _react2.default.createElement(
          'div',
          { className: 'react-slideshow-container' },
          arrows && _react2.default.createElement(
            'div',
            {
              className: 'nav ' + (index <= 0 && !infinite ? 'disabled' : ''),
              'data-type': 'prev',
              onClick: this.preFade
            },
            '<'
          ),
          _react2.default.createElement(
            'div',
            { className: 'react-slideshow-fade-wrapper' },
            _react2.default.createElement(
              'div',
              {
                className: 'react-slideshow-fade-images-wrap',
                ref: function ref(wrap) {
                  return _this3.divsContainer = wrap;
                }
              },
              children.map(function (each, key) {
                return _react2.default.createElement(
                  'div',
                  {
                    style: {
                      opacity: key === index ? '1' : '0',
                      zIndex: key === index ? '1' : '0'
                    },
                    'data-index': key,
                    key: key
                  },
                  each
                );
              })
            )
          ),
          arrows && _react2.default.createElement(
            'div',
            {
              className: 'nav ' + (index === children.length - 1 && !infinite ? 'disabled' : ''),
              'data-type': 'next',
              onClick: this.preFade
            },
            '>'
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
              onClick: _this3.goto
            });
          })
        )
      );
    }
  }, {
    key: 'fadeImages',
    value: function fadeImages(newIndex) {
      var _this4 = this;

      var _state3 = this.state,
          children = _state3.children,
          index = _state3.index;
      var _props2 = this.props,
          autoplay = _props2.autoplay,
          infinite = _props2.infinite,
          duration = _props2.duration,
          transitionDuration = _props2.transitionDuration;

      clearTimeout(this.timeout);
      var value = { opacity: 0 };

      var animate = function animate() {
        if (_this4.willUnmount) {
          TWEEN.default.removeAll();
          return;
        }
        requestAnimationFrame(animate);
        TWEEN.default.update();
      };

      animate();

      var tween = new TWEEN.Tween(value).to({ opacity: 1 }, transitionDuration).onUpdate(function (value) {
        _this4.divsContainer.children[newIndex].style.opacity = value.opacity;
        _this4.divsContainer.children[index].style.opacity = 1 - value.opacity;
      }).start();

      tween.onComplete(function () {
        if (_this4.willUnmount) {
          return;
        }
        _this4.setState({
          index: newIndex
        });
        if (autoplay && (infinite || newIndex < children.length - 1)) {
          _this4.timeout = setTimeout(function () {
            _this4.fadeImages((newIndex + 1) % children.length);
          }, duration);
        }
      });
    }
  }]);

  return Fade;
}(_react.Component);

Fade.defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  indicators: false,
  arrows: true,
  autoplay: true,
  infinite: true
};

Fade.propTypes = {
  duration: _propTypes2.default.number,
  transitionDuration: _propTypes2.default.number,
  indicators: _propTypes2.default.bool,
  arrows: _propTypes2.default.bool,
  autoplay: _propTypes2.default.bool,
  infinite: _propTypes2.default.bool
};
exports.default = Fade;