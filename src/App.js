import React, { Component } from 'react';
import Slideshow from './lib';
import './app.css';

class App extends Component {
  render() {
    const images = [
      'images/slide_2.jpg',
      'images/slide_3.jpg',
      'images/slide_4.jpg',
      'images/slide_5.jpg',
      'images/slide_6.jpg',
      'images/slide_7.jpg'
    ];
    return (
      <div className="App">
        <Slideshow
          images={images}
          duration="5000"
          transitionDuration="2000"
          type="slide"
          direction="out"
        />

        <p>An incredible God deserves an incredible praise</p>
      </div>
    );
  }
}

export default App;
