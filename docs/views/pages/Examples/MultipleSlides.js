import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Slide } from '../../../../src';
import { multipleSlides } from '../../codeStrings';

const MultipleSlides = () => {
  const style = {
    textAlign: 'center',
    background: 'teal',
    padding: '200px 0',
    fontSize: '30px'
  };

  const properties = {
    duration: 3000,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: false,
    indicators: true
  };

  return (
    <div>
      <h2>Multiple Slides</h2>
      <p>The slide effect has support for multiple slides on a page.</p>
      <SyntaxHighlighter language="react" style={dark}>
        {multipleSlides}
      </SyntaxHighlighter>
      <br />
      <div>
        <Slide {...properties}>
          <div style={style}>First Slide</div>
          <div style={style}>Second Slide</div>
          <div style={style}>Third Slide</div>
          <div style={style}>Fourth Slide</div>
          <div style={style}>Fifth Slide</div>
          <div style={style}>sixth Slide</div>
          <div style={style}>Seventh Slide</div>
          <div style={style}>Eight Slide</div>
        </Slide>
      </div>
      <br />
    </div>
  );
};

export default MultipleSlides;
