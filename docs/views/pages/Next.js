import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { nextCodeString } from '../codeStrings';

const Next = () => {
  return (
    <div className="div-sec">
      <h1>Next</h1>
      <div>
        <p>
          For those using 'Next.js' . You need the import the package
          dynamically and set ssr property to false. The snippet below imports
          the Fade effect.
        </p>
        <div>
          <SyntaxHighlighter language="javascript" style={dark}>
            {nextCodeString}
          </SyntaxHighlighter>
          <p>
            HTML properties like className, data-* attributes and others will be
            applied to the parent div.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Next;
