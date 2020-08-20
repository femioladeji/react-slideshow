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
            <div>
              <img src={fadeImages[0]} />
            </div>
            <p>First Slide</p>
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
