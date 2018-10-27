"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getUnhandledProps(ComponentProps, props) {
  var handledProps = Object.keys(ComponentProps);
  return Object.keys(props).reduce(function (acc, prop) {
    if (handledProps.indexOf(prop) === -1) acc[prop] = props[prop];
    return acc;
  }, {});
}

exports.getUnhandledProps = getUnhandledProps;