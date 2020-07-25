import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Slide } from '../../../../src';
import { autoplayCode } from '../../codeStrings';

const AutoplayExample = () => {
  const [autoplay, setAutoplay] = useState(true);

  const style = {
    textAlign: 'center',
    background: 'teal',
    padding: '200px',
    fontSize: '30px'
  };

  return (
    <div>
      <h2>Autoplay</h2>
      The autoplay prop by default is true. However, you can toggle it to stop
      the slide or play it.
      <SyntaxHighlighter language="react" style={dark}>
        {autoplayCode}
      </SyntaxHighlighter>
      <br />
      <div>
        <Slide autoplay={autoplay}>
          <div style={style}>First Slide</div>
          <div style={style}>Second Slide</div>
          <div style={style}>Third Slide</div>
        </Slide>
      </div>
      <div className="autoplay-buttons">
        Autplay is {autoplay ? 'on' : 'off'}
      </div>
      <div className="autoplay-buttons">
        <button type="button" onClick={() => setAutoplay(false)}>
          Pause
        </button>
        <button type="button" onClick={() => setAutoplay(true)}>
          Play
        </button>
      </div>
    </div>
  );
};

export default AutoplayExample;
