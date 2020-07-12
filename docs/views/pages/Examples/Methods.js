import React, { useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Slide } from "../../../../src";
import { methodCode } from "../../codeStrings";

const MethodsExample = () => {
  const slideRef = useRef();

  const style = {
    textAlign: "center",
    background: "teal",
    padding: "200px",
    fontSize: "30px"
  }

  const properties = {
    autoplay: false,
    arrows: false
  }

  const back = () => {
    slideRef.current.goBack();
  }

  const next = () => {
    slideRef.current.goNext();
  }

  const goto = ({ target }) => {
    slideRef.current.goTo(parseInt(target.value, 10));
  }

  return (
    <div>
      <h2>Methods</h2>
      <p>
        The package supports three methods that can be used to control navigation.
        The "goBack()" method shows the previous slide while "goNext()" shows the next slide.
        The "goTo(index)" method goes to a particular index. It takes an integer as the parameter.
      </p>
      <SyntaxHighlighter language="javascript" style={dark}>
        {methodCode}
      </SyntaxHighlighter>
      <br />
      <div>
        <Slide ref={slideRef} {...properties}>
          <div style={style}>
            First Slide
          </div>
          <div style={style}>
            Second Slide
          </div>
          <div style={style}>
            Third Slide
          </div>
        </Slide>
      </div>

      <div className="autoplay-buttons">
        <button type="button" onClick={back}>Back</button>
        <button type="button" onClick={next}>Next</button>
        <select onChange={goto}>
          <option>--Select--</option>
          <option value="0">First</option>
          <option value="1">Second</option>
          <option value="2">Third</option>
        </select>
      </div>
    </div>
  );
};

export default MethodsExample;
