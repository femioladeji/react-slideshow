import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Fade } from '../../../../src';
import { callbackCode } from '../../codeStrings';

const CallbackExample = () => {
  const [previousIndex, setPreviousIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const style = {
    textAlign: 'center',
    padding: '200px',
    fontSize: '30px'
  };

  const properties = {
    autoplay: true,
    indicators: true,
    onChange: (previous, current) => {
      setPreviousIndex(previous);
      setCurrentIndex(current);
    }
  };

  return (
    <div>
      <h2>Callback</h2>
      <p>
        If the onChange prop is specified, the method gets called at the end of
        each transition. The first parameter is the previous index and the
        second is the current index in view
      </p>
      <SyntaxHighlighter language="javascript" style={dark}>
        {callbackCode}
      </SyntaxHighlighter>
      <br />
      <div>
        <Fade {...properties}>
          <div style={{ ...style, background: 'teal' }}>First Slide</div>
          <div style={{ ...style, background: '#6c6ce3' }}>Second Slide</div>
          <div style={{ ...style, background: '#8fe78f' }}>Third Slide</div>
          <div style={{ ...style, background: '#ccc' }}>Fourth Slide</div>
        </Fade>
      </div>
      <p style={{ fontSize: '20px', textAlign: 'center' }}>
        Transitioned from {previousIndex} to {currentIndex}
      </p>
    </div>
  );
};

export default CallbackExample;
