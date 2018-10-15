import { cleanup, wait, waitForElement, fireEvent } from 'react-testing-library';
import { renderFade, fadeImages } from '../test-utils';

afterEach(cleanup);

test("All children dom elements were loaded", () => {
  const { container } = renderFade();
  const childrenElements = container.querySelectorAll('.react-slideshow-fade-images-wrap > div');
  expect(childrenElements.length).toEqual(fadeImages.length);
});

test("The opacity and z-index of the first child are 1", () => {
  const { container } = renderFade();
  const childrenElements = container.querySelectorAll('.react-slideshow-fade-images-wrap > div');
  expect(childrenElements[0].style.opacity).toBe('1');
  expect(childrenElements[0].style.zIndex).toBe('1');
});

test("Left and right arrow navigation should show", () => {
  const { container } = renderFade();
  let nav = container.querySelectorAll('.nav');
  expect(nav.length).toEqual(2);
});

test("indicators should not show since default value is false", () => {
  const { container } = renderFade();
  let indicators = container.querySelectorAll('.indicators');
  expect(indicators.length).toBe(0);
});

const fadeProperties = {
  duration: 2000,
  transitionDuration: 200,
  indicators: true,
  arrows: false
};

const fadeProperties2 = {
  duration: 2000,
  transitionDuration: 200,
  arrows: true
};

test("Navigation arrows should not show", () => {
  const { container } = renderFade(fadeProperties);
  let nav = container.querySelectorAll('.nav');
  expect(nav.length).toBe(0);
});

test("indciators should show with the exact number of children dots", () => {
  const { container } = renderFade(fadeProperties);
  let indicators = container.querySelectorAll('.indicators');
  let dots = container.querySelectorAll('.indicators > div');
  expect(indicators.length).toBe(1);
  expect(dots.length).toBe(fadeImages.length);
});

/*test("When next or previous arrow is clicked, the right child shows up", async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderFade(fadeProperties2, wrapperElement);
  const childrenElements = baseElement.querySelectorAll('.react-slideshow-fade-images-wrap > div');
  const nav = baseElement.querySelectorAll('.nav');
  fireEvent.click(nav[1]);
  await wait(() => {
    expect(parseFloat(childrenElements[1].style.opacity)).toBeGreaterThan(0);
    expect(childrenElements[1].style.zIndex).toBe('1');
  }, {
    timeout: fadeProperties2.transitionDuration
  });

  fireEvent.click(nav[0]);
  await wait(() => {
    expect(parseFloat(childrenElements[0].style.opacity)).toBeGreaterThan(0);
    expect(childrenElements[0].style.zIndex).toBe('1');
  }, {
    timeout: fadeProperties2.transitionDuration
  });
});*/

test(`The second child should start transition to opacity and zIndex of 1 after ${fadeProperties.duration}ms`, async () => {
  const { container } = renderFade(fadeProperties);
  await wait(() => {
    const childrenElements = container.querySelectorAll('.react-slideshow-fade-images-wrap > div');
    expect(parseFloat(childrenElements[1].style.opacity)).toBeGreaterThan(0);
    expect(childrenElements[1].style.zIndex).toBe('1');
  }, {
    timeout: fadeProperties.duration + fadeProperties.transitionDuration
  });
});