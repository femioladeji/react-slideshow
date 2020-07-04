import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Slide, Fade, Zoom } from '../../lib';
import {
  cssCodeString,
  customizingIndicatorCodeString,
  nextCodeString,
  zoomEffectCodeString,
  slideEffectCodeString,
  fadeEffectCodeString
} from '../codeStrings';
import '../../app.css';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      zoomOutImages: [
        'images/slide_2.jpg',
        'images/slide_7.jpg',
        'images/slide_5.jpg'
      ],
      slideImages: [
        'images/slide_2.jpg',
        'images/slide_3.jpg',
        'images/slide_4.jpg'
      ],
      fadeImages: [
        'images/slide_5.jpg',
        'images/slide_6.jpg',
        'images/slide_7.jpg'
      ]
    };
  }

  render() {
    const properties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      pauseOnHover: true,
      onChange: (oldIndex, newIndex) => {
        console.log(
          `Slide transition finished from ${oldIndex} to ${newIndex}`
        );
      }
    };

    const fadeProperties = {
      duration: 5000,
      transitionDuration: 500,
      indicators: true,
      infinite: false,
      pauseOnHover: true,
      onChange: (oldIndex, newIndex) => {
        console.log(`Fade transition finished from ${oldIndex} to ${newIndex}`);
      }
    };

    const zoomOutProperties = {
      duration: 5000,
      transitionDuration: 500,
      indicators: true,
      scale: 0.4,
      pauseOnHover: true,
      onChange: (oldIndex, newIndex) => {
        console.log(`zoom transition finished from ${oldIndex} to ${newIndex}`);
      }
    };

    const zoomInProperties = {
      duration: 5000,
      transitionDuration: 500,
      indicators: true,
      scale: 1.4,
      pauseOnHover: true
    };
    const { slideImages, zoomOutImages, fadeImages } = this.state;
    return (
      <div className="ld-page">
        <div className="ld-sections">
          <p>
            <b>
              A simple slideshow component built with react that supports slide,
              fade and zoom effects.
            </b>
          </p>
          <p>Installation:</p>
          <SyntaxHighlighter language="javascript" style={dark}>
            {`npm install react-slideshow-image -S`}
          </SyntaxHighlighter>
          or
          <SyntaxHighlighter language="javascript" style={dark}>
            {`yarn add react-slideshow-image`}
          </SyntaxHighlighter>
          <p>You can use three different effects of the slideshow.</p>
        </div>
        <h3>Slide Effect</h3>
        <div className="slide-container">
          <Slide {...properties}>
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
          <SyntaxHighlighter language="javascript" style={dark}>
            {slideEffectCodeString}
          </SyntaxHighlighter>
          <p>
            The default value for duration and transitionDuration is 5000 and
            1000 milliseconds respectively.
          </p>
        </div>
        <br />
        <h3>Fade Effect</h3>
        <div className="slide-container">
          <Fade {...fadeProperties}>
            <div className="each-fade">
              <div className="image-container">
                <img src={fadeImages[0]} />
              </div>
              <h2>First Slide</h2>
            </div>
            <div className="each-fade">
              <h2>Second Slide</h2>
              <div className="image-container">
                <img src={fadeImages[1]} />
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src={fadeImages[2]} />
              </div>
              <h2>Third Slide</h2>
            </div>
          </Fade>
        </div>
        <div className="ld-sections">
          <SyntaxHighlighter language="javascript" style={dark}>
            {fadeEffectCodeString}
          </SyntaxHighlighter>
          <p>
            The default value for duration and transitionDuration is 5000 and
            1000 milliseconds respectively.
          </p>
        </div>
        <br />
        <h3>Zoom out Effect</h3>
        <div className="slide-container">
          <Zoom {...zoomOutProperties}>
            {zoomOutImages.map((each, index) => (
              <img key={index} style={{ width: '100%' }} src={each} />
            ))}
          </Zoom>
        </div>
        <br />
        <h3>Zoom in Effect</h3>
        <div className="slide-container">
          <Zoom {...zoomInProperties}>
            {fadeImages.map((each, index) => (
              <img key={index} style={{ width: '100%' }} src={each} />
            ))}
          </Zoom>
        </div>
        <div className="ld-sections">
          <SyntaxHighlighter language="javascript" style={dark}>
            {zoomEffectCodeString}
          </SyntaxHighlighter>
        </div>
        <br />
        <h3>Customizing Indicators</h3>
        <div className="ld-sections">
          <p>
            The indicator can be customized to what you want. To customize it,
            set the indicators prop to a function that returns the element you
            want. The function accepts an index parameter.
          </p>
          <SyntaxHighlighter language="javascript" style={dark}>
            {customizingIndicatorCodeString}
          </SyntaxHighlighter>
        </div>
        <br />
        <h3>CSS</h3>
        <div className="ld-sections">
          <p>
            This is what my css looks like. You can customize this to your own
            taste.
          </p>
          <SyntaxHighlighter language="css" style={dark}>
            {cssCodeString}
          </SyntaxHighlighter>
        </div>
        <br />
        <h3>Next</h3>
        <div className="ld-sections">
          <p>
            For those using 'Next.js' . You need the import the package
            dynamically and set ssr property to false. The snippet below imports
            the Fade effect.
          </p>
          <SyntaxHighlighter language="javascript" style={dark}>
            {nextCodeString}
          </SyntaxHighlighter>
          <p>
            HTML properties like className, data-* attributes and others will be
            applied to the parent div.
          </p>
        </div>
      </div>
    );
  }
}

export default LandingPage;
