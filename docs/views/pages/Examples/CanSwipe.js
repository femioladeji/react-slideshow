import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Slide } from '../../../../src';
import { canSwipe, fadeEffectCSS } from '../../codeStrings';

const CanSwipeExample = () => {
  const fadeImages = [
    'assets/images/slide_5.jpg',
    'assets/images/slide_6.jpg',
    'assets/images/slide_7.jpg'
  ];

  const fadeProperties = {
    duration: 3000,
    canSwipe: false
  };

  return (
    <div>
      <h2>Can swipe or not</h2>
      <p>
        User can't swipe manually slides by mouse or by touching when this is
        set to false
      </p>
      <SyntaxHighlighter language="react" style={dark}>
        {canSwipe}
      </SyntaxHighlighter>
      <br />
      <div>
        <Slide {...fadeProperties}>
          <div className="each-fade">
            <div>
              <img src={fadeImages[0]} />
            </div>
            <p>First slide</p>
          </div>
          <div className="each-fade">
            <p>Second Slide</p>
            <div>
              <img src={fadeImages[1]} />
            </div>
          </div>
          <div className="each-fade">
            <div>
              <img src={fadeImages[2]} />
            </div>
            <p>Third Slide</p>
          </div>
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

export default CanSwipeExample;
