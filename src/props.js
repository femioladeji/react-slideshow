import React from 'react';

const defaultProps = {
  duration: 5000,
  transitionDuration: 1000,
  defaultIndex: 0,
  infinite: true,
  autoplay: true,
  indicators: false,
  arrows: true,
  pauseOnHover: true,
  scale: 1,
  easing: 'linear',
  canSwipe: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  cssClass: '',
  responsive: []
};

const getResponsiveSettings = (windowWidth, responsive) => {
  return responsive.find(each => each.breakpoint <= windowWidth);
};

export const getProps = componentProps => {
  let children = React.Children.map(componentProps.children, each => each);
  let settings = {};
  if (
    typeof window !== 'undefined' &&
    Array.isArray(componentProps.responsive)
  ) {
    const windowWidth = window.innerWidth;
    const responsiveSettings = getResponsiveSettings(
      windowWidth,
      componentProps.responsive
    );
    if (responsiveSettings) {
      ({ settings } = responsiveSettings);
    }
  }
  return {
    ...defaultProps,
    ...componentProps,
    ...settings,
    children
  };
};

export const propTypes = {
  duration: 'number',
  transitionDuration: 'number',
  defaultIndex: 'number',
  infinite: 'boolean',
  indicators: ['boolean', 'function'],
  autoplay: 'boolean',
  arrows: 'boolean',
  onChange: 'function',
  pauseOnHover: 'boolean',
  prevArrow: ['object', 'function'],
  nextArrow: ['object', 'function'],
  scale: 'number',
  easing: 'string',
  canSwipe: 'boolean',
  slidesToShow: 'number',
  slidesToScroll: 'number',
  cssClass: 'string',
  responsive: 'array'
};

export const validatePropTypes = props => {
  for (const key in props) {
    const propValueType = typeof props[key];
    if (propTypes[key]) {
      console.log(props[key]);
      if (
        Array.isArray(propTypes[key]) &&
        !propTypes[key].includes(propValueType)
      ) {
        console.warn(
          `${key} must be of one of type ${propTypes[key].join(', ')}`
        );
      } else if (propTypes[key] === 'array' && !Array.isArray(props[key])) {
        console.warn(`${key} must be of type ${propTypes[key]}`);
      } else if (
        !Array.isArray(propTypes[key]) &&
        propValueType !== propTypes[key]
      ) {
        console.warn(`${key} must be of type ${propTypes[key]}`);
      }
    }
  }
};
