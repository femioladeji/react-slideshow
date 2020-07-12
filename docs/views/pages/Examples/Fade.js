import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Fade } from "../../../../src";
import {
  fadeEffectCodeString,
  fadeEffectCSS,
} from "../../codeStrings";

const FadeExample = () => {
  const fadeImages = [
    "assets/images/slide_5.jpg",
    "assets/images/slide_6.jpg",
    "assets/images/slide_7.jpg"
  ];

  const fadeProperties = {
    indicators: true
  };

  return (
    <div>
      <h2>Fade Effect</h2>
      Here's the code for the fade effect.
      <SyntaxHighlighter language="react" style={dark}>
        {fadeEffectCodeString}
      </SyntaxHighlighter>
      <br />
      <div>
        <Fade {...fadeProperties}>
          <div className="each-fade">
            <img src={fadeImages[0]} />
            <h2>First Slide</h2>
          </div>
          <div className="each-fade">
            <h2>Second Slide</h2>
            <img src={fadeImages[1]} />
          </div>
          <div className="each-fade">
            <img src={fadeImages[2]} />
            <h2>Third Slide</h2>
          </div>
        </Fade>
      </div>
      Below is the css used to accomplish this layout.
      <SyntaxHighlighter language="react" style={dark}>
        {fadeEffectCSS}
      </SyntaxHighlighter>
    </div>
  );
};

export default FadeExample;
