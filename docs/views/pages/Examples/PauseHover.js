import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Slide } from "../../../../src";
import { pauseOnHover, fadeEffectCSS } from "../../codeStrings";

const PauseOnHoverExample = () => {
  const fadeImages = [
    "assets/images/slide_5.jpg",
    "assets/images/slide_6.jpg",
    "assets/images/slide_7.jpg"
  ];

  const fadeProperties = {
    duration: 3000,
    pauseOnHover: true
  };

  return (
    <div>
      <h2>Pause on hover</h2>
      <p>The slide effect gets paused when the user hovers on the slide and it continues playing on mouse out</p>
      <SyntaxHighlighter language="react" style={dark}>
        {pauseOnHover}
      </SyntaxHighlighter>
      <br />
      <div>
        <Slide {...fadeProperties}>
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

export default PauseOnHoverExample;
