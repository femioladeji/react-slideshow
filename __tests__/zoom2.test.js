import {
  cleanup,
  wait,
  fireEvent,
  waitForDomChange
} from '@testing-library/react';
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
  const indicators = baseElement.querySelectorAll('.indicators > div');
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
