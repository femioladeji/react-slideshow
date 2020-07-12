import React from "react";
import { Zoom } from "../../../../src";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { customIndicators, customIndicatorCSS } from "../../codeStrings";

const CustomIndicatorExample = () => {
  const images = [
    "assets/images/slide_2.jpg",
    "assets/images/slide_7.jpg",
    "assets/images/slide_5.jpg"
  ];

  const zoomOutProperties = {
    scale: 0.4,
    indicators: i => (<div className="indicator">{i + 1}</div>)
  };

  return (
    <div>
      <h2>Customizing Indicators</h2>
      <p>The indicators shown below the slide can be customized to your design specification.
          It takes a boolean or a function. If it is set to true, it shows the default indicator style.
          If a function is passed then it displays the element returned in that function.
          The package wraps each indicator with a div and the class is set to active for the current slide in view
      </p>
      <SyntaxHighlighter language="react" style={dark}>
        {customIndicators}
      </SyntaxHighlighter>
      <br />
      Here is the css
      <SyntaxHighlighter language="css" style={dark}>
        {customIndicatorCSS}
      </SyntaxHighlighter>
      <div>
        <Zoom {...zoomOutProperties}>
          {images.map((each, index) => (
            <img key={index} style={{ width: "100%" }} src={each} />
          ))}
        </Zoom>
      </div>
      <br />
    </div>
  );
};

export default CustomIndicatorExample;
