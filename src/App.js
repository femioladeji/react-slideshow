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

    return (
      <div>
        <h3>Slide Effect</h3>
        <div className="slide-container">
          <Slide
            images={slideImages}
            duration={5000}
            transitionDuration={1000}
          />
        </div>
        <br />
        <h3>Fade Effect</h3>
        <div className="slide-container">
          <Fade
            images={fadeImages}
            duration={5000}
            transitionDuration={1000}
            direction="in"
          />
        </div>

        <br />
        <h3>Zoom out Effect</h3>
        <div className="slide-container">
          <Zoom
            images={fadeImages}
            duration={5000}
            transitionDuration={1000}
            scale="0.4"
          />
        </div>

        <br />
        <h3>Zoom in Effect</h3>
        <div className="slide-container">
          <Zoom
            images={fadeImages}
            duration={5000}
            transitionDuration={1000}
            scale="1.3"
          />
        </div>
      </div>
    );
  }
}

export default App;
