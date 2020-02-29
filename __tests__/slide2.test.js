import { cleanup, fireEvent, wait } from '@testing-library/react';
import { renderSlide } from '../test-utils';

const options = {
  duration: 1000,
  transitionDuration: 50,
  infinite: true,
  indicators: true
};

afterEach(cleanup);

test('When the second indicator is clicked, the third child should have active class', async () => {
  const wrapperElement = document.createElement('div');
  const onChange = jest.fn();
  const { baseElement } = renderSlide(
    { ...options, autoplay: false, onChange },
    wrapperElement
  );
  let dots = baseElement.querySelectorAll('.indicators > div');
  const childrenElements = baseElement.querySelectorAll('.images-wrap > div');
  fireEvent.click(dots[1]);
  await wait(
    () => {
      expect(childrenElements[2].classList).toContain('active');
      expect(onChange).toBeCalledWith(0, 1);
    },
    {
      timeout: options.transitionDuration + options.duration
    }
  );
});

test('When the autoplay prop changes from false to true the slideshow plays again', async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement, rerender } = renderSlide(
    { ...options, autoplay: false },
    wrapperElement
  );
  // nothing changes after duration and transitionDuration
  await wait(
    () => {
      const childrenElements = baseElement.querySelectorAll(
        '.images-wrap > div'
      );
      expect(childrenElements[1].classList).toContain('active');
    },
    {
      timeout: options.duration + options.transitionDuration
    }
  );
  renderSlide({ ...options, autoplay: true }, false, rerender);
  await wait(
    () => {
      const childrenElements = baseElement.querySelectorAll(
        '.images-wrap > div'
      );
      expect(childrenElements[2].classList).toContain('active');
    },
    {
      timeout: options.duration + options.transitionDuration + 1000
    }
  );
});

test('When the autoplay prop changes from true to false the slideshow stops', async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement, rerender } = renderSlide(
    { ...options, autoplay: true },
    wrapperElement
  );
  // the slide plays since autoplay is true changes after duration and transitionDuration
  await wait(
    () => {
      const childrenElements = baseElement.querySelectorAll(
        '.images-wrap > div'
      );
      expect(childrenElements[2].classList).toContain('active');
    },
    {
      timeout: options.duration + options.transitionDuration + 1000
    }
  );
  renderSlide({ ...options, autoplay: false }, false, rerender);
  await wait(
    () => {
      const childrenElements = baseElement.querySelectorAll(
        '.images-wrap > div'
      );
      expect(childrenElements[2].classList).toContain('active');
      expect(childrenElements[3].classList.contains('active')).toBeFalsy();
    },
    {
      timeout: options.duration + options.transitionDuration
    }
  );
});
