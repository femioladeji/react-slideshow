import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Slide } from '../../../../src';
import { customArrow } from '../../codeStrings';

const CustomArrowExample = () => {
  const slideImages = [
    'assets/images/slide_2.jpg',
    'assets/images/slide_3.jpg',
    'assets/images/slide_4.jpg'
  ];

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    indicators: true,
    infinite: true,
    prevArrow: (
      <div style={{ width: '30px', marginRight: '-30px' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff"
        >
          <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
        </svg>
      </div>
    ),
    nextArrow: (
      <div style={{ width: '30px', marginLeft: '-30px' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff"
        >
          <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
        </svg>
      </div>
    )
  };

  return (
    <div>
      <h2>Customizing Arrows</h2>
      <p>
        You can customize the previous and next arrow by setting the property as
        shown below
      </p>
      <SyntaxHighlighter language="react" style={dark}>
        {customArrow}
      </SyntaxHighlighter>
      <br />
      <div>
        <Slide {...properties}>
          {slideImages.map((each, index) => (
            <div key={index} className="each-slide">
              <div style={{ backgroundImage: `url(${each})` }}>
                <span>Slide {index + 1}</span>
              </div>
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
};

export default CustomArrowExample;
