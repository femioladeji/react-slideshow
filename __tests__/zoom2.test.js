import {
  cleanup,
  wait,
  fireEvent,
  waitForDomChange
} from '@testing-library/react';
import React from 'react';
import { renderZoom, renderZoom2, images } from '../test-utils';

afterEach(cleanup);

const zoomOut = {
  duration: 1000,
  transitionDuration: 50,
  indicators: true,
  scale: 0.4
};

test('Clicking on the indicator should show the right slide', async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderZoom2(
    { ...zoomOut, infinite: false, autoplay: false },
    wrapperElement
  );
  const childrenElements = baseElement.querySelectorAll('.zoom-wrapper > div');
  const indicators = baseElement.querySelectorAll('.indicators li button');
  fireEvent.click(indicators[1]);
  await waitForDomChange({
    container: baseElement.querySelector('.indicators')
  });
  expect(parseFloat(childrenElements[1].style.opacity)).toBe(1);
});

test('When the autoplay prop changes from false to true the slideshow plays again', async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement, rerender } = renderZoom2(
    { ...zoomOut, autoplay: false },
    wrapperElement
  );
  // nothing changes after duration and transitionDuration
  await wait(
    () => {
      const childrenElements = baseElement.querySelectorAll(
        '.zoom-wrapper > div'
      );
      expect(parseFloat(childrenElements[0].style.opacity)).toBe(1);
    },
    {
      timeout: zoomOut.duration + zoomOut.transitionDuration
    }
  );
  renderZoom2({ ...zoomOut, autoplay: true }, false, rerender);
  await wait(
    () => {
      const childrenElements = baseElement.querySelectorAll(
        '.zoom-wrapper > div'
      );
      expect(Math.round(childrenElements[1].style.opacity)).toBe(1);
    },
    {
      timeout: zoomOut.duration + zoomOut.transitionDuration
    }
  );
});

test('When the autoplay prop changes from true to false the slideshow stops', async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement, rerender } = renderZoom2(
    { ...zoomOut, autoplay: true },
    wrapperElement
  );
  // the slide plays since autoplay is true changes after duration and transitionDuration
  await wait(
    () => {
      const childrenElements = baseElement.querySelectorAll(
        '.zoom-wrapper > div'
      );
      expect(Math.round(childrenElements[1].style.opacity)).toBe(1);
    },
    {
      timeout: zoomOut.duration + zoomOut.transitionDuration
    }
  );
  renderZoom2({ ...zoomOut, autoplay: false }, false, rerender);
  await wait(
    () => {
      const childrenElements = baseElement.querySelectorAll(
        '.zoom-wrapper > div'
      );
      expect(parseFloat(childrenElements[1].style.opacity)).toBe(1);
    },
    {
      timeout: zoomOut.duration + zoomOut.transitionDuration
    }
  );
});

test('When a valid defaultIndex prop is set, it shows that particular index first', () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderZoom2(
    { ...zoomOut, defaultIndex: 1 },
    wrapperElement
  );
  const childrenElements = baseElement.querySelectorAll('.zoom-wrapper > div');
  expect(parseInt(childrenElements[0].style.opacity)).toBe(0);
  expect(parseInt(childrenElements[1].style.opacity)).toBe(1);
});

test('shows custom indicators if it exists', () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderZoom2(
    {
      ...zoomOut,
      indicators: index => <div className="custom-indicator">{index + 1}</div>
    },
    wrapperElement
  );
  const indicators = baseElement.querySelectorAll('.custom-indicator');
  expect(indicators).toHaveLength(2);
  expect(indicators[0].innerHTML).toBe('1');
  expect(indicators[1].innerHTML).toBe('2');
});

test('Custom nextArrow indicator can be set', async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderZoom(
    {
      ...zoomOut,
      nextArrow: <div className="next">Next</div>
    },
    wrapperElement
  );
  expect(baseElement.querySelector('.next')).toBeTruthy();
  fireEvent.click(baseElement.querySelector('[data-type="next"]'));
  await wait(
    () => {
      expect(
        Math.round(baseElement.querySelector('[data-index="1"]').style.opacity)
      ).toBe(1);
    },
    {
      timeout: zoomOut.transitionDuration
    }
  );
});

test('Custom prevArrow indicator can be set', async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderZoom(
    {
      ...zoomOut,
      prevArrow: <div className="previous">Previous</div>
    },
    wrapperElement
  );
  expect(baseElement.querySelector('.previous')).toBeTruthy();
  fireEvent.click(baseElement.querySelector('[data-type="prev"]'));
  await wait(
    () => {
      expect(
        Math.round(baseElement.querySelector('[data-index="2"]').style.opacity)
      ).toBe(1);
    },
    {
      timeout: zoomOut.transitionDuration
    }
  );
});

test('cssClass prop exists on element when it is passed', () => {
  const { container } = renderZoom2({
    ...zoomOut,
    cssClass: 'myStyle'
  });
  let wrapper = container.querySelector('.react-slideshow-zoom-wrapper');
  expect(wrapper.classList).toContain('myStyle');
});
