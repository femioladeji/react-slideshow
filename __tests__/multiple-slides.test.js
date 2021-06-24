import React from 'react';
import {
  cleanup,
  wait,
  fireEvent,
  waitForDomChange
} from '@testing-library/react';
import { renderSlide, images } from '../test-utils';

const options = {
  duration: 1000,
  transitionDuration: 50,
  infinite: true,
  indicators: false,
  autoplay: false,
  slidesToShow: 2
};

afterEach(cleanup);

test('It shows it shows two slides on the page', () => {
  const { container, debug } = renderSlide(options);
  console.log(debug());
  const childrenElements = container.querySelectorAll('.images-wrap > div');
  expect(childrenElements.length).toEqual(images.length + 4);
});
