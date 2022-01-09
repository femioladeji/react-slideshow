import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const properties = [
  {
    title: 'duration',
    type: 'integer',
    default: '5000',
    description: 'Time it takes (milliseconds) before next transition starts'
  },
  {
    title: 'transitionDuration',
    type: 'integer',
    default: '1000',
    description: 'Determines how long the transition takes'
  },
  {
    title: 'defaultIndex',
    type: 'integer',
    default: '0',
    description: 'Specifies the first slide to display'
  },
  {
    title: 'infinite',
    type: 'boolean',
    default: 'true',
    description: 'Specifies if the transition should loop throughout'
  },
  {
    title: 'indicators',
    type: 'boolean or function',
    default: 'false',
    description:
      'For specifying if there should be dots below the slideshow. If function, it will render the returned element'
  },
  {
    title: 'scale',
    type: 'number',
    default: '',
    description:
      'Required when using zoom to specify the scale the current slide should be zoomed to'
  },
  {
    title: 'arrows',
    type: 'boolean',
    default: 'true',
    description:
      'Determines if there should be a navigational arrow for going to the next or previous slide'
  },
  {
    title: 'prevArrow',
    type: 'object or function',
    default: 'null',
    description: 'A custom element to serve as previous arrow'
  },
  {
    title: 'nextArrow',
    type: 'object or function',
    default: 'true',
    description: 'A custom element to serve as next arrow'
  },
  {
    title: 'autoplay',
    type: 'boolean',
    default: 'true',
    description:
      'Responsible for determining if the slideshow should start automatically'
  },
  {
    title: 'pauseOnHover',
    type: 'boolean',
    default: 'true',
    description:
      'Determines whether the transition effect applies when the mouse hovers the slider'
  },
  {
    title: 'canSwipe',
    type: 'boolean',
    default: 'true',
    description:
      'Determines whether the user can go to next or previous slide by the mouse or by touching'
  },
  {
    title: 'onChange',
    type: 'function',
    default: '',
    description:
      'Callback that gets triggered at the end of every transition. The oldIndex and newIndex are passed as arguments'
  },
  {
    title: 'Easing',
    type: 'string',
    default: 'linear',
    description:
      'The timing transition function to use. You can use one of linear, ease, ease-in, ease-out, cubic, cubic-in, cubic-out'
  },
  {
    title: 'cssClass',
    type: 'string',
    default: '',
    description:
      'Use this prop to add your custom css to the wrapper containing the sliders. Pass your css className as value for the cssClass prop'
  },
  {
    title: 'slidesToShow',
    type: 'number',
    default: '1',
    description: 'The number of slides to show on each page'
  },
  {
    title: 'slidesToScroll',
    type: 'number',
    default: '1',
    description: 'The number of slides to scroll'
  },
  {
    title: 'responsive',
    type: 'array',
    default: '[]',
    description:
      'Set slidesToShow & slidesToScroll based on screen size. [{ breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 }}]'
  }
];

const Api = () => {
  return (
    <div className="div-sec">
      <h1>Properties</h1>
      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>Properties</th>
              <th>Type</th>
              <th>DefaultValue</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(each => (
              <tr key={each.title}>
                <td>{each.title}</td>
                <td>{each.type}</td>
                <td>{each.default}</td>
                <td>{each.description}</td>
              </tr>
            ))}
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
        <div>
          To call the method you can use the slide's ref attribute and then call
          the method.
          <SyntaxHighlighter language="javascript" style={dark}>
            {`this.slideRef.goNext()`}
          </SyntaxHighlighter>
          or
          <SyntaxHighlighter language="javascript" style={dark}>
            {`this.slideRef.current.goNext()`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default Api;
