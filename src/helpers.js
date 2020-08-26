import React from 'react';
import TWEEN from '@tweenjs/tween.js';

const EASING_METHODS = {
  linear: TWEEN.Easing.Linear.None,
  ease: TWEEN.Easing.Quadratic.InOut,
  'ease-in': TWEEN.Easing.Quadratic.In,
  'ease-out': TWEEN.Easing.Quadratic.Out,
  cubic: TWEEN.Easing.Cubic.InOut,
  'cubic-in': TWEEN.Easing.Cubic.In,
  'cubic-out': TWEEN.Easing.Cubic.Out
}

const getEasing = (easeMethod) => {
  return EASING_METHODS[easeMethod] || EASING_METHODS.linear
}

const getUnhandledProps = (ComponentProps, props) => {
  const handledProps = Object.keys(ComponentProps);
  return Object.keys(props).reduce((acc, prop) => {
    if (handledProps.indexOf(prop) === -1) acc[prop] = props[prop];
    return acc;
  }, {});
};

const showPreviousArrow = (
  { prevArrow, infinite },
  currentIndex,
  moveSlides
) => {
  const isDisabled = currentIndex <= 0 && !infinite;
  const props = {
    'data-type': 'prev',
    'aria-label': 'Previous Slide',
    disabled: isDisabled,
    onClick: moveSlides
  };
  if (prevArrow) {
    return React.cloneElement(prevArrow, {
      className: `${prevArrow.props.className} nav ${
        isDisabled ? 'disabled' : ''
      }`,
      ...props
    });
  }
  const className = `nav default-nav ${isDisabled ? 'disabled' : ''}`;
  return (
    <button className={className} {...props}>
      <svg width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
    </button>
  );
};

const showNextArrow = (
  { nextArrow, infinite, children },
  currentIndex,
  moveSlides
) => {
  const isDisabled = currentIndex === children.length - 1 && !infinite;
  const props = {
    'data-type': 'next',
    'aria-label': 'Next Slide',
    disabled: isDisabled,
    onClick: moveSlides
  };
  if (nextArrow) {
    return React.cloneElement(nextArrow, {
      className: `${nextArrow.props.className} nav ${
        isDisabled ? 'disabled' : ''
      }`,
      ...props
    });
  }
  const className = `nav default-nav ${isDisabled ? 'disabled' : ''}`;
  return (
    <button className={className} {...props}>
      <svg width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
    </button>
  );
};

const showDefaultIndicator = (currentIndex, key, indicatorProps) => {
  return (
    <li key={key}>
      <button
        className={`each-slideshow-indicator ${
          currentIndex === key ? 'active' : ''
        }`}
        {...indicatorProps}
      />
    </li>
  );
};

const showCustomIndicator = (
  currentIndex,
  key,
  indicatorProps,
  eachIndicator
) => {
  return React.cloneElement(eachIndicator, {
    className: `${eachIndicator.props.className} ${
      currentIndex === key ? 'active' : ''
    }`,
    key,
    ...indicatorProps
  });
};

const showIndicators = (props, currentIndex, navigate) => {
  const { children, indicators } = props;
  const isCustomIndicator = typeof indicators !== 'boolean';

  return (
    <div className="indicators">
      {children.map((_, key) => {
        const indicatorProps = {
          'data-key': key,
          'aria-label': `Go to slide ${key + 1}`,
          onClick: navigate
        };
        if (isCustomIndicator) {
          return showCustomIndicator(
            currentIndex,
            key,
            indicatorProps,
            indicators(key)
          )
        }
        return showDefaultIndicator(currentIndex, key, indicatorProps);
      })}
    </div>
  );
};



export { getEasing, showNextArrow, showPreviousArrow, getUnhandledProps, showIndicators };
