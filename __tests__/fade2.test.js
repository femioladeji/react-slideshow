import { cleanup, wait, fireEvent } from 'react-testing-library';
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
  let dots = baseElement.querySelectorAll('.indicators > div');
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
