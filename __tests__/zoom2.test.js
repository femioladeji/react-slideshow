import {
  cleanup,
  wait,
  fireEvent,
  waitForDomChange
} from 'react-testing-library';
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
