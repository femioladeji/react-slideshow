'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slide = require('./components/slideshow/slide');

Object.defineProperty(exports, 'Slide', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_slide).default;
  }
});

var _fade = require('./components/slideshow/fade');

Object.defineProperty(exports, 'Fade', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_fade).default;
  }
});

var _zoom = require('./components/slideshow/zoom');

Object.defineProperty(exports, 'Zoom', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_zoom).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }