'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('./lib');

require('./app.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      var slideImages = ['images/slide_2.jpg', 'images/slide_3.jpg', 'images/slide_4.jpg'];

      var fadeImages = ['images/slide_5.jpg', 'images/slide_6.jpg', 'images/slide_7.jpg'];

      var zoomOutImages = ['images/slide_2.jpg', 'images/slide_7.jpg', 'images/slide_5.jpg'];

      var properties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true
      };

      var fadeProperties = {
        duration: 5000,
        transitionDuration: 500,
        indicators: true,
        infinite: false
      };

      var zoomOutProperties = {
        duration: 5000,
        transitionDuration: 500,
        indicators: true,
        scale: 0.4
      };

      var zoomInProperties = {
        duration: 5000,
        transitionDuration: 500,
        indicators: true,
        scale: 1.4
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h3',
          null,
          'Slide Effect'
        ),
        _react2.default.createElement(
          'div',
          { className: 'slide-container' },
          _react2.default.createElement(
            _lib.Slide,
            properties,
            _react2.default.createElement(
              'div',
              { className: 'each-slide' },
              _react2.default.createElement(
                'div',
                { style: { backgroundImage: 'url(' + slideImages[0] + ')' } },
                _react2.default.createElement(
                  'span',
                  null,
                  'Slide 1'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'each-slide' },
              _react2.default.createElement(
                'div',
                { style: { backgroundImage: 'url(' + slideImages[1] + ')' } },
                _react2.default.createElement(
                  'span',
                  null,
                  'Slide 2'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'each-slide' },
              _react2.default.createElement(
                'div',
                { style: { backgroundImage: 'url(' + slideImages[2] + ')' } },
                _react2.default.createElement(
                  'span',
                  null,
                  'Slide 3'
                )
              )
            )
          )
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'h3',
          null,
          'Fade Effect'
        ),
        _react2.default.createElement(
          'div',
          { className: 'slide-container' },
          _react2.default.createElement(
            _lib.Fade,
            fadeProperties,
            _react2.default.createElement(
              'div',
              { className: 'each-fade' },
              _react2.default.createElement(
                'div',
                { className: 'image-container' },
                _react2.default.createElement('img', { src: fadeImages[0] })
              ),
              _react2.default.createElement(
                'h2',
                null,
                'First Slide'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'each-fade' },
              _react2.default.createElement(
                'h2',
                null,
                'Second Slide'
              ),
              _react2.default.createElement(
                'div',
                { className: 'image-container' },
                _react2.default.createElement('img', { src: fadeImages[1] })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'each-fade' },
              _react2.default.createElement(
                'div',
                { className: 'image-container' },
                _react2.default.createElement('img', { src: fadeImages[2] })
              ),
              _react2.default.createElement(
                'h2',
                null,
                'Third Slide'
              )
            )
          )
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'h3',
          null,
          'Zoom out Effect'
        ),
        _react2.default.createElement(
          'div',
          { className: 'slide-container' },
          _react2.default.createElement(
            _lib.Zoom,
            zoomOutProperties,
            zoomOutImages.map(function (each, index) {
              return _react2.default.createElement('img', { key: index, style: { width: '100%' }, src: each });
            })
          )
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'h3',
          null,
          'Zoom in Effect'
        ),
        _react2.default.createElement(
          'div',
          { className: 'slide-container' },
          _react2.default.createElement(
            _lib.Zoom,
            zoomInProperties,
            fadeImages.map(function (each, index) {
              return _react2.default.createElement('img', { key: index, style: { width: '100%' }, src: each });
            })
          )
        ),
        _react2.default.createElement('br', null)
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;