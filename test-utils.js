import React from 'react'
import { render } from 'react-testing-library';
import { Fade, Zoom, Slide } from './src/lib';

export const images = [
  'images/slide_5.jpg',
  'images/slide_6.jpg',
  'images/slide_7.jpg'
];

export const renderFade = (props = {}, container) => {
  let options = {};
  if (container) {
    options = {
      container: document.body.appendChild(container),
      baseElement: container
    }
  }
  let slideShow = render(
      <Fade {...props}>
        {images.map((each, index) => (
          <img key={index} src={each} />
        ))}
      </Fade>, options);
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
        {images.map((each, index) => (
          <img key={index} src={each} />
        ))}
      </Zoom>, options);
  return slideShow;
}

export const renderSlide = (props = {}, container) => {
  let options = {};
  if (container) {
    options = {
      container: document.body.appendChild(container),
      baseElement: container
    }
  }
  let slideShow = render(
      <Slide {...props}>
        {images.map((each, index) => (
          <img key={index} src={each} />
        ))}
      </Slide>, options);
  return slideShow;
}