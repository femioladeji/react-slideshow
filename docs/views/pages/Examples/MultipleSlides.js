import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Slide } from '../../../../src';
import { pauseOnHover, fadeEffectCSS } from '../../codeStrings';

const MultipleSlides = () => {
  const style = {
    textAlign: 'center',
    background: 'teal',
    padding: '200px 0',
    fontSize: '30px'
  };

  const properties = {
    duration: 3000,
    pauseOnHover: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false
  };

  return (
    <div>
      <h2>Pause on hover</h2>
      <p>
        The slide effect gets paused when the user hovers on the slide and it
        continues playing on mouse out
      </p>
      <SyntaxHighlighter language="react" style={dark}>
        {pauseOnHover}
      </SyntaxHighlighter>
      <br />
      <div>
        <Slide {...properties}>
          <div style={style}>First Slide</div>
          <div style={style}>Second Slide</div>
          <div style={style}>Third Slide</div>
        </Slide>
      </div>
      <br />
      Here is the css used to accomplish this layout.
      <SyntaxHighlighter language="react" style={dark}>
        {fadeEffectCSS}
      </SyntaxHighlighter>
    </div>
  );
};

export default MultipleSlides;
