// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
/** library's css */
import '../src/css/styles.css';
/** storybook style */
import './style.css';
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
  options: {
    storySort: {
      order: ['Introduction', 'Examples/Slide', 'Examples/Fade', 'Examples/Zoom', '*'], 
    },
  },
};
