import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Api = () => {
  return (
    <div className="div-sec">
      <h1>Properties</h1>
      <div className="table-div">
        <table>
          <thead>
            <th>Properties</th>
            <th>Type</th>
            <th>DefaultValue</th>
            <th>Description</th>
          </thead>
          <tbody>
            <tr>
              <td>duration</td>
              <td>integer</td>
              <td>5000</td>
              <td>
                Time it takes (milliseconds) before next transition starts
              </td>
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
              <td>true</td>
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
          </tbody>
        </table>
      </div>
      <h1>Methods</h1>
      <div>
        <p>
          1. goNext() - It is used to programmatically transition the spde to
          the next one.
        </p>
        <p>
          2. goBack() - If you want to show the previous spde, then use this
          function
        </p>
        <p>
          3. goTo(index) - It can be used to transition the spde to a particular
          index. N.B Index starts from 0
        </p>
        <p>
          To call the method you can use the slide's ref attribute and then call
          the method.
          <SyntaxHighlighter language="javascript" style={dark}>
            {`this.slideRef.goNext()`}
          </SyntaxHighlighter>
          or
          <SyntaxHighlighter language="javascript" style={dark}>
            {`this.slideRef.current.goNext()`}
          </SyntaxHighlighter>
        </p>
      </div>
    </div>
  );
};

export default Api;
