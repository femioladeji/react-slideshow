import {
  cleanup,
  wait,
  fireEvent,
  waitForDomChange
} from 'react-testing-library';
import { renderSlide, images } from '../test-utils';

const options = {
  duration: 1000,
  transitionDuration: 50,
  infinite: true,
  indicators: true
};

afterEach(cleanup);

test('All slide children dom elements were loaded, the first and last are loaded twice', () => {
  const { container } = renderSlide(options);
  const childrenElements = container.querySelectorAll('.images-wrap > div');
  expect(childrenElements.length).toEqual(images.length + 2);
});

test('indciators should show with the exact number of children dots', () => {
  const { container } = renderSlide(options);
  let indicators = container.querySelectorAll('.indicators');
  let dots = container.querySelectorAll('.indicators > div');
  expect(indicators.length).toBe(1);
  expect(dots.length).toBe(images.length);
});

test('Navigation arrows should show if not specified', () => {
  const { container } = renderSlide(options);
  let nav = container.querySelectorAll('.nav');
  expect(nav.length).toBe(2);
});

test('Previous navigation array should be disabled if infinite option is false', () => {
  const { container } = renderSlide({ ...options, infinite: false });
  let nav = container.querySelectorAll('.nav');
  expect(nav[0].classList).toContain('disabled');
});

test('When next is clicked, the second child should have an active class', async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderSlide(options, wrapperElement);
  const childrenElements = baseElement.querySelectorAll('.images-wrap > div');
  const nav = baseElement.querySelectorAll('.nav');
  fireEvent.click(nav[1]);
  await wait(
    () => {
      expect(childrenElements[1].classList).toContain('active');
    },
    {
      timeout: options.transitionDuration
    }
  );
});

test('When back is clicked, the third child should have an active class', async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderSlide(options, wrapperElement);
  const nav = baseElement.querySelectorAll('.nav');
  fireEvent.click(nav[0]);
  await waitForDomChange({
    container: baseElement.querySelector('.indicators')
  });
  const childrenElements = baseElement.querySelectorAll('.images-wrap > div');
  expect(childrenElements[2].classList).toContain('active');
  // childrenElements.forEach(a => {
  //   console.log(a.className)
  // })
  // await wait(
  //   () => {
  //     const childrenElements = baseElement.querySelectorAll('.images-wrap > div');
  //     // expect(childrenElements[0].classList).toContain('active');
  //     childrenElements.forEach(a => {
  //       console.log(a.classList)
  //     })
  //   },
  //   {
  //     timeout: options.transitionDuration
  //   }
  // );
});

test('It should automatically show second child after first slide', async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderSlide(options, wrapperElement);
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
});
