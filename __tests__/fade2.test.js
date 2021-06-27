import React from 'react';
import { cleanup, wait, fireEvent } from '@testing-library/react';
import { renderFade } from '../test-utils';

afterEach(cleanup);

const options = {
  duration: 1000,
  transitionDuration: 50,
  indicators: true
};

test('When the third indicator dot is clicked, the third child should show', async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderFade(options, wrapperElement);
  let dots = baseElement.querySelectorAll('.indicators li button');
  fireEvent.click(dots[2]);
  await wait(
    () => {
      const childrenElements = baseElement.querySelectorAll(
        '.react-slideshow-fade-images-wrap > div'
      );
      expect(Math.round(childrenElements[2].style.opacity)).toBe(1);
      expect(childrenElements[2].style.zIndex).toBe('1');
    },
    {
      timeout: options.duration + options.transitionDuration
    }
  );
});

test('When the autoplay prop changes from false to true the slideshow plays again', async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement, rerender } = renderFade(
    { ...options, autoplay: false },
    wrapperElement
  );
  // nothing changes after duration and transitionDuration
  await wait(
    () => {
      const childrenElements = baseElement.querySelectorAll(
        '.react-slideshow-fade-images-wrap > div'
      );
      expect(Math.round(childrenElements[0].style.opacity)).toBe(1);
      expect(childrenElements[0].style.zIndex).toBe('1');
      expect(Math.round(childrenElements[1].style.opacity)).toBe(0);
      expect(childrenElements[1].style.zIndex).toBe('0');
    },
    {
      timeout: options.duration + options.transitionDuration
    }
  );
  renderFade({ ...options, autoplay: true }, false, rerender);
  await wait(
    () => {
      const childrenElements = baseElement.querySelectorAll(
        '.react-slideshow-fade-images-wrap > div'
      );
      expect(Math.round(childrenElements[0].style.opacity)).toBe(0);
      expect(Math.round(childrenElements[1].style.opacity)).toBe(1);
    },
    {
      timeout: options.duration + options.transitionDuration
    }
  );
});

test('When the autoplay prop changes from true to false the slideshow stops', async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement, rerender } = renderFade(
    { ...options, autoplay: true },
    wrapperElement
  );
  // the slide plays since autoplay is true changes after duration and transitionDuration
  await wait(
    () => {
      const childrenElements = baseElement.querySelectorAll(
        '.react-slideshow-fade-images-wrap > div'
      );
      expect(Math.round(childrenElements[0].style.opacity)).toBe(0);
      expect(Math.round(childrenElements[1].style.opacity)).toBe(1);
    },
    {
      timeout: options.duration + options.transitionDuration
    }
  );
  renderFade({ ...options, autoplay: false }, false, rerender);
  await wait(
    () => {
      const childrenElements = baseElement.querySelectorAll(
        '.react-slideshow-fade-images-wrap > div'
      );
      expect(Math.round(childrenElements[1].style.opacity)).toBe(1);
      expect(childrenElements[1].style.zIndex).toBe('1');
      expect(Math.round(childrenElements[2].style.opacity)).toBe(0);
      expect(childrenElements[2].style.zIndex).toBe('0');
    },
    {
      timeout: options.duration + options.transitionDuration
    }
  );
});

test('When a valid defaultIndex prop is set, it shows that particular index first', () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderFade(
    { ...options, defaultIndex: 1 },
    wrapperElement
  );
  const childrenElements = baseElement.querySelectorAll(
    '.react-slideshow-fade-images-wrap > div'
  );
  expect(parseInt(childrenElements[0].style.opacity)).toBe(0);
  expect(parseInt(childrenElements[1].style.opacity)).toBe(1);
});

test('Custom prevArrow indicator can be set', async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderFade(
    {
      ...options,
      prevArrow: <div className="previous">Previous</div>
    },
    wrapperElement
  );
  const childrenElements = baseElement.querySelectorAll(
    '.react-slideshow-fade-images-wrap > div'
  );
  expect(baseElement.querySelector('.previous')).toBeTruthy();
  fireEvent.click(baseElement.querySelector('[data-type="prev"]'));
  await wait(
    () => {
      expect(Math.round(childrenElements[2].style.opacity)).toBe(1);
    },
    {
      timeout: options.transitionDuration
    }
  );
});

test('Custom nextArrow indicator can be set', async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderFade(
    {
      ...options,
      nextArrow: <div className="next">Next</div>
    },
    wrapperElement
  );
  const childrenElements = baseElement.querySelectorAll(
    '.react-slideshow-fade-images-wrap > div'
  );
  expect(baseElement.querySelector('.next')).toBeTruthy();
  fireEvent.click(baseElement.querySelector('[data-type="next"]'));
  await wait(
    () => {
      expect(Math.round(childrenElements[1].style.opacity)).toBe(1);
    },
    {
      timeout: options.transitionDuration
    }
  );
});

test('shows custom indicators if it exists', () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderFade(
    {
      ...options,
      indicators: index => <div className="custom-indicator">{index + 1}</div>
    },
    wrapperElement
  );
  const indicators = baseElement.querySelectorAll('.custom-indicator');
  expect(indicators).toHaveLength(3);
  expect(indicators[0].innerHTML).toBe('1');
  expect(indicators[1].innerHTML).toBe('2');
  expect(indicators[2].innerHTML).toBe('3');
});

test('cssClass prop exists on element when it is passed', () => {
  const { container } = renderFade({
    ...options,
    cssClass: 'myStyle'
  });
  let elementToStyle = container.querySelectorAll(
    '.react-slideshow-fade-wrapper'
  );
  expect(elementToStyle.length).toBe(1);
});
