import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Link } from "react-router-dom";
import { Slide } from "../../../src";
import {
  slideEffectCodeString,
  SlideEffectCSSString,
} from "../codeStrings";

const LandingPage = () => {
  const slideImages = [
    "assets/images/slide_2.jpg",
    "assets/images/slide_3.jpg",
    "assets/images/slide_4.jpg"
  ]

  return (
    <div className="ld-page">
      <div className="ld-sections">
      <h2>Introduction:</h2>
        <p>
          React slideshow is a simple react component that supports slide,
          fade and zoom effects. It is easily customizable and you can
          edit some properties to fit your design.
        </p>
        <h2>Installation:</h2>
        <SyntaxHighlighter language="javascript" style={dark}>
          {`npm install react-slideshow-image -S`}
        </SyntaxHighlighter>
        <SyntaxHighlighter language="javascript" style={dark}>
          {`yarn add react-slideshow-image`}
        </SyntaxHighlighter>
        You need to import the css file and you can do that by importing it in your js file or css file.
        <SyntaxHighlighter language="javascript" style={dark}>
          {`import 'react-slideshow-image/dist/styles.css'`}
        </SyntaxHighlighter>
        <SyntaxHighlighter language="css" style={dark}>
          {`@import "react-slideshow-image/dist/styles.css"`}
        </SyntaxHighlighter>
      </div>
      <h2>Simple Slide Example</h2>
      <div>
        <Slide>
          {slideImages.map((each, index) => (
            <div key={index} className="each-slide">
              <div style={{ backgroundImage: `url(${each})` }}>
                <span>Slide {index + 1}</span>
              </div>
            </div>
          ))}
        </Slide>
      </div>
      <div className="ld-sections">
        <SyntaxHighlighter language="react" style={dark}>
          {slideEffectCodeString}
        </SyntaxHighlighter>
      </div>
      <p>Here is the css used for this</p>
      <SyntaxHighlighter language="css" style={dark}>
        {SlideEffectCSSString}
      </SyntaxHighlighter>

      <p>For more effects, click on examples. Click <Link to="/api">here</Link> for all properties and methods</p>
    </div>
  );
}

export default LandingPage;
