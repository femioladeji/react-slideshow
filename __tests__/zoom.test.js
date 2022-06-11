import React from 'react';
import { cleanup, waitFor, fireEvent } from '@testing-library/react';
import { renderZoom, renderZoom2, images } from '../test-utils';

afterEach(cleanup);

const zoomOut = {
  duration: 1000,
  transitionDuration: 50,
  indicators: true,
  scale: 0.4
};

test('All children dom elements were loaded', () => {
  const { container } = renderZoom(zoomOut);
  const childrenElements = container.querySelectorAll('.react-slideshow-fadezoom-images-wrap > div');
  expect(childrenElements.length).toEqual(images.length);
});

test('indciators should show with the exact number of children dots', () => {
  const { container } = renderZoom(zoomOut);
  let indicators = container.querySelectorAll('.indicators');
  let dots = container.querySelectorAll('.indicators li button');
  expect(indicators.length).toBe(1);
  expect(dots.length).toBe(images.length);
});

test('Navigation arrows should show if not specified', () => {
  const { container } = renderZoom(zoomOut);
  let nav = container.querySelectorAll('.nav');
  expect(nav.length).toBe(2);
});

test('Navigation arrows should not show', () => {
  const { container } = renderZoom({ ...zoomOut, arrows: false });
  let nav = container.querySelectorAll('.nav');
  expect(nav.length).toBe(0);
});

test('Nav arrow should be disabled on the first slide for infinite:false props', () => {
  const { container } = renderZoom({ ...zoomOut, infinite: false });
  let nav = container.querySelectorAll('.nav');
  expect(nav[0].classList).toContain('disabled');
  expect(nav[0].disabled).toBe(true);
});

test("It shouldn't navigate if infinite false and previous arrow is clicked", async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderZoom(
    { ...zoomOut, infinite: false, arrows: true },
    wrapperElement
  );
  const childrenElements = baseElement.querySelectorAll('.react-slideshow-fadezoom-images-wrap > div');
  const nav = baseElement.querySelectorAll('.nav');
  fireEvent.click(nav[0]);
  await waitFor(
    () => {
      expect(parseFloat(childrenElements[childrenElements.length - 1].style.opacity)).toBe(0);
      expect(parseFloat(childrenElements[0].style.opacity)).toBe(1);
    },
    {
      timeout: zoomOut.transitionDuration
    }
  );
});

test("It shouldn't navigate if infinite false and next arrow is clicked on the last slide", async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderZoom2(
    {
      ...zoomOut,
      infinite: false,
      arrows: true,
      defaultIndex: 1,
      autoplay: false,
    },
    wrapperElement
  );
  const childrenElements = baseElement.querySelectorAll('.react-slideshow-fadezoom-images-wrap > div');
  const nav = baseElement.querySelectorAll('.nav');
  fireEvent.click(nav[1]);
  await waitFor(
    () => {
      expect(parseFloat(childrenElements[0].style.opacity)).toBe(0);
      expect(parseFloat(childrenElements[childrenElements.length - 1].style.opacity)).toBe(1);
    },
    {
      timeout: zoomOut.transitionDuration
    }
  );
});

test(`The second child should start transition to opacity and zIndex of 1 after ${zoomOut.duration}ms`, async () => {
  const onChange = jest.fn();
  const { container } = renderZoom({ ...zoomOut, onChange });
  await waitFor(
    () => {
      const childrenElements = container.querySelectorAll(
        '.react-slideshow-fadezoom-images-wrap > div'
      );
      expect(parseFloat(childrenElements[1].style.opacity)).toBeGreaterThan(0);
      expect(onChange).toBeCalledWith(0, 1);
      expect(childrenElements[1].style.zIndex).toBe('1');
    },
    {
      timeout: zoomOut.duration + zoomOut.transitionDuration + 1000
    }
  );
});

test('When the pauseOnHover prop is true and the mouse hovers the container the slideshow stops', async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderZoom(
    { ...zoomOut, autoplay: true, pauseOnHover: true },
    wrapperElement
  );
  const childrenElements = baseElement.querySelectorAll('.react-slideshow-fadezoom-images-wrap > div');

  fireEvent.mouseEnter(baseElement.querySelector('.react-slideshow-container'));
  await waitFor(
    () => {
      expect(parseFloat(childrenElements[0].style.opacity)).toBe(1);
      expect(parseFloat(childrenElements[1].style.opacity)).toBe(0);
      expect(parseFloat(childrenElements[childrenElements.length - 1].style.opacity)).toBe(0);
    },
    {
      timeout: zoomOut.duration + zoomOut.transitionDuration
    }
  );
  fireEvent.mouseLeave(baseElement.querySelector('.react-slideshow-container'));
  await waitFor(
    () => {
      expect(Math.round(childrenElements[0].style.opacity)).toBe(0);
      expect(Math.round(childrenElements[1].style.opacity)).toBe(1);
      expect(Math.round(childrenElements[childrenElements.length - 1].style.opacity)).toBe(0);
    },
    {
      timeout: zoomOut.duration + zoomOut.transitionDuration
    }
  );
});
