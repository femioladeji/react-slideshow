import React from 'react'
import { render } from '@testing-library/react';
import 'resize-observer-polyfill';
import { Fade, Zoom, Slide, SlideProps } from './src';

jest.mock('resize-observer-polyfill');

export const images = [
  'images/slide_5.jpg',
  'images/slide_6.jpg',
  'images/slide_7.jpg'
];

export const renderFade = (props = {}, container, rerender) => {
  let options = {};
  if (container) {
    options = {
      container: document.body.appendChild(container),
      baseElement: container
    }
  }
  let slideShow;
  if (rerender) {
    slideShow = rerender(
      <Fade {...props}>
        {images.map((each, index) => (<img key={index} src={each} />))}
      </Fade>, options);
  } else {
    slideShow = render(
        <Fade {...props}>
          {images.map((each, index) => (<img key={index} src={each} />))}
        </Fade>, options);
  }
  return slideShow;
}

export const renderZoom = (props = {}, container) => {
  let options = {};
  if (container) {
    options = {
      container: document.body.appendChild(container),
      baseElement: container
    }
  }
  let slideShow = render(
      <Zoom {...props}>
        {images.map((each, index) => (<img key={index} src={each} />))}
      </Zoom>, options);
  return slideShow;
}

export const renderZoom2 = (props = {}, container, rerender) => {
  let options = {};
  if (container) {
    options = {
      container: document.body.appendChild(container),
      baseElement: container
    }
  }
  let slideShow;
  if (rerender) {
    slideShow = rerender(
      <Zoom {...props}>
        {images.slice(0, 2).map((each, index) => (
          <img key={index} src={each} />
        ))}
      </Zoom>, options);
  } else {
    slideShow = render(
        <Zoom {...props}>
          {images.slice(0, 2).map((each, index) => (<img key={index} src={each} />))}
        </Zoom>, options);
  }
  return slideShow;
}

export const renderSlide = (props = {}, container, rerender) => {
  let options = {};
  if (container) {
    options = {
      container: document.body.appendChild(container),
      baseElement: container
    }
  }
      const {
      duration=5000,
      transitionDuration=1000,
      defaultIndex=0,
      infinite=true,
      autoplay=true,
      indicators=false,
      arrows=true,
      pauseOnHover=true,
      easing='linear',
      canSwipe=true,
      cssClass='',
      responsive=[],
      ...others
    } = props;
    const props2 = {
      duration,
      transitionDuration,
      defaultIndex,
      infinite,
      autoplay,
      indicators,
      arrows,
      pauseOnHover,
      easing,
      canSwipe,
      cssClass,
      responsive,
      ...others
    };
  let slideShow;
  if (rerender) {

    slideShow = rerender(
      <Slide {...props2}>
        {images.map((each, index) => (
          <img key={index} src={each} />
        ))}
      </Slide>);
  } else {
    slideShow = render(
        <Slide {...props2}>
          {images.map((each, index) => (<img key={index} src={each} />))}
        </Slide>, options);
  }
  return slideShow;
}