import React, { Component } from 'react';
import { Slide, Fade } from './lib';
import './app.css';

class App extends Component {
  render() {
    const images = [
      'images/slide_2.jpg',
      'images/slide_3.jpg',
      'images/slide_4.jpg',
      'images/slide_5.jpg'
      // 'images/slide_6.jpg',
      // 'images/slide_7.jpg'
    ];
    return (
      <div>
        {/* <h3>Slide Effect</h3>
        <div className="slide-container">
          <Slide
            images={images}
            duration="5000"
            transitionDuration="1000"
            type="slide"
          />
        </div>
        <br /> */}
        <h3>Fade Effect</h3>
        <div className="slide-container">
          <Fade
            images={images}
            duration="3000"
            transitionDuration="1000"
            type="fade"
            direction="in"
          />
        </div>
        <h3>Hold On</h3>
      </div>
    );
  }
}

export default App;
