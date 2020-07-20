import React from 'react';

const getUnhandledProps = (ComponentProps, props) => {
  const handledProps = Object.keys(ComponentProps);
  return Object.keys(props).reduce((acc, prop) => {
    if (handledProps.indexOf(prop) === -1) acc[prop] = props[prop];
    return acc;
  }, {});
};

const showPreviousArrow = (
  { arrows, prevArrow, infinite },
  currentIndex,
  moveSlides
) => {
  if (!arrows) {
    return;
  }
  const isDisabled = currentIndex <= 0 && !infinite;
  const props = {
    'data-type': 'prev',
    'aria-label': 'Previous Slide',
    disabled: isDisabled,
    onClick: moveSlides
  };
  if (prevArrow) {
    return React.cloneElement(prevArrow, {
      class: `nav ${isDisabled ? 'disabled' : ''}`,
      ...props
    });
  }
  const className = `nav default-nav ${isDisabled ? 'disabled' : ''}`;
  return (
    <button className={className} {...props}>
      <span />
    </button>
  );
};

const showNextArrow = (
  { arrows, nextArrow, infinite, children },
  currentIndex,
  moveSlides
) => {
  if (!arrows) {
    return;
  }
  const isDisabled = currentIndex === children.length - 1 && !infinite;
  const props = {
    'data-type': 'next',
    'aria-label': 'Next Slide',
    disabled: isDisabled,
    onClick: moveSlides
  };
  if (nextArrow) {
    return React.cloneElement(nextArrow, {
      class: `nav ${isDisabled ? 'disabled' : ''}`,
      ...props
    });
  }
  const className = `nav default-nav ${isDisabled ? 'disabled' : ''}`;
  return (
    <button className={className} {...props}>
      <span />
    </button>
  );
};

export { showNextArrow, showPreviousArrow, getUnhandledProps };
