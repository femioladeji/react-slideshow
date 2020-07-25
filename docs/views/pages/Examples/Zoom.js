import React from 'react';
import { Zoom } from '../../../../src';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { zoomInEffectCodeString } from '../../codeStrings';

const ZoomExample = () => {
  const images = [
    'assets/images/slide_2.jpg',
    'assets/images/slide_7.jpg',
    'assets/images/slide_5.jpg'
  ];

  const zoomInProperties = {
    indicators: true,
    scale: 1.4
  };

  return (
    <div>
      <h2>Zoom in Effect</h2>
      <p>
        Here's the code for the zoom in effect. The scale property indicates the
        zoom level. A scale greater than 1 is a zoom in effect
      </p>
      <SyntaxHighlighter language="react" style={dark}>
        {zoomInEffectCodeString}
      </SyntaxHighlighter>
      <br />
      <div>
        <Zoom {...zoomInProperties}>
          {images.map((each, index) => (
            <img key={index} style={{ width: '100%' }} src={each} />
          ))}
        </Zoom>
      </div>
      <br />
    </div>
  );
};

export default ZoomExample;
