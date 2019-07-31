import { cleanup, fireEvent, wait } from 'react-testing-library';
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
