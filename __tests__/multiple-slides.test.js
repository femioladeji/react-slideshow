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

test('It adds preceeding and trailing slides based on number of slides to show', () => {
  const { container } = renderSlide(options);
  const childrenElements = container.querySelectorAll('.images-wrap > div');
  expect(childrenElements.length).toEqual(
    images.length + options.slidesToShow * 2
  );
});

test('It shows 2 slides on the first page', () => {
  const { container } = renderSlide(options);
  const activeChildren = container.querySelectorAll(
    '.images-wrap > div.active'
  );
  const allChildren = container.querySelectorAll('.images-wrap > div');
  expect(activeChildren.length).toEqual(options.slidesToShow);
  // the first 2 are preceeding slides that's why the index 2 & 3 are the active ones
  expect(allChildren[2].classList).toContain('active');
  expect(allChildren[3].classList).toContain('active');
});

test('it uses the default value of slideToScroll (1) if prop is not passed', async () => {
  const { container } = renderSlide(options);
  const nav = container.querySelectorAll('.nav');
  const allChildren = container.querySelectorAll('.images-wrap > div');
  fireEvent.click(nav[1]);
  await wait(
    () => {
      expect(allChildren[3].classList).toContain('active');
      expect(allChildren[4].classList).toContain('active');
    },
    {
      timeout: options.transitionDuration + 1
    }
  );
});
