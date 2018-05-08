import React, { Component } from 'react';
import { Slide, Fade, Zoom } from './lib';
import './app.css';

class App extends Component {
  render() {
    const slideImages = [
      'images/slide_2.jpg',
      'images/slide_3.jpg',
      'images/slide_4.jpg'
    ];

    const fadeImages = [
      'images/slide_5.jpg',
      'images/slide_6.jpg',
      'images/slide_7.jpg'
    ];

    const properties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true
    }

    const fadeProperties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      direction: "in"
    }

    const zoomOutProperties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      scale: 0.4
    }

    const zoomInProperties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      scale: 1.4
    }

    return (
      <div>
        <h3>Slide Effect</h3>
        <div className="slide-container">
          <Slide {...properties}>
            {
              slideImages.map((each, index) => <img key={index} src={each} />)
            }
          </Slide>
        </div>
        <br />
        <h3>Fade Effect</h3>
        <div className="slide-container">
          <Fade {...fadeProperties}>
            {
              fadeImages.map((each, index) => <img key={index} src={each} />)
            }
          </Fade>
        </div>

        <br />
        <h3>Zoom out Effect</h3>
        <div className="slide-container">
          <Zoom {...zoomOutProperties}>
            {
              fadeImages.map((each, index) => <img key={index} src={each} />)
            }
          </Zoom>
        </div>

        <br />
        <h3>Zoom in Effect</h3>
        <div className="slide-container">
          <Zoom {...zoomInProperties}>
            {
              fadeImages.map((each, index) => <img key={index} src={each} />)
            }
          </Zoom>
        </div>
      </div>
    );
  }
}

export default App;
