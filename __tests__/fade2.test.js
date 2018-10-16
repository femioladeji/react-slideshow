import { cleanup, wait, fireEvent } from 'react-testing-library';
import { renderFade } from '../test-utils';

afterEach(cleanup);

const transitionDuration = 50;

test("When the third indicator dot is clicked, the third child should show", async () => {
  const wrapperElement = document.createElement('div');
  const { baseElement } = renderFade({ transitionDuration, indicators: true }, wrapperElement);
  let dots = baseElement.querySelectorAll('.indicators > div');
  fireEvent.click(dots[2]);
  await wait(() => {
    const childrenElements = baseElement.querySelectorAll('.react-slideshow-fade-images-wrap > div');
    expect(parseFloat(childrenElements[2].style.opacity)).toBeGreaterThan(0);
    // expect(childrenElements[2].style.zIndex).toBe('1');
  }, {
    timeout: transitionDuration
  });
});