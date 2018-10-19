import { cleanup, wait, fireEvent } from 'react-testing-library';
import { renderZoom, images } from '../test-utils';

afterEach(cleanup);

const zoomOut = {
  duration: 1000,
  transitionDuration: 50,
  indicators: true,
  scale: 0.4
};

test('All children dom elements were loaded', () => {
  const { container } = renderZoom(zoomOut);
  const childrenElements = container.querySelectorAll('.zoom-wrapper > div');
  expect(childrenElements.length).toEqual(images.length);
});

test('indciators should show with the exact number of children dots', () => {
  const { container } = renderZoom(zoomOut);
  let indicators = container.querySelectorAll('.indicators');
  let dots = container.querySelectorAll('.indicators > div');
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
});

test("It shouldn't navigate if infinite false and previous arrow is clicked", async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderZoom(
    { ...zoomOut, infinite: false },
    wrapperElement
  );
  const childrenElements = baseElement.querySelectorAll('.zoom-wrapper > div');
  const nav = baseElement.querySelectorAll('.nav');
  fireEvent.click(nav[0]);
  await wait(
    () => {
      expect(
        parseFloat(childrenElements[childrenElements.length - 1].style.opacity)
      ).toBe(0);
      expect(parseFloat(childrenElements[0].style.opacity)).toBe(1);
    },
    {
      timeout: zoomOut.transitionDuration
    }
  );
});

test('When next or previous arrow is clicked, the right child shows up', async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderZoom(zoomOut, wrapperElement);
  const childrenElements = baseElement.querySelectorAll('.zoom-wrapper > div');
  const nav = baseElement.querySelectorAll('.nav');
  fireEvent.click(nav[1]);
  await wait(
    () => {
      expect(parseFloat(childrenElements[1].style.opacity)).toBeGreaterThan(0);
      // preceding image should have a scale of 1 at the end of transition
      // expect(childrenElements[0].style.transform).toBe('scale(1)');
    },
    {
      timeout: zoomOut.transitionDuration
    }
  );

  fireEvent.click(nav[0]);
  await wait(
    () => {
      expect(parseFloat(childrenElements[0].style.opacity)).toBeGreaterThan(0);
      // expect(childrenElements[1].style.transform).toBe('scale(1)');
      // expect(childrenElements[0].style.zIndex).toBe('1');
    },
    {
      timeout: zoomOut.transitionDuration
    }
  );
});

test(`The second child should start transition to opacity and zIndex of 1 after ${
  zoomOut.duration
}ms`, async () => {
  const { container } = renderZoom(zoomOut);
  await wait(
    () => {
      const childrenElements = container.querySelectorAll(
        '.zoom-wrapper > div'
      );
      expect(parseFloat(childrenElements[1].style.opacity)).toBeGreaterThan(0);
      // expect(childrenElements[1].style.zIndex).toBe('1');
    },
    {
      timeout: zoomOut.duration + zoomOut.transitionDuration
    }
  );
});
