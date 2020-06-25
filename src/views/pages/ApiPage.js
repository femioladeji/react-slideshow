import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import '../styles.css';

const Api = () => {
  const codeString = `
  "typeRoots": [
    "./types",
    "./node_modules/@types"
  ]
  `;
  return (
    <div style={{ width: '60%', margin: 'auto' }}>
      <h1>Properties</h1>
      <div>
        <table>
          <tr>
            <th>Properties</th>
            <th>Type</th>
            <th>DefaultValue</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>duration</td>
            <td>integer</td>
            <td>5000</td>
            <td>Time it takes (milliseconds) before next transition starts</td>
          </tr>
          <tr>
            <td>transitionDuration</td>
            <td>integer</td>
            <td>1000</td>
            <td>Determines how long the transition takes</td>
          </tr>
          <tr>
            <td>defaultIndex</td>
            <td>integer</td>
            <td>0</td>
            <td>Specifies the first slide to display</td>
          </tr>
          <tr>
            <td>infinite</td>
            <td>boolean</td>
            <td>true</td>
            <td>Specifies if the transition should loop throughout</td>
          </tr>
          <tr>
            <td>indicators</td>
            <td>boolean or function </td>
            <td>false</td>
            <td>
              For specifying if there should be dots below the slideshow. If
              function, it will render the returned element
            </td>
          </tr>
          <tr>
            <td>scale</td>
            <td>number</td>
            <td></td>
            <td>
              Required when using zoom to specify the scale the current slide
              should be zoomed to
            </td>
          </tr>
          <tr>
            <td>arrows</td>
            <td>boolean</td>
            <td>true</td>
            <td>
              Determines if there should be a navigational arrow for going to
              the next or previous slide
            </td>
          </tr>
          <tr>
            <td>prevArrow</td>
            <td>object or function</td>
            <td>null</td>
            <td>A custom element to serve as previous arrow</td>
          </tr>
          <tr>
            <td>nextArrow</td>
            <td>object or function</td>
            <td>null</td>
            <td>A custom element to serve as next arrow</td>
          </tr>
          <tr>
            <td>autoplay</td>
            <td>boolean</td>
            <td>true</td>
            <td>
              Responsible for determining if the slideshow should start
              automatically
            </td>
          </tr>
          <tr>
            <td>pauseOnHover</td>
            <td>boolean</td>
            <td>false</td>
            <td>
              Determines whether the transition effect applies when the mouse
              hovers the slider
            </td>
          </tr>
          <tr>
            <td>onChange</td>
            <td>function</td>
            <td></td>
            <td>
              Callback that gets triggered at the end of every transition. The
              oldIndex and newIndex are passed as arguments
            </td>
          </tr>
        </table>
      </div>
      <div>
        <h1>Methods</h1>
        <SyntaxHighlighter language="javascript" styles={{ docco }}>
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default Api;
